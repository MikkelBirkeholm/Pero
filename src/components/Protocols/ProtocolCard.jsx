"use client";
import styles from "./Protocols.module.scss";
import AddNewProtocolButton from "./AddNewProtocolButton";
import RemoveProtocolButton from "./RemoveProtocolButton";

export const ProtocolCard = ({ protocol, currentProtocols }) => {
  function openDialog() {
    const dialog = document.getElementById(protocol.id);
    dialog.showModal();
  }
  function closeDialog() {
    const dialog = document.getElementById(protocol.id);
    dialog.close();
  }

  return (
    <div className={styles.protocolCard + " box"}>
      <div className={styles.protocol}>
        <div className={styles.protocolHeading}>
          <span className={styles.categories}>{protocol.categories}</span>
          {currentProtocols && currentProtocols.includes(protocol.id) ? (
            <RemoveProtocolButton id={protocol.id} />
          ) : (
            <AddNewProtocolButton id={protocol.id} />
          )}
        </div>
        <div className={styles.protocolMain}>
          <h2>{protocol.title}</h2>
          <span className={styles.benefits}>{protocol.benefits}</span>
        </div>
        <button onClick={openDialog}>Read More</button>
        <dialog id={protocol.id} className={styles.cardDialog + " box"}>
          <div className={styles.protocolHeading}>
            <button onClick={closeDialog}>Close</button>
            {currentProtocols && currentProtocols.includes(protocol.id) ? (
              <RemoveProtocolButton id={protocol.id} />
            ) : (
              <AddNewProtocolButton id={protocol.id} />
            )}
          </div>
          <span className={styles.benefits}>{protocol.benefits}</span>
          <div>
            <h2>{protocol.title}</h2>
            <p>{protocol.description}</p>
          </div>
          {protocol.link && (
            <a href={protocol.link} target="_blank" alt="Further reading">
              Source
            </a>
          )}
        </dialog>
      </div>
    </div>
  );
};
