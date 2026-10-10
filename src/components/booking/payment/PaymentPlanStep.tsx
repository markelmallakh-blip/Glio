"use client";

import { useState } from "react";
import { splitPayment } from "@/lib/booking/payment";
import { Button } from "@/components/ui/Button";
import { type BookingAction, type BookingDraft } from "../state";
import { PaymentPlanPicker } from "./PaymentPlanPicker";

type PaymentPlanStepProps = {
  total: number;
  payment: BookingDraft["payment"];
  dispatch: (action: BookingAction) => void;
  onBack: () => void;
  onContinue: () => void;
};

/** Step 3: decide how much is paid now. The actual payment happens on the next step. */
export function PaymentPlanStep({
  total,
  payment,
  dispatch,
  onBack,
  onContinue,
}: PaymentPlanStepProps) {
  const [methodError, setMethodError] = useState<string | undefined>();
  const split = splitPayment(total, payment);
  const methodMissing = split.plan === "deposit" && !payment.remainingMethod;

  return (
    <div className="flex flex-col gap-10">
      <PaymentPlanPicker
        total={total}
        payment={payment}
        dispatch={(action) => {
          dispatch(action);
          setMethodError(undefined);
        }}
        methodError={methodMissing ? methodError : undefined}
      />
      <div className="flex items-center justify-between gap-3 border-t border-line-soft pt-6">
        <Button variant="outline-dark" icon={null} leadingIcon="arrow-left" onClick={onBack}>
          Back
        </Button>
        <Button
          size="lg"
          variant="dark"
          onClick={() => {
            if (methodMissing) {
              setMethodError("Choose how you’ll pay the remaining amount.");
              document
                .querySelector("#remaining-method-error")
                ?.scrollIntoView({ block: "center" });
              return;
            }
            onContinue();
          }}
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
}
