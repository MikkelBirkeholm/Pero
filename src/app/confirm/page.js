"use client";
// import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const Confirm = () => {
  const supabase = createClientComponentClient();
  const extID = "nifckpdojcjejcdldhibonhemlifmlbi";

  async function getUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      console.log("user ID", session.user.id);
      chrome.runtime.sendMessage(
        extID,
        { message: session.user.id },
        function (response) {
          if (response) {
            console.log(response);
          }
        },
      );
    } else {
      console.log("no session");
    }
    //   setUser(session.user);
  }
  getUser();

  return <div>Confirm</div>;
};
export default Confirm;
