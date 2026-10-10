"use client";

import { useEffect, useRef, type ClipboardEvent, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: string;
};

export function OtpInput({ value, onChange, length = 4, error }: OtpInputProps) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length }, (_, index) => value[index] ?? "");

  // Move focus to the first box when the code step appears.
  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  function setDigit(index: number, digit: string) {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join("").slice(0, length));
  }

  function onKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) inputs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < length - 1) inputs.current[index + 1]?.focus();
  }

  function onPaste(event: ClipboardEvent<HTMLInputElement>) {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    event.preventDefault();
    onChange(pasted);
    inputs.current[Math.min(pasted.length, length - 1)]?.focus();
  }

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-sm text-grey">Verification code</legend>
      <div className="flex gap-3">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputs.current[index] = element;
            }}
            data-autofocus={index === 0 ? true : undefined}
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${index + 1}`}
            aria-invalid={error ? true : undefined}
            value={digit}
            onChange={(event) => {
              const typed = event.target.value.replace(/\D/g, "");
              if (typed.length > 1) {
                // SMS autofill or a fast paste drops the whole code into one box.
                const filled = (digits.slice(0, index).join("") + typed).slice(0, length);
                onChange(filled);
                inputs.current[Math.min(filled.length, length - 1)]?.focus();
                return;
              }
              setDigit(index, typed);
              if (typed && index < length - 1) inputs.current[index + 1]?.focus();
            }}
            onKeyDown={(event) => onKeyDown(index, event)}
            onPaste={onPaste}
            className={cn(
              "size-14 rounded-xl border bg-white text-center text-2xl font-bold text-ink focus:border-ink focus:ring-2 focus:ring-lime focus:outline-none",
              error ? "border-danger" : "border-line",
            )}
          />
        ))}
      </div>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </fieldset>
  );
}
