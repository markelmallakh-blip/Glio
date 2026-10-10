/** Loyalty rules for the demo. Replace with values from the backend in production. */

/** Points earned per 1 EGP actually paid for a booking. */
export const POINTS_PER_EGP_SPENT = 1;
/** Points needed for 1 EGP of wallet money. */
export const POINTS_PER_WALLET_EGP = 10;
/** Smallest redemption, and redemptions must be a multiple of the step. */
export const MIN_REDEEM_POINTS = 100;
export const REDEEM_STEP = POINTS_PER_WALLET_EGP;

export function pointsEarnedFor(amountPaid: number) {
  return Math.max(0, Math.floor(amountPaid * POINTS_PER_EGP_SPENT));
}

export function pointsToEGP(points: number) {
  return Math.floor(points / POINTS_PER_WALLET_EGP);
}

/** The largest amount that can be redeemed in one go ("Redeem all"). */
export function redeemablePoints(balance: number) {
  return Math.floor(balance / REDEEM_STEP) * REDEEM_STEP;
}

export function validateRedeem(points: number, balance: number): string | undefined {
  if (!Number.isFinite(points) || points <= 0) return "Enter how many points to redeem.";
  if (points < MIN_REDEEM_POINTS) return `Redeem at least ${MIN_REDEEM_POINTS} points.`;
  if (points > balance) return "You don’t have that many points.";
  if (points % REDEEM_STEP !== 0) return `Use a multiple of ${REDEEM_STEP} points.`;
  return undefined;
}

export function formatPoints(points: number) {
  return new Intl.NumberFormat("en-US").format(points);
}
