"use client";
import styles from "./Protocols.module.scss";
import RemoveProtocolButton from "./RemoveProtocolButton";
import { ProgressCheckbox } from "./atoms/ProgressCheckbox";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ActiveProtocolCard = ({ protocol, userID }) => {
  const router = useRouter();
  const weekDayLetters = ["M", "T", "W", "T", "F", "S", "S"];
  // const { data, error } = await supabase.auth.getSession();

  function openDialog() {
    const dialog = document.getElementById(protocol.id);
    dialog.showModal();
  }
  function closeDialog() {
    const dialog = document.getElementById(protocol.id);
    dialog.close();
  }

  const currentDate = new Date().toISOString().slice(0, 10);

  async function toggleCheckbox(protocolID, date, isComplete) {
    const { data, error } = await supabase
      .from("progress")
      .update({ completed: !isComplete })
      .match({ user_id: userID, protocol_id: protocolID, date: date })
      .select();
    router.refresh();
  }

  const weekProgress = protocol.progress.slice(0, 7).map((day, index) => {
    return (
      <ProgressCheckbox
        name={weekDayLetters[index]}
        callback={() => toggleCheckbox(protocol.id, day.date, day.completed)}
        className={day.date === currentDate ? styles.currentDay : ""}
        currentDate={currentDate}
        date={day.date}
        isComplete={day.completed}
        key={index}
      />
    );
  });

  return (
    <div className={styles.protocolCard + " box"}>
      <div className={styles.protocol}>
        <div className={styles.protocolHeading}>
          <span className={styles.categories}>{protocol.categories}</span>
          <RemoveProtocolButton id={protocol.id} />
        </div>
        <div className={styles.protocolMain}>
          <h2>{protocol.title}</h2>
          <span className={styles.benefits}>{protocol.benefits}</span>
        </div>
        <button onClick={openDialog}>Read More</button>
        <div className={styles.progressContainer}>
          <h2>Progress</h2>

          <ul>{weekProgress}</ul>
        </div>
        <dialog id={protocol.id} className={styles.cardDialog + " box"}>
          <div className={styles.protocolHeading}>
            <button onClick={closeDialog}>Close</button>
            <RemoveProtocolButton id={protocol.id} />
          </div>
          <span className={styles.benefits}>{protocol.benefits}</span>
          <p>{protocol.description}</p>
          {protocol.link && (
            <a href={protocol.link} target="_blank">
              Source
            </a>
          )}
        </dialog>
      </div>
    </div>
  );
};
