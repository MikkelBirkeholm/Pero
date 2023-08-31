import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import generateWeekDates from "@/utils/generateWeekDates";
const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });

  async function addProgressForNextWeek() {
    const currentDate = new Date().toISOString().slice(0, 10);
    const weekDates = generateWeekDates(currentDate);
    const allUsers = await supabase.from("profile").select("id, protocols");
    for (const user of allUsers.data) {
      const userID = user.id;
      const activeProtocols = user.protocols;

      const entriesToAdd = activeProtocols.flatMap((protocol) =>
        weekDates.map((date) => ({
          user_id: userID,
          protocol_id: protocol,
          date: date,
          completed: false,
        })),
      );

      await supabase.from("progress").insert(entriesToAdd);
    }
  }

  try {
    // Perform any necessary authentication checks here if needed

    await addProgressForNextWeek();

    return NextResponse.json({ data: "success" });
  } catch (error) {
    console.error("Error adding progress for the next week:", error);
    return NextResponse.error("Something went wrong");
  }
}
