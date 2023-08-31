import { UserInfoForm } from "@/components/UserSettings/UserInfoForm";
import styles from "../page.module.scss";

export default async function Page() {
  return (
    <div className={styles.userDashboard}>
      <div className={styles.sidebar + " box"}>
        <UserInfoForm />
      </div>
      <div className={styles.mainContent}></div>
    </div>
  );
}
