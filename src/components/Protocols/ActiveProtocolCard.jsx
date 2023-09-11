"use client";
import { useRef } from "react";
import styles from "./Protocols.module.scss";
import RemoveProtocolButton from "./RemoveProtocolButton";
import { ProgressCheckbox } from "./atoms/ProgressCheckbox";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

export const ActiveProtocolCard = ({ protocol, userID }) => {
  const router = useRouter();
  const dialogRef = useRef();
  const weekDayLetters = ["M", "T", "W", "T", "F", "S", "S"];
  // const { data, error } = await supabase.auth.getSession();

  function openDialog() {
    dialogRef.current.showModal();
  }
  function closeDialog() {
    dialogRef.current.close();
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
          <RemoveProtocolButton id={protocol.id} userID={userID} />
        </div>
        <div className={styles.protocolMain}>
          <h2>{protocol.title}</h2>
          <span className={styles.benefits}>{protocol.benefits}</span>
        </div>
        <button onClick={openDialog}>Read More</button>
        <div className={styles.progressContainer}>
          <h2>Progress</h2>
          <p>Progress tracking is coming soon</p>
        </div>
        <dialog ref={dialogRef} className={styles.cardDialog + " box"}>
          <div className={styles.protocolHeading}>
            <button onClick={closeDialog}>Close</button>
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
