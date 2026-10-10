"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("done");
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <input
        id={`${id}-email`}
        type="email"
        autoComplete="email"
        placeholder="Enter Email Address"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          if (status !== "idle") setStatus("idle");
        }}
        aria-invalid={status === "error"}
        aria-describedby={`${id}-status`}
        className="h-12 rounded-[0.625rem] border border-line-soft bg-white px-3.5 text-sm text-ink placeholder:text-ink/80"
      />
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="sm">
          Subscribe
        </Button>
        <p id={`${id}-status`} role="status" className="text-sm text-white/80">
          {status === "error" ? "Please enter a valid email address." : null}
          {status === "done" ? "Thanks! You're on the list." : null}
        </p>
      </div>
    </form>
  );
}
