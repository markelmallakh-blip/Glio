"use client";

import "./globals.css";

/** Last-resort boundary when the root layout itself fails. */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-5 bg-ink p-6 text-center text-white">
        <h1 className="text-3xl font-extrabold text-lime italic">Something went wrong</h1>
        <p className="max-w-md text-white/80">Please refresh the page or try again in a moment.</p>
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-lime px-6 py-3 font-bold text-ink"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
