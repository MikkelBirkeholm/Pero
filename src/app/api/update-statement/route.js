import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const dynamic = "force-dynamic";

export async function PUT(request) {
  const { statement, show_statement } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase.from("profile").upsert({
    id: session.user.id,
    statement: statement,
    show_statement: show_statement,
  });
  if (error) {
    return NextResponse.json("There was an error");
  }

  return NextResponse.json("success");
}
