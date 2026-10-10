"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Report to monitoring here; the user only sees a friendly message.
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="bg-ink text-white">
      <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-5 py-20 text-center">
        <h1 className="text-h2 font-display text-lime">Something went wrong</h1>
        <p className="max-w-md text-white/80">
          We couldn’t load this page. Please try again, and if it keeps happening contact our
          support team.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="lime" icon={null} onClick={reset}>
            Try again
          </Button>
          <Button href="/" variant="outline-light" icon={null}>
            Back to Home
          </Button>
        </div>
      </Container>
    </main>
  );
}
