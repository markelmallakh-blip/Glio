import { type DepositPercent, type RemainingMethod } from "@/types/booking";
import { type IconName } from "@/components/ui/Icon";

/** Down payment is only offered when the booking total is above this amount (EGP). */
export const DEPOSIT_MIN_TOTAL = 1500;

export const depositPercents: DepositPercent[] = [30, 50, 70];

export const remainingMethods: {
  id: RemainingMethod;
  label: string;
  description: string;
  icon: IconName;
}[] = [
  {
    id: "instapay",
    label: "Instapay",
    description: "Transfer before the team starts",
    icon: "phone",
  },
  {
    id: "pos",
    label: "POS (card with GLIO team)",
    description: "Pay by card on our POS machine",
    icon: "credit-card",
  },
  { id: "cash", label: "Cash on spot", description: "Pay the team in cash", icon: "cash" },
];

export function getRemainingMethod(id: RemainingMethod) {
  return remainingMethods.find((method) => method.id === id);
}

/**
 * Demo Instapay beneficiary details shown on the payment step.
 * Replace with GLIO's real account before going live.
 */
export const instapayAccount = {
  beneficiary: "GLIO for Mobile Car Care",
  bank: "Commercial International Bank (CIB)",
  accountNumber: "100045678912",
  instapayAddress: "glio@instapay",
};

/** Accepted receipt uploads. */
export const RECEIPT_MAX_BYTES = 10 * 1024 * 1024;
export const RECEIPT_ACCEPT = "image/png,image/jpeg,image/webp,image/heic,application/pdf";
