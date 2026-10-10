import { DEPOSIT_MIN_TOTAL } from "@/content/payment";
import { type DepositPercent } from "@/types/booking";

export type PaymentChoice = {
  plan: "full" | "deposit";
  depositPercent: DepositPercent;
};

export function isDepositAvailable(total: number) {
  return total > DEPOSIT_MIN_TOTAL;
}

export function depositAmount(total: number, percent: DepositPercent) {
  return Math.round((total * percent) / 100);
}

/** What is charged now vs. settled on the visit day. Falls back to full when not eligible. */
export function splitPayment(total: number, choice: PaymentChoice) {
  const deposit = choice.plan === "deposit" && isDepositAvailable(total);
  const paidNow = deposit ? depositAmount(total, choice.depositPercent) : total;
  return {
    plan: deposit ? ("deposit" as const) : ("full" as const),
    depositPercent: deposit ? choice.depositPercent : null,
    paidNow,
    remaining: total - paidNow,
  };
}
