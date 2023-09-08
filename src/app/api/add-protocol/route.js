import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
// import generateWeekDates from "@/utils/generateWeekDates";

export const dynamic = "force-dynamic";

export async function PUT(request) {
  const { protocolID, userID } = await request.json();
  // const cookieData = cookies();

  // date generation
  // const currentDate = new Date().toISOString().slice(0, 10);
  // const weekDates = generateWeekDates(currentDate);

  const supabase = createRouteHandlerClient({ cookies });

  try {
    // Calls the saved procedure to add the new protocol to the user's protocols
    await supabase.rpc("add_user_protocol", {
      user_id: userID,
      protocol_id: protocolID,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ data: "error" });
  }

  return NextResponse.json({ data: "success" });
}
