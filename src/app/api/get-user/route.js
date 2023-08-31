import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const dynamic = "force-dynamic";

export async function GET() {
  //   const { id } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let { data: profile, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", session.user.id);
  if (error) {
    return NextResponse.json({ data: "error" });
  }
  if (profile) {
    return NextResponse.json({ data: profile });
  }
}
