"use client";
import { useRouter } from "next/navigation";
import styles from "./Protocols.module.scss";

export default function AddNewProtocolButton({ id, userID }) {
  const router = useRouter();

  async function AddProtocol() {
    await fetch("/api/add-protocol", {
      method: "put",
      body: JSON.stringify({ protocolID: id, userID: userID }),
    });
    router.refresh();
  }

  return (
    <div className={styles.addBtnWrapper}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 24 24"
        className={styles.addBtn}
        onClick={AddProtocol}
      >
        <path
          fill="currentColor"
          d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L10.6 13.8ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
        ></path>
      </svg>
    </div>
  );
}
