import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const dynamic = "force-dynamic";

export async function PUT(request) {
  const { protocolID, userID } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // Call the database function to remove the protocol from the user's protocols
  try {
    await supabase.rpc("remove_user_protocol", {
      user_id: userID,
      protocol_id: protocolID,
    });
    const { error } = await supabase
      .from("progress")
      .delete()
      .match({ user_id: userID, protocol_id: protocolID });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ data: "error" });
  }

  return NextResponse.json({ data: "success" });
}
