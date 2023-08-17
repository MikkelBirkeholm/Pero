import { ActiveProtocolCard } from "./ActiveProtocolCard";
import styles from "./Protocols.module.scss";

export default function CurrentProtocols({ activeProtocols, userID }) {
  return (
    <div className={styles.gridWrapper}>
      {activeProtocols &&
        activeProtocols.map((protocol) => {
          return (
            <ActiveProtocolCard
              protocol={protocol}
              key={protocol.uuid}
              userID={userID}
            />
          );
        })}
    </div>
  );
}
