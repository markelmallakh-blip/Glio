"use client";

import { formatPoints, pointsToEGP } from "@/content/loyalty";
import { LoyaltyIcon } from "@/components/loyalty/LoyaltyIcon";
import { Button } from "@/components/ui/Button";
import { useAppState } from "@/lib/store/app-store";
import { formatEGP } from "@/lib/utils";
import { LoyaltyActivity } from "./LoyaltyActivity";

export function WalletView() {
  const loyalty = useAppState((s) => s.loyalty);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-h3 font-display">My Wallet</h1>

      <div className="flex flex-col gap-5 rounded-[1.25rem] bg-lime-cream p-5 ring-1 ring-lime-strong/60 sm:flex-row sm:items-center md:p-6">
        <LoyaltyIcon name="wallet" size={96} />
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm font-semibold text-grey">Wallet balance</p>
          <p className="text-h2 leading-none font-display tabular-nums">
            {formatEGP(loyalty.wallet)}
          </p>
          <p className="text-sm text-grey">
            Switch on “Use wallet balance” in the booking summary to pay with it.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <Button href="/booking" variant="dark">
            Book Now
          </Button>
          {loyalty.points > 0 ? (
            <Button href="/account/points" variant="outline-dark" size="sm" icon={null}>
              Redeem {formatPoints(loyalty.points)} points ·{" "}
              {formatEGP(pointsToEGP(loyalty.points))}
            </Button>
          ) : null}
        </div>
      </div>

      <LoyaltyActivity
        title="Wallet activity"
        entries={loyalty.walletActivity}
        format={formatEGP}
        emptyText="Redeem your points to add money to your wallet."
      />
    </div>
  );
}
