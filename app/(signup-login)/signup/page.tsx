"use client";

import { useActionState } from "react";
import { signup, State } from "@/actions/signup-login";
import LoginForm from "../login-form";

// TODO go to login button, email icon top "Check your email"
export default function Signup() {
  const initialState: State = {};
  const [{ success, msg, errors }, formAction] = useActionState(
    signup,
    initialState
  );

  if (success) {
    return (
      <div className="text-center">
        <p className="text-2xl font-bold mb-2">Check your email</p>
        {msg}
      </div>
    );
  }

  return (
    <LoginForm
      errors={errors}
      formAction={formAction}
      success={success}
      msg={msg}
    />
  );
}
