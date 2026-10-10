"use client";

import { useId, useState, type FormEvent } from "react";
import { findPromotion } from "@/content/promotions";
import { LoyaltyIcon } from "@/components/loyalty/LoyaltyIcon";
import { Icon } from "@/components/ui/Icon";
import { cn, formatEGP } from "@/lib/utils";

type PromoCodeFieldProps = {
  code: string | null;
  discount: number;
  onApply: (code: string) => void;
  onRemove: () => void;
};

export function PromoCodeField({ code, discount, onApply, onRemove }: PromoCodeFieldProps) {
  const id = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | undefined>();
  const applied = code ? findPromotion(code) : undefined;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const promotion = findPromotion(value);
    if (!value.trim()) {
      setError("Enter a promo code.");
      return;
    }
    if (!promotion) {
      setError("This code isn’t valid or has expired.");
      return;
    }
    setError(undefined);
    setValue("");
    onApply(promotion.code);
  }

  if (applied) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-lime-strong bg-lime-tint px-3.5 py-3">
        <Icon name="check-circle" size={20} className="text-success" />
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="text-sm font-bold">{applied.code}</p>
          <p className="text-xs text-grey">
            {applied.label}
            {discount > 0 ? ` · −${formatEGP(discount)}` : " · applies once a visit fee is added"}
          </p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="text-sm font-semibold underline underline-offset-4"
        >
          Remove
          <span className="sr-only"> promo code {applied.code}</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-1.5">
      <label htmlFor={`${id}-promo`} className="text-sm font-bold">
        Promo code
      </label>
      <div
        className={cn(
          "flex items-center gap-2 rounded-xl border bg-white py-1.5 pr-1.5 pl-2 focus-within:border-ink focus-within:ring-2 focus-within:ring-lime/70",
          error ? "border-danger" : "border-line",
        )}
      >
        <LoyaltyIcon name="promo" size={32} />
        <input
          id={`${id}-promo`}
          value={value}
          autoComplete="off"
          autoCapitalize="characters"
          placeholder="Enter code"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : `${id}-hint`}
          onChange={(event) => {
            setValue(event.target.value.toUpperCase());
            if (error) setError(undefined);
          }}
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold tracking-wide uppercase placeholder:font-normal placeholder:tracking-normal placeholder:text-grey-light placeholder:normal-case focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-ink px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-ink-soft"
        >
          Apply
        </button>
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-xs text-danger">
          {error}
        </p>
      ) : (
        <p id={`${id}-hint`} className="text-xs text-grey">
          Demo codes: GLIO10, WELCOME50, FREEVISIT
        </p>
      )}
    </form>
  );
}
