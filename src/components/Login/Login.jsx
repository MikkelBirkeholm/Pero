"use client";
import styles from "./Login.module.scss";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import UserSettings from "../UserSettings/UserSettings";
import Link from "next/link";

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
  }, [supabase.auth]);

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoggedIn(true);
    router.push("/protocols");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setLoggedIn(false);
    setUserID(null);
    router.refresh();
  };

  return (
    <div className={styles.loginWrapper}>
      {!loggedIn ? (
        <>
          <input
            name="email"
            type="email"
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
        </>
      ) : (
        <>
          <Link href="/protocols">All Protocols</Link>
          <Link href={`/${userID}/my-protocols`}>My Protocols</Link>
          <UserSettings userID={userID} signOut={handleSignOut} />
        </>
      )}
    </div>
  );
}
