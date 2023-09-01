"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import UserSettings from "../UserSettings/UserSettings";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const Header = () => {
  const supabase = createClientComponentClient();
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setLoggedIn(true);
    }
    getUser();
  });

  return (
    <header className={styles.headerWrapper}>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <span className={styles.textLogo}>Pero</span>
            </Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
      <div>
        {loggedIn ? (
          <>
            <Link href="/protocols">All Protocols</Link>
            <Link href="/my-protocols">My Protocols</Link>
            <UserSettings />
          </>
        ) : (
          <button className="styledBtn">
            <Link href="login">Sign In</Link>
          </button>
        )}
      </div>
    </header>
  );
};
