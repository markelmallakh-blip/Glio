"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { DEPOSIT_MIN_TOTAL, depositPercents, remainingMethods } from "@/content/payment";
import { depositAmount, isDepositAvailable, splitPayment } from "@/lib/booking/payment";
import { RadioIndicator } from "@/components/ui/Choice";
import { Icon } from "@/components/ui/Icon";
import { cn, formatEGP } from "@/lib/utils";
import { type BookingAction, type BookingDraft } from "../state";

type PaymentPlanPickerProps = {
  total: number;
  payment: BookingDraft["payment"];
  dispatch: (action: BookingAction) => void;
  methodError?: string;
};

const peerRing =
  "peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-2";

function OptionCard({
  name,
  checked,
  disabled,
  onSelect,
  children,
  className,
}: {
  name: string;
  checked: boolean;
  disabled?: boolean;
  onSelect: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "flex items-center gap-3 rounded-[0.875rem] border px-4 py-3.5 transition-colors",
        checked ? "border-2 border-lime-strong bg-lime-tint" : "border-line bg-white",
        disabled
          ? "cursor-not-allowed bg-surface opacity-55"
          : "cursor-pointer hover:border-ink/50",
        className,
      )}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onSelect}
        className="peer sr-only"
      />
      <RadioIndicator checked={checked} className={peerRing} />
      {children}
    </label>
  );
}

export function PaymentPlanPicker({
  total,
  payment,
  dispatch,
  methodError,
}: PaymentPlanPickerProps) {
  const reduce = useReducedMotion();
  const depositAvailable = isDepositAvailable(total);
  const split = splitPayment(total, payment);
  const showDeposit = split.plan === "deposit";

  return (
    <section aria-labelledby="payment-plan-heading" className="flex flex-col gap-4">
      <h2 id="payment-plan-heading" className="text-h4 font-display">
        How would you like to pay?
      </h2>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="sr-only">Payment option</legend>
        <OptionCard
          name="payment-plan"
          checked={!showDeposit}
          onSelect={() => dispatch({ type: "set-payment", payment: { plan: "full" } })}
        >
          <span className="flex flex-1 flex-col">
            <span className="font-bold">Pay full amount</span>
            <span className="text-sm text-grey">Nothing left to pay on the visit day</span>
          </span>
          <span className="font-bold whitespace-nowrap">{formatEGP(total)}</span>
        </OptionCard>
        <OptionCard
          name="payment-plan"
          checked={showDeposit}
          disabled={!depositAvailable}
          onSelect={() => dispatch({ type: "set-payment", payment: { plan: "deposit" } })}
        >
          <span className="flex flex-1 flex-col">
            <span className="font-bold">Pay a down payment now</span>
            <span className="text-sm text-grey">
              {depositAvailable
                ? "30%, 50% or 70% now, the rest on the visit day"
                : `Not available for bookings lower than ${formatEGP(DEPOSIT_MIN_TOTAL)}`}
            </span>
          </span>
          {depositAvailable ? (
            <span className="text-sm whitespace-nowrap text-grey">
              from <span className="font-bold text-ink">{formatEGP(depositAmount(total, 30))}</span>
            </span>
          ) : (
            <Icon name="info" size={20} className="text-grey" />
          )}
        </OptionCard>
      </fieldset>

      <AnimatePresence initial={false}>
        {showDeposit ? (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-5 rounded-[1.25rem] border border-line p-4 md:p-5">
              <fieldset className="flex flex-col gap-3">
                <legend className="mb-3 text-base font-bold">Down payment amount</legend>
                <div className="grid grid-cols-3 gap-2">
                  {depositPercents.map((percent) => {
                    const checked = payment.depositPercent === percent;
                    return (
                      <label
                        key={percent}
                        className={cn(
                          "relative flex cursor-pointer flex-col items-center gap-0.5 rounded-[0.875rem] border px-2 py-3 text-center transition-colors",
                          checked
                            ? "border-2 border-lime-strong bg-lime-tint"
                            : "border-line bg-white hover:border-ink/50",
                        )}
                      >
                        <input
                          type="radio"
                          name="deposit-percent"
                          checked={checked}
                          onChange={() =>
                            dispatch({ type: "set-payment", payment: { depositPercent: percent } })
                          }
                          className="peer sr-only"
                        />
                        <span className="text-2xl font-display">{percent}%</span>
                        <span className="text-sm font-semibold">
                          {formatEGP(depositAmount(total, percent))}
                        </span>
                        <span
                          className={cn(
                            "pointer-events-none absolute inset-0 rounded-[0.875rem]",
                            peerRing,
                          )}
                        />
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="flex items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3">
                <span className="text-sm">
                  <span className="font-bold">Remaining amount</span>
                  <span className="block text-grey">Paid to the GLIO team on the visit day</span>
                </span>
                <span className="text-lg font-bold whitespace-nowrap">
                  {formatEGP(split.remaining)}
                </span>
              </div>

              <fieldset
                className="flex flex-col gap-2.5"
                aria-describedby={methodError ? "remaining-method-error" : undefined}
              >
                <legend className="mb-3 text-base font-bold">
                  How would you like to pay the remaining amount?
                </legend>
                {remainingMethods.map((method) => (
                  <OptionCard
                    key={method.id}
                    name="remaining-method"
                    checked={payment.remainingMethod === method.id}
                    onSelect={() =>
                      dispatch({ type: "set-payment", payment: { remainingMethod: method.id } })
                    }
                  >
                    <Icon name={method.icon} size={22} />
                    <span className="flex flex-1 flex-col">
                      <span className="font-semibold">{method.label}</span>
                      <span className="text-xs text-grey">{method.description}</span>
                    </span>
                  </OptionCard>
                ))}
                {methodError ? (
                  <p id="remaining-method-error" role="alert" className="text-sm text-danger">
                    {methodError}
                  </p>
                ) : null}
              </fieldset>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
