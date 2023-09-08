import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const userID = params.id;

  const supabase = createRouteHandlerClient({ cookies });

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
