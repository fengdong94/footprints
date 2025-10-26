"use client";

import { useActionState } from "react";
import { login, State } from "@/actions/signup-login";
import LoginForm from "../login-form";

export default function Login() {
  const initialState: State = {};
  const [{ errors, success, msg }, formAction] = useActionState(
    login,
    initialState
  );
  return (
    <LoginForm
      errors={errors}
      formAction={formAction}
      success={success}
      msg={msg}
    />
  );
}
