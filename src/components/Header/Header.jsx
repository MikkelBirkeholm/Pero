import React from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

export const Header = () => {
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
    </header>
  );
};
