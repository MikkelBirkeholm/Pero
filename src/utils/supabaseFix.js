import { cookies } from "next/headers";
import { cache } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient({ cookies: () => cookieStore });
});

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Error from supabaseFix:", error);
    return null;
  }
}