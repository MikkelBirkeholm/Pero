import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
// import generateWeekDates from "@/utils/generateWeekDates";

export async function PUT(request) {
  const { protocolID } = await request.json();

  // date generation
  // const currentDate = new Date().toISOString().slice(0, 10);
  // const weekDates = generateWeekDates(currentDate);

  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // const initialEntries = weekDates.map((date) => ({
  //   user_id: session.user.id,
  //   protocol_id: protocolID, // The ID of the newly added protocol
  //   date: date,
  //   completed: false, // Set to false by default
  // }));

  try {
    // Calls the saved procedure to add the new protocol to the user's protocols
    await supabase.rpc("add_user_protocol", {
      user_id: session.user.id,
      protocol_id: protocolID,
    });

    /* This inserts new dates when the protocol is added */
    // const { data: insertedProgress, error } = await supabase
    //   .from("progress")
    //   .insert(initialEntries);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ data: "error" });
  }

  return NextResponse.json({ data: "success" });
}
