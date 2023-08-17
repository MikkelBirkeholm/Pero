"use client";
import { useRouter } from "next/navigation";
import styles from "./Protocols.module.scss";

export default function RemoveProtocolButton({ id }) {
  const router = useRouter();

  async function RemoveProtocol() {
    await fetch("/api/remove-protocol", {
      method: "put",
      body: JSON.stringify({ protocolID: id }),
    }).then(() => router.refresh());
  }

  return (
    <div className={styles.removeBtnWrapper}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 24 24"
        className={styles.removeBtn}
        name="remove"
        onClick={RemoveProtocol}
      >
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm4 11H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1z"
        ></path>
      </svg>
    </div>
  );
}
