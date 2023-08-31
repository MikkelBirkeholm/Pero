import { ProtocolCard } from "./ProtocolCard";
import styles from "./Protocols.module.scss";

export default async function ProtocolGrid({
  categories,
  protocols,
  currentProtocols,
  currentUser,
}) {
  return (
    <div className={styles.categoryRows}>
      {categories &&
        categories.map((category) => {
          return (
            <div key={category.title}>
              <h3 id={category.title}>{category.title}</h3>
              <div className={styles.gridWrapper}>
                {protocols?.map((protocol) => {
                  if (protocol.categories.includes(category.title)) {
                    return (
                      <ProtocolCard
                        protocol={protocol}
                        currentProtocols={currentProtocols}
                        key={protocol.id}
                        currentUser={currentUser}
                      />
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}
