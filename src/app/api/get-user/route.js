import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { userID } = await request.json();
  const cookieData = cookies();
  const supabase = createRouteHandlerClient({ cookieData });
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  let { data: profile, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userID);
  if (error) {
    return NextResponse.json({ data: "error" });
  }
  if (profile) {
    return NextResponse.json({ data: profile });
  }
}
