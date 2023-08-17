"use client";
import styles from "./UserSettings.module.scss";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function UserSettings() {
  const [showMenu, setShowMenu] = useState(false);
  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && ref.current.contains(event.target)) {
          setShowMenu(true);
        } else {
          setShowMenu(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);

  return (
    <div className={styles.usericon} ref={wrapperRef}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-8 8v-2.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20H4Z"
        ></path>
      </svg>
      {showMenu && (
        <ul className="box">
          <li>
            <Link href="/settings">Settings</Link>
          </li>
          <li>Subscription</li>
          <hr />
          <li>
            <form action="/auth/logout" method="post">
              <button type="submit">Sign Out</button>
            </form>
          </li>
        </ul>
      )}
    </div>
  );
}
