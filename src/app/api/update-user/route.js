import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const { firstname, lastname, userID } = await request.json();
  // const cookieData = cookies();
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase
    .from("profile")
    .upsert({ id: userID, firstname: firstname, lastname: lastname });
  if (error) {
    return NextResponse.json("There was an error");
  }

  return NextResponse.json("success");
}
