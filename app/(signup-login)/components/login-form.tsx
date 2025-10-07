"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { State } from "@/actions/signup-login";

type LoginFormProps = {
  errors: State["errors"];
  formAction: (payload: FormData) => void;
};

export default function LoginForm({ errors, formAction }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const disabled = !email || !password;

  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-black/90 dark:text-white/90">
          {isLogin ? "Welcome Back" : "Create a Footprints Account"}
        </h2>
        <p className="text-black/60 dark:text-white/60 mt-2">
          {isLogin
            ? "Log in to continue your journey."
            : "Sign up to start your journey."}
        </p>
      </div>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            className="w-full h-12 px-4 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-primary focus:border-primary text-black/90 dark:text-white/90 placeholder:text-black/40 dark:placeholder:text-white/40 transition-colors"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div aria-live="polite" aria-atomic="true">
            {errors?.email?.[0] && (
              <p className="mt-2 text-sm text-red-500" key={errors.email[0]}>
                {errors.email[0]}
              </p>
            )}
          </div>
        </div>
        <div>
          <label className="sr-only" htmlFor="password">
            Password
          </label>
          <input
            className="w-full h-12 px-4 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-primary focus:border-primary text-black/90 dark:text-white/90 placeholder:text-black/40 dark:placeholder:text-white/40 transition-colors"
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div aria-live="polite" aria-atomic="true">
            {errors?.password?.[0] && (
              <p className="mt-2 text-sm text-red-500" key={errors.password[0]}>
                {errors.password[0]}
              </p>
            )}
          </div>
        </div>
        <button
          className="w-full h-12 px-6 rounded-lg bg-primary text-white font-bold text-base cursor-pointer hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:ring-offset-background-dark disabled:bg-gray-400 disabled:opacity-75 disabled:cursor-not-allowed"
          type="submit"
          disabled={disabled}
        >
          {isLogin ? "Log In" : "Create Account"}
        </button>
      </form>
      {/* <div className="relative my-6">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <div className="w-full border-t border-black/10 dark:border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background-light dark:bg-background-dark text-black/60 dark:text-white/60">
                Or
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <button className="w-full h-12 px-6 rounded-lg bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 font-semibold text-sm hover:bg-white dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-3">
              <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M43.611 20.083H24v8.571h11.303c-1.649 4.657-6.08 8.12-11.303 8.12-8.351 0-15.174-6.823-15.174-15.174s6.823-15.174 15.174-15.174c4.322 0 7.918 1.957 10.316 4.75l6.533-6.533C36.685 4.393 30.683 2 24 2 11.832 2 2.25 11.832 2.25 24s9.582 22 21.75 22c11.352 0 20.16-9.108 20.16-20.16 0-1.34-.143-2.65-.399-3.917z"
                  fill="#4285F4"
                ></path>
              </svg>
              Login with Google
            </button>
            <button className="w-full h-12 px-6 rounded-lg bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 font-semibold text-sm hover:bg-white dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-3">
              <svg
                className="w-5 h-5"
                fill="#1877F2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-1.5c-.83 0-1 .42-1 .98V12h2.5l-.5 3H14v6.8c4.56-.93 8-4.96 8-9.8z"></path>
              </svg>
              Login with Facebook
            </button>
          </div> */}
      <p className="mt-8 text-center text-sm">
        <span className="mr-1 text-black/60 dark:text-white/60">
          {isLogin ? "Do not have an account?" : "Already have an account?"}
        </span>
        <Link
          className="font-semibold text-primary hover:underline"
          href={isLogin ? "signup" : "login"}
        >
          {isLogin ? "Sign up" : "Log in"}
        </Link>
      </p>
    </>
  );
}
