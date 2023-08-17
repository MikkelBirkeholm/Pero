import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: protocols, error } = await supabase.rpc(
    "get_active_protocols",
    {
      user_id: session.user.id,
    },
  );

  if (error) {
    console.log("error", error);
    return NextResponse.json(error);
  }

  return NextResponse.json(protocols);
}