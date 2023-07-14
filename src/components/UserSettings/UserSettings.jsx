import { useRouter } from "next/navigation";
import styles from "./UserSettings.module.scss";
export default function UserSettings({ userID }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/user/${userID}`);
  };

  return (
    <div className={styles.usericon}>
      <span onClick={handleClick}>👤</span>
    </div>
  );
}
