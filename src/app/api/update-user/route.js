import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const { firstname, lastname } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("profile")
    .upsert({ id: session.user.id, firstname: firstname, lastname: lastname });
  if (error) {
    return NextResponse.json("There was an error");
  }

  return NextResponse.json("success");
}
