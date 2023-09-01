"use client";
import { useState, useEffect } from "react";
import styles from "./UserSettings.module.scss";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const UserInfoForm = ({ userID }) => {
  const supabase = createClientComponentClient();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState("");
  const [statement, setStatement] = useState("");
  const [showStatement, setShowStatement] = useState(false);
  const [email, setEmail] = useState("");

  async function updateProfile(e) {
    e.preventDefault();

    const res = await fetch("/api/update-user", {
      method: "put",
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        userID: userID,
      }),
    });
    const data = await res.json();
  }

  async function updateStatement(e) {
    e.preventDefault();
    const res = await fetch("/api/update-statement", {
      method: "put",
      body: JSON.stringify({
        statement: statement,
        show_statement: showStatement,
        userID: userID,
      }),
    });
    const data = await res.json();
  }

  useEffect(() => {
    async function getUser() {
      const res = await fetch("/api/get-user", {
        method: "get",
        body: JSON.stringify({
          userID: userID,
        }),
      });
      const data = await res.json();
      setFirstName(data.data[0].firstname);
      setLastName(data.data[0].lastname);
      setEmail(data.data[0].email);
      setStatement(data.data[0].statement);
      setShowStatement(data.data[0].show_statement);
    }
    getUser();
  }, [userID]);

  if (firstName) {
    return (
      <div>
        <form onSubmit={updateProfile} className={styles.infoForm}>
          <h2>User information</h2>
          <label htmlFor="firstName">
            First Name
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label htmlFor="lastName">
            Last Name
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              disabled
            />
          </label>
          <button type="submit">Save</button>
        </form>
        <form className={styles.infoForm} onSubmit={updateStatement}>
          <h2>Personal Statement</h2>
          <label>
            <textarea
              name="statement"
              id="statement"
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              style={{ resize: "none" }}
              placeholder="Write a statement for yourself about what you want to accomplish."
              cols="30"
              rows="10"
            ></textarea>
          </label>
          <label htmlFor="showStatement">
            <span>
              <input
                type="checkbox"
                name="showStatement"
                id="showStatement"
                checked={showStatement}
                onChange={() => setShowStatement(!showStatement)}
              />{" "}
              Show statement on My Protocols page
            </span>
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
};
