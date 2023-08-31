import styles from "./styles.module.scss";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProtocolGrid from "@/components/Protocols/ProtocolGrid";
import { getSession, createServerSupabaseClient } from "@/utils/supabaseFix";

export const revalidate = 3600;
const supabase = createServerComponentClient({ cookies });
// const supabase = createServerSupabaseClient();

const getProtocols = async () => {
  let { data: protocols } = await supabase.from("protocols").select("*");
  if (protocols) {
    return { protocols };
  }
};

const getCategories = async () => {
  let { data: categories } = await supabase.from("categories").select("*");
  if (categories) {
    return { categories };
  }
};

export default async function Protocols() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  // const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const getCurrentProtocols = async (user) => {
    let { data: profile, error } = await supabase
      .from("profile")
      .select("protocols")
      .eq("id", user);
    if (error) console.log("error from protocols page", error);
    if (profile) {
      return profile[0].protocols;
    }
  };

  const currentProtocols = await getCurrentProtocols(session.user.id);
  const AllProtocols = await getProtocols();
  const AllCategories = await getCategories();

  return (
    <main className={styles.main}>
      <hgroup>
        <h1>Protocols</h1>
        <p>Protocols and strategies you can start using today</p>
      </hgroup>
      <div className={styles.userDashboard}>
        <div className={styles.sidebar}>
          <ul className={styles.categoryNav}>
            <li>
              <h2>Categories</h2>
            </li>
            {AllCategories &&
              AllCategories.categories.map((category, i) => {
                return (
                  <li key={i}>
                    <a href={`#${category.title}`}>{category.title}</a>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className={styles.mainContent}>
          {currentProtocols && (
            <ProtocolGrid
              categories={AllCategories.categories}
              protocols={AllProtocols.protocols}
              currentProtocols={currentProtocols}
              currentUser={session.user.id}
            />
          )}
        </div>
      </div>
    </main>
  );
}
