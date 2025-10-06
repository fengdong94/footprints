"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function FormFooter() {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
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
  );
}
