"use client";

import { useEffect } from "react";

// TODO style

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen h-full flex-col items-center justify-center">
      <h2 className="text-center text-2xl font-bold">Oops...Something went wrong!</h2>
      <button
        className="mt-4 h-10 px-6 rounded-lg bg-primary text-white font-bold text-base cursor-pointer hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:ring-offset-background-dark"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
