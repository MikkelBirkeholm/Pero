"use client";
// import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";

export const Confirm = () => {
  const supabase = createClientComponentClient();
  const extID = "nifckpdojcjejcdldhibonhemlifmlbi";

  async function getUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      chrome.runtime.sendMessage(
        extID,
        { message: session.user.id },
        function (response) {
          if (response) {
            chrome.runtime.sendMessage(extID, { message: "completed" });
          }
        },
      );
    } else {
      console.log("no session");
    }
  }
  getUser();

  return <div>Confirm</div>;
};
export default Confirm;
