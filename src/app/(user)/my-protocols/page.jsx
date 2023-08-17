import CurrentProtocols from "@/components/Protocols/CurrentProtocols";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import styles from "../page.module.scss";
import { MoodTracker } from "@/components/MoodTracker/MoodTracker";
import UserAvatar from "@/components/User/UserAvatar";

const supabase = createServerComponentClient({ cookies });

// get all user data
async function GetUserData() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  let { data: profile, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", session.user.id);
  if (profile) {
    return profile[0];
  }
}

async function GetProgressForUser(userID) {
  let { data: progress, error } = await supabase
    .from("progress")
    .select("protocol_id, date, completed")
    .eq("user_id", userID)
    .order("date", { ascending: true });
  if (error) {
    console.log("error fetching progress", error);
    return [];
  }

  return progress;
}

async function GetActiveProtocols(userProtocols, userID) {
  let { data: protocols, error } = await supabase
    .from("protocols")
    .select("*")
    .in("id", userProtocols);
  if (error) {
    console.log("error fetching protocols", error);
    return [];
  }

  const progress = await GetProgressForUser(userID);

  const protocolsWithProgress = protocols.map((protocol) => {
    const protocolProgress = progress.filter(
      (p) => p.protocol_id === protocol.id,
    );
    return { ...protocol, progress: protocolProgress };
  });

  return protocolsWithProgress;
}

export default async function Page() {
  const currentDate = new Date().toISOString().slice(0, 10);
  const userData = await GetUserData();
  const latestMood = new Date(userData.latest_mood_update)
    .toISOString()
    .slice(0, 10);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect("/unauthenticated");
  }

  const activeProtocols = await GetActiveProtocols(
    userData.protocols,
    session.user.id,
  );

  return (
    <main className={styles.pageContent}>
      <div className={styles.sidebar}>
        <div className={styles.profileWrapper}>
          <UserAvatar
            src="/avatar.png"
            alt={userData.firstname}
            width="50"
            fallback={`${userData.firstname[0] + userData.lastname[0]}`}
          />
          <div className={styles.profileInfo}>
            <h2>{userData.firstname}</h2>
            {userData.show_statement === true && <p>{userData.statement}</p>}
          </div>
        </div>
      </div>
      <div>
        {currentDate > latestMood && <MoodTracker userID={session.user.id} />}
        <h2>Active Protocols</h2>

        {activeProtocols && (
          <CurrentProtocols
            activeProtocols={activeProtocols}
            userID={session.user.id}
          />
        )}
      </div>
    </main>
  );
}
