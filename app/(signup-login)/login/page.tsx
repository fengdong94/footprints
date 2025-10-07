"use client";

import { useActionState } from "react";
import { login, State } from "@/actions/signup-login";
import LoginForm from "../components/login-form";

export default function Login() {
  const initialState: State = {};
  const [{ errors }, formAction] = useActionState(login, initialState);
  return <LoginForm errors={errors} formAction={formAction} />;
}
