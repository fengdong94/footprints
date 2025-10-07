"use client";

import { useActionState } from "react";
import { signup, State } from "@/actions/signup-login";
import LoginForm from "../components/login-form";

// TODO go to login button
export default function Signup() {
  const initialState: State = {};
  const [{ success, message, errors }, formAction] = useActionState(
    signup,
    initialState
  );

  if (success) {
    return (
      <div className="text-center">
        <p className="text-2xl font-bold mb-2">Check your email</p>
        {message}
      </div>
    );
  }

  return <LoginForm errors={errors} formAction={formAction} />;
}
