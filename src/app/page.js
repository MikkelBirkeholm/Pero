import styles from "./page.module.scss";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/unauthenticated");
  }

  return (
    <main className={styles.main}>
      <h1>Pero</h1>
      <p>Manage you</p>
    </main>
  );
}
