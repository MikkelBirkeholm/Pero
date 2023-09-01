import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function getCookieData() {
  const cookieData = cookies().getAll();
  return cookieData;
}

export default async function Unauthenticated() {
  const cookieData = await getCookieData();
  const supabase = createServerComponentClient({ cookieData });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div>
      <h1>Unauthenticated</h1>
      <span>Please Sign In</span>
    </div>
  );
}
