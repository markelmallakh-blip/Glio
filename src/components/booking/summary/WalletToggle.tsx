"use client";

import Link from "next/link";
import { useId } from "react";
import { LoyaltyIcon } from "@/components/loyalty/LoyaltyIcon";
import { Switch } from "@/components/ui/Switch";
import { cn, formatEGP } from "@/lib/utils";

type WalletToggleProps = {
  balance: number;
  /** Amount actually taken off this booking while the switch is on. */
  applied: number;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
};

/** "Use wallet balance" row under the promo code. */
export function WalletToggle({ balance, applied, enabled, onChange }: WalletToggleProps) {
  const id = useId();
  const empty = balance <= 0;
  const on = enabled && !empty;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors",
        on ? "border-lime-strong bg-lime-tint" : "border-line bg-white",
      )}
    >
      <LoyaltyIcon name="wallet" size={40} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p id={`${id}-label`} className="text-sm font-bold">
          Use wallet balance
        </p>
        <p id={`${id}-hint`} className="flex flex-wrap items-center gap-1.5 text-xs text-grey">
          <span
            className={cn(
              "rounded-full px-2 py-0.5 font-bold",
              empty ? "bg-surface text-grey" : "bg-lime text-ink",
            )}
          >
            {formatEGP(balance)}
          </span>
          {empty ? (
            <Link href="/account/points" className="underline underline-offset-2 hover:text-ink">
              Redeem points to top up
            </Link>
          ) : on ? (
            <span className="font-semibold text-success">
              −{formatEGP(applied)} on this booking
            </span>
          ) : (
            <span>available</span>
          )}
        </p>
      </div>
      <Switch
        checked={on}
        disabled={empty}
        onChange={onChange}
        labelledBy={`${id}-label`}
        describedBy={`${id}-hint`}
      />
    </div>
  );
}
