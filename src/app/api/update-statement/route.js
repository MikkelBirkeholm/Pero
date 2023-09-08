import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const { statement, show_statement, userID } = await request.json();
  // const cookieData = cookies();
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase.from("profile").upsert({
    id: userID,
    statement: statement,
    show_statement: show_statement,
  });
  if (error) {
    return NextResponse.json("There was an error");
  }

  return NextResponse.json("success");
}
