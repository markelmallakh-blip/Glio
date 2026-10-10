"use client";

import { type ReactNode } from "react";
import { type PaymentMethod } from "@/types/booking";
import { RadioIndicator } from "@/components/ui/Choice";
import { cn } from "@/lib/utils";

type MethodOptionProps = {
  value: PaymentMethod;
  selected: boolean;
  onSelect: (value: PaymentMethod) => void;
  title: string;
  description: string;
  logos: ReactNode;
};

/** Radio card for a payment method with its brand logos. */
export function MethodOption({
  value,
  selected,
  onSelect,
  title,
  description,
  logos,
}: MethodOptionProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-[0.875rem] border px-4 py-4 transition-colors",
        selected
          ? "border-2 border-lime-strong bg-lime-tint"
          : "border-line bg-white hover:border-ink/50",
      )}
    >
      <input
        type="radio"
        name="payment-method"
        value={value}
        checked={selected}
        onChange={() => onSelect(value)}
        className="peer sr-only"
      />
      <RadioIndicator
        checked={selected}
        className="peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-2"
      />
      <span className="flex flex-1 flex-col">
        <span className="font-bold">{title}</span>
        <span className="text-sm text-grey">{description}</span>
      </span>
      <span className="flex shrink-0 items-center gap-2">{logos}</span>
    </label>
  );
}
