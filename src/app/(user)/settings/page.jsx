import { UserInfoForm } from "@/components/UserSettings/UserInfoForm";
import styles from "../page.module.scss";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";


export default async function Page() {
  const cookieData = cookies();
  const supabase = createServerComponentClient({ cookieData });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className={styles.userDashboard}>
      <div className={styles.sidebar + " box"}>
        <UserInfoForm userID={session.user.id} />
      </div>
      <div className={styles.mainContent}></div>
    </div>
  );
}
