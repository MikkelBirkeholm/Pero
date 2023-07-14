"use client";
import styles from "./Login.module.scss";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import UserSettings from "../UserSettings/UserSettings";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUserID(session.user.id);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };
    getUser();
  }, []);

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className={styles.loginWrapper}>
      {userID && <UserSettings userID={userID} />}
      {!loggedIn ? (
        <>
          <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button onClick={handleSignIn}>Sign in</button>
          <button onClick={handleSignUp}>Sign up</button>
        </>
      ) : (
        <button onClick={handleSignOut}>Sign out</button>
      )}
    </div>
  );
}
