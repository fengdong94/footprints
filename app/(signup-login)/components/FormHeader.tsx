"use client";

import { usePathname } from "next/navigation";

export default function FormHeader() {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
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
  );
}
