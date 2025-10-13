"use client";

import { useState } from "react";
import { useSearchParams, redirect } from "next/navigation";
import { confirmAccount } from "@/actions/signup-login";

// TODO button component
export default function Signup() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [errorMsg, setErrorMsg] = useState<string>();

  return (
    <div className="text-center">
      <p className="text-2xl font-bold mb-2">Account Confirmation</p>
      To confirm your account, please click the button below.
      <button
        className="w-full my-4 h-12 px-6 rounded-lg bg-primary text-white font-bold text-base cursor-pointer hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:ring-offset-background-dark disabled:bg-gray-400 disabled:opacity-75 disabled:cursor-not-allowed"
        onClick={async () => {
          const res = await confirmAccount(token || "");
          if (res.success) {
            // non-form actions can't redirect in server actions, only can redirect in client
            // TODO profile?
            // TODO loading
            redirect("/")
          } else {
            setErrorMsg(res.msg)
          }
        }}
      >
        Confirm Account
      </button>
      <div aria-live="polite" aria-atomic="true">
        {errorMsg && <p className="my-2 text-red-500">{errorMsg}</p>}
      </div>
      If you have any issue confirming your account,
      <br />
      please contact fengdong9446@gmail.com.
    </div>
  );
}
