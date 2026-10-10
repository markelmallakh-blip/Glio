"use client";

import { useId, useState, type FormEvent } from "react";
import {
  MIN_REDEEM_POINTS,
  POINTS_PER_WALLET_EGP,
  formatPoints,
  pointsToEGP,
  redeemablePoints,
  validateRedeem,
} from "@/content/loyalty";
import { LoyaltyIcon } from "@/components/loyalty/LoyaltyIcon";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { appActions, getAppState, useAppState } from "@/lib/store/app-store";
import { showWalletSpotlight } from "@/lib/store/wallet-spotlight";
import { cn, formatEGP } from "@/lib/utils";
import { LoyaltyActivity } from "./LoyaltyActivity";

/** Lets the dialog fade out before the wallet spotlight takes over. */
const SPOTLIGHT_DELAY_MS = 250;

function RedeemForm({ balance, onDone }: { balance: number; onDone: () => void }) {
  const id = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | undefined>();
  const points = Number.parseInt(value, 10) || 0;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const problem = validateRedeem(points, balance);
    setError(problem);
    if (problem) return;
    const before = getAppState().loyalty.wallet;
    const amount = appActions.redeemPoints(points);
    if (!amount) return;
    onDone();
    window.setTimeout(() => showWalletSpotlight(before, before + amount), SPOTLIGHT_DELAY_MS);
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-points`} className="text-sm font-bold">
          Points to redeem
        </label>
        <div
          className={cn(
            "flex items-center gap-2 rounded-xl border bg-white py-1.5 pr-1.5 pl-3.5 focus-within:border-ink focus-within:ring-2 focus-within:ring-lime/70",
            error ? "border-danger" : "border-line",
          )}
        >
          <input
            id={`${id}-points`}
            data-autofocus
            inputMode="numeric"
            autoComplete="off"
            placeholder={`e.g. ${formatPoints(Math.min(500, redeemablePoints(balance)))}`}
            value={value}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : `${id}-value`}
            onChange={(event) => {
              setValue(event.target.value.replace(/\D/g, "").slice(0, 7));
              if (error) setError(undefined);
            }}
            className="min-w-0 flex-1 bg-transparent text-base font-semibold tabular-nums placeholder:font-normal placeholder:text-grey-light focus:outline-none"
          />
          <button
            type="button"
            onClick={() => {
              setValue(String(redeemablePoints(balance)));
              setError(undefined);
            }}
            className="rounded-lg bg-lime px-3 py-1.5 text-sm font-bold text-ink transition-colors hover:bg-lime-strong"
          >
            Max
          </button>
        </div>
        {error ? (
          <p id={`${id}-error`} role="alert" className="text-xs text-danger">
            {error}
          </p>
        ) : (
          <p id={`${id}-value`} className="text-xs text-grey">
            = <span className="font-bold text-ink">{formatEGP(pointsToEGP(points))}</span> wallet
            money · minimum {formatPoints(MIN_REDEEM_POINTS)} points
          </p>
        )}
      </div>
      <p className="text-xs text-grey">Wallet money can’t be turned back into points.</p>
      <div className="flex justify-end gap-2">
        <Button variant="outline-dark" icon={null} onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" variant="dark" icon="wallet">
          {points > 0 ? `Redeem ${formatEGP(pointsToEGP(points))}` : "Redeem"}
        </Button>
      </div>
    </form>
  );
}

export function PointsView() {
  const loyalty = useAppState((s) => s.loyalty);
  const [open, setOpen] = useState(false);
  const canRedeem = redeemablePoints(loyalty.points) >= MIN_REDEEM_POINTS;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-h3 font-display">My Points</h1>

      <div className="flex flex-col gap-5 rounded-[1.25rem] bg-lime-cream p-5 ring-1 ring-lime-strong/60 sm:flex-row sm:items-center md:p-6">
        <LoyaltyIcon name="points" size={96} />
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm font-semibold text-grey">Available points</p>
          <p className="text-h2 leading-none font-display tabular-nums">
            {formatPoints(loyalty.points)}
          </p>
          <p className="text-sm">
            Worth{" "}
            <span className="rounded-full bg-ink px-2 py-0.5 font-bold text-lime">
              {formatEGP(pointsToEGP(loyalty.points))}
            </span>{" "}
            in your wallet
          </p>
          <p className="mt-1 text-xs text-grey">
            Earn 1 point for every 1 EGP you pay · {POINTS_PER_WALLET_EGP} points = 1 EGP
          </p>
        </div>
        <div className="flex flex-col gap-1.5 sm:items-end">
          <Button
            variant="dark"
            icon="wallet"
            disabled={!canRedeem}
            onClick={() => setOpen(true)}
            className="w-full sm:w-fit"
          >
            Redeem Points
          </Button>
          {!canRedeem ? (
            <p className="text-xs text-grey sm:text-right">
              Redeem from {formatPoints(MIN_REDEEM_POINTS)} points
            </p>
          ) : null}
        </div>
      </div>

      <LoyaltyActivity
        title="Points activity"
        entries={loyalty.pointsActivity}
        format={(amount) => `${formatPoints(amount)} pts`}
        emptyText="Your points history will show here after your first booking."
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Redeem Points"
        description={`You have ${formatPoints(loyalty.points)} points. ${POINTS_PER_WALLET_EGP} points = 1 EGP in your wallet.`}
      >
        {open ? <RedeemForm balance={loyalty.points} onDone={() => setOpen(false)} /> : null}
      </Dialog>
    </div>
  );
}
