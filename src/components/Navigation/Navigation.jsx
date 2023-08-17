"use client";
import Login from "../Login/Login";
import styles from "./Navigation.module.scss";
import Link from "next/link";

export default function Navigation() {
  return (
    <div className={styles.navigation}>
      <div>
        <Link href="/">
          <span className={styles.textLogo}>Pero</span>
        </Link>
        <Link href="/about">About</Link>
      </div>
      <p>Replace this</p>
    </div>
  );
}
