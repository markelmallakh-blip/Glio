import { formatPoints } from "@/content/loyalty";
import { LoyaltyIcon } from "@/components/loyalty/LoyaltyIcon";

/** Highlight in the summary telling the customer what this booking earns. */
export function PointsEarnNote({ points }: { points: number }) {
  if (points <= 0) return null;
  return (
    <div className="flex items-center gap-3 rounded-xl bg-lime-cream px-3 py-2.5 ring-1 ring-lime-strong/60">
      <LoyaltyIcon name="points" size={40} />
      <p className="text-sm">
        <span className="block text-lg leading-tight font-display">
          Earn {formatPoints(points)} points
        </span>
        <span className="text-xs text-grey">Added to your account once you book</span>
      </p>
    </div>
  );
}
