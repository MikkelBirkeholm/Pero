import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const { mood_score, mood_reason } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("mood_entries")
    .insert([
      {
        mood_score: mood_score,
        mood_reason: mood_reason,
        user_id: session.user.id,
      },
    ])
    .select();
  if (error) {
    return NextResponse.json({ error: "There was an error" }, { status: 500 });
  }
  return NextResponse.json("success");
}
