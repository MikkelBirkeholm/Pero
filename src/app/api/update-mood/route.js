import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(request) {
  const { mood_score, mood_reason, userID } = await request.json();

  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase
    .from("mood_entries")
    .insert([
      {
        mood_score: mood_score,
        mood_reason: mood_reason,
        user_id: userID,
      },
    ])
    .select();
  if (error) {
    return NextResponse.json({ error: "There was an error" }, { status: 500 });
  }
  return NextResponse.json("success");
}
