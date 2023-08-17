"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./styles.module.scss";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const MoodTracker = ({ userID }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [moodScore, setMoodScore] = useState(0);
  const [moodText, setMoodText] = useState("");
  const [formStep, setFormStep] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/update-mood", {
        method: "put",
        body: JSON.stringify({
          mood_score: moodScore,
          mood_reason: moodText,
        }),
      });
      const data = await res.json();
      router.refresh();
    } catch (error) {
      alert(error.message);
    }
  }

  function handleMoodSelect(value) {
    setMoodScore(value);
  }

  function handleMoodTextChange(e) {
    setMoodText(e.target.value);
  }

  return (
    <div className={styles.moodContainer + " box"}>
      <h3>How is your mood today?</h3>
      <form onSubmit={handleSubmit}>
        {formStep === 0 && (
          <>
            <MoodChoices callback={handleMoodSelect} mood={moodScore} />
            <button onClick={() => setFormStep(1)}>Next</button>
          </>
        )}
        {formStep === 1 && (
          <>
            <MoodReason callback={handleMoodTextChange} reason={moodText} />
            <div className={styles.buttonRow}>
              <button onClick={() => setFormStep(0)}>Back</button>
              <button type="submit">Submit</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

import React from "react";

export const MoodChoices = ({ callback, mood }) => {
  return (
    <>
      <div className={styles.radioRow}>
        <label htmlFor="1">
          😰
          <input
            type="radio"
            id="1"
            name="mood"
            value="1"
            checked={mood === 1}
            onChange={() => callback(1)}
          />
        </label>
        <label htmlFor="2">
          😕
          <input
            type="radio"
            id="2"
            name="mood"
            value="2"
            checked={mood === 2}
            onChange={() => callback(2)}
          />
        </label>
        <label htmlFor="3">
          😐
          <input
            type="radio"
            id="3"
            name="mood"
            value="3"
            checked={mood === 3}
            onChange={() => callback(3)}
          />
        </label>
        <label htmlFor="4">
          😊
          <input
            type="radio"
            id="4"
            name="mood"
            value="4"
            checked={mood === 4}
            onChange={() => callback(4)}
          />
        </label>
        <label htmlFor="5">
          🤩
          <input
            type="radio"
            id="5"
            name="mood"
            value="5"
            checked={mood === 5}
            onChange={() => callback(5)}
          />
        </label>
      </div>
    </>
  );
};

export const MoodReason = ({ callback, reason }) => {
  return (
    <div>
      <span>Optional</span>
      <textarea
        cols="30"
        rows="10"
        onChange={callback}
        value={reason}
      ></textarea>
    </div>
  );
};
