"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { type PaymentMethod, type ReceiptFile } from "@/types/booking";
import { emptyCard, validateCard, type CardErrors, type CardInput } from "@/lib/booking/card";
import { Button } from "@/components/ui/Button";
import { CheckIndicator } from "@/components/ui/Choice";
import { Icon } from "@/components/ui/Icon";
import { formatEGP } from "@/lib/utils";
import { CardFields } from "./CardFields";
import { MethodOption } from "./MethodOption";
import { InstapayDetails } from "./InstapayDetails";
import { PaymentLogo } from "./PaymentLogo";
import { ReceiptUpload, validateReceipt } from "./ReceiptUpload";

export type CheckoutResult =
  | { method: "card"; cardLast4: string }
  | { method: "instapay"; receipt: ReceiptFile }
  | { method: "wallet" };

type CheckoutStepProps = {
  amountDue: number;
  remaining: number;
  /** Wallet money already taken off the total. */
  walletUsed: number;
  onBack: () => void;
  onConfirm: (result: CheckoutResult) => void;
};

type Errors = CardErrors & { method?: string; receipt?: string; terms?: string };

/**
 * Step 4: pay the amount due now by card, or by InstaPay transfer + receipt upload.
 * When the wallet covers everything there is nothing to charge, so only the terms remain.
 */
export function CheckoutStep({
  amountDue,
  remaining,
  walletUsed,
  onBack,
  onConfirm,
}: CheckoutStepProps) {
  const reduce = useReducedMotion();
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [card, setCard] = useState<CardInput>(emptyCard);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [processing, setProcessing] = useState(false);
  const coveredByWallet = amountDue === 0 && remaining === 0 && walletUsed > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors = {
      method: method || coveredByWallet ? undefined : "Choose how you’d like to pay.",
      ...(method === "card" && !coveredByWallet ? validateCard(card, new Date()) : {}),
      receipt: method === "instapay" && !coveredByWallet ? validateReceipt(receipt) : undefined,
      terms: agreed ? undefined : "Please accept the terms to continue.",
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      document
        .querySelector<HTMLElement>("[aria-invalid='true'], [role='alert']")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setProcessing(true);
    // Simulated gateway / upload round-trip.
    window.setTimeout(() => {
      if (coveredByWallet) {
        onConfirm({ method: "wallet" });
      } else if (method === "card") {
        onConfirm({ method: "card", cardLast4: card.number.replace(/\D/g, "").slice(-4) });
      } else if (receipt) {
        onConfirm({
          method: "instapay",
          receipt: { name: receipt.name, size: receipt.size, type: receipt.type },
        });
      }
    }, 900);
  }

  const reveal = {
    initial: reduce ? false : { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1 },
    exit: reduce ? { opacity: 0 } : { height: 0, opacity: 0 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.25rem] bg-ink px-5 py-4 text-white">
        <div className="flex flex-col">
          <span className="text-sm text-white/70">Amount to pay now</span>
          <span className="text-h4 font-display text-lime">{formatEGP(amountDue)}</span>
        </div>
        <div className="flex flex-col items-end gap-0.5 text-right text-sm text-white/80">
          {walletUsed > 0 ? (
            <span className="flex items-center gap-1.5">
              <Icon name="wallet" size={16} className="text-lime" />
              {formatEGP(walletUsed)} paid from your wallet
            </span>
          ) : null}
          {remaining > 0 ? <span>+ {formatEGP(remaining)} on the visit day</span> : null}
        </div>
      </div>

      {coveredByWallet ? (
        <p className="flex items-start gap-3 rounded-[1.25rem] bg-lime-tint p-4 text-sm ring-1 ring-lime-strong">
          <Icon name="check-circle" size={20} className="mt-0.5 text-success" />
          <span>
            <span className="block font-bold">Fully covered by your GLIO wallet</span>
            Nothing will be charged. Accept the terms below to confirm your booking.
          </span>
        </p>
      ) : (
        <fieldset
          className="flex flex-col gap-3"
          aria-describedby={errors.method && !method ? "method-error" : undefined}
        >
          <legend className="mb-4 text-h4 font-display">Choose Payment Method</legend>
          <MethodOption
            value="card"
            selected={method === "card"}
            onSelect={setMethod}
            title="Credit / Debit card"
            description="Pay instantly and get confirmed right away"
            logos={
              <>
                <PaymentLogo name="visa" className="h-7" />
                <PaymentLogo name="mastercard" className="h-6" />
              </>
            }
          />
          <MethodOption
            value="instapay"
            selected={method === "instapay"}
            onSelect={setMethod}
            title="InstaPay transfer"
            description="Transfer, upload the receipt, we confirm"
            logos={<PaymentLogo name="instapay" className="h-5" />}
          />
          {errors.method && !method ? (
            <p id="method-error" role="alert" className="text-sm text-danger">
              {errors.method}
            </p>
          ) : null}
        </fieldset>
      )}

      <AnimatePresence initial={false} mode="wait">
        {method === "card" && !coveredByWallet ? (
          <motion.section
            key="card"
            {...reveal}
            className="overflow-hidden"
            aria-label="Card details"
          >
            <div className="flex flex-col gap-3">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-grey">
                <Icon name="shield" size={18} className="text-success" />
                Secure checkout · your card will be charged {formatEGP(amountDue)}
              </p>
              <CardFields
                value={card}
                errors={errors}
                onChange={(name, value) => {
                  setCard((current) => ({ ...current, [name]: value }));
                  if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
                }}
              />
              <p className="rounded-lg bg-surface px-3 py-2 text-xs text-grey">
                Demo mode: use test card 4242 4242 4242 4242, any future date and any CVV.
              </p>
            </div>
          </motion.section>
        ) : null}
        {method === "instapay" && !coveredByWallet ? (
          <motion.section
            key="instapay"
            {...reveal}
            className="overflow-hidden"
            aria-label="InstaPay transfer"
          >
            <div className="flex flex-col gap-6">
              <InstapayDetails amount={amountDue} />
              <ReceiptUpload
                file={receipt}
                error={errors.receipt}
                onChange={(file) => {
                  setReceipt(file);
                  setErrors((current) => ({ ...current, receipt: undefined }));
                }}
              />
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <div className="flex flex-col gap-1.5">
        <label className="flex cursor-pointer items-start gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(event) => {
              setAgreed(event.target.checked);
              setErrors((current) => ({ ...current, terms: undefined }));
            }}
            className="peer sr-only"
          />
          <CheckIndicator
            checked={agreed}
            className="mt-0.5 peer-focus-visible:ring-2 peer-focus-visible:ring-ink"
          />
          <span>
            I agree to the{" "}
            <Link href="/terms-and-conditions" target="_blank" className="font-semibold underline">
              Terms & Conditions
            </Link>
            . Changes or cancellations must be made at least 48 hours before the visit.
          </span>
        </label>
        {errors.terms ? <p className="text-sm text-danger">{errors.terms}</p> : null}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line-soft pt-6">
        <Button
          variant="outline-dark"
          icon={null}
          leadingIcon="arrow-left"
          onClick={onBack}
          disabled={processing}
        >
          Back
        </Button>
        <Button type="submit" size="lg" variant="dark" disabled={processing} aria-busy={processing}>
          {processing
            ? "Processing…"
            : coveredByWallet
              ? "Confirm Booking"
              : method === "instapay"
                ? "Submit Receipt"
                : `Pay ${formatEGP(amountDue)}`}
        </Button>
      </div>
    </form>
  );
}
