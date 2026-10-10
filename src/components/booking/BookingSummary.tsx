"use client";

import { Fragment, useState } from "react";
import { getArea, getExtra, getService } from "@/content/services";
import { splitPayment } from "@/lib/booking/payment";
import { pointsEarnedFor } from "@/content/loyalty";
import { carSubtotal } from "@/lib/booking/pricing";
import { useAppState } from "@/lib/store/app-store";
import { visitDurationMinutes } from "@/lib/booking/schedule";
import {
  formatDuration,
  formatDurationRange,
  formatLongDate,
  formatMinute,
  fromDateKey,
} from "@/lib/booking/time";
import { Badge } from "@/components/ui/Choice";
import { Icon } from "@/components/ui/Icon";
import { cn, formatEGP, formatSignedEGP } from "@/lib/utils";
import { CarSpecs } from "@/components/vehicles/CarSpecs";
import {
  carTitle,
  draftTotals,
  toSelections,
  type AddressDraft,
  type BookingAction,
  type BookingDraft,
} from "./state";
import { BookingNotesField } from "./summary/BookingNotesField";
import { PointsEarnNote } from "./summary/PointsEarnNote";
import { PromoCodeField } from "./summary/PromoCodeField";
import { WalletToggle } from "./summary/WalletToggle";

type BookingSummaryProps = {
  draft: BookingDraft;
  address: AddressDraft | null;
  dispatch: (action: BookingAction) => void;
  onEditCars?: () => void;
};

function Line({ label, value, muted }: { label: string; value?: string; muted?: boolean }) {
  return (
    <div className={cn("flex justify-between gap-3 text-sm", muted && "text-grey")}>
      <span>{label}</span>
      {value ? <span className="whitespace-nowrap">{value}</span> : null}
    </div>
  );
}

function SummaryBody({ draft, address, dispatch, onEditCars }: BookingSummaryProps) {
  const selections = toSelections(draft.cars);
  const duration = visitDurationMinutes(selections);
  const area = address ? getArea(address.areaId) : undefined;
  const signedIn = useAppState((s) => Boolean(s.session));
  const walletBalance = useAppState((s) => (s.session ? s.loyalty.wallet : 0));
  const totals = draftTotals(draft, address, walletBalance);
  const end = draft.slotStart !== null ? draft.slotStart + duration : null;

  return (
    <div className="flex flex-col gap-5">
      {draft.cars.length === 0 ? (
        <p className="text-sm text-grey">Select a car to start your booking.</p>
      ) : null}
      {draft.cars.map((line, index) => {
        const service = line.serviceSlug ? getService(line.serviceSlug) : undefined;
        return (
          <Fragment key={line.key}>
            <hr className="border-line-soft" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Badge>Car {index + 1}</Badge>
                <p className="flex-1 truncate font-bold">{carTitle(line.car)}</p>
                {onEditCars ? (
                  <button
                    type="button"
                    onClick={onEditCars}
                    className="text-sm text-grey underline"
                  >
                    Edit
                  </button>
                ) : null}
              </div>
              <p className="text-xs text-grey">
                <CarSpecs car={line.car} extra={line.isNew ? "New" : undefined} />
              </p>
              {service ? (
                <Line
                  label={`${service.name} · ${formatDurationRange(service.durationMinutes)}`}
                  value={formatEGP(service.price)}
                />
              ) : (
                <Line label="Package not selected yet" muted />
              )}
              {line.extraIds.map((id) => {
                const extra = getExtra(id);
                return extra ? (
                  <Line
                    key={id}
                    label={`+ ${extra.name}`}
                    value={formatSignedEGP(extra.price)}
                    muted
                  />
                ) : null;
              })}
              {service && line.extraIds.length ? (
                <Line label="Car subtotal" value={formatEGP(carSubtotal(line))} />
              ) : null}
            </div>
          </Fragment>
        );
      })}
      <hr className="border-line-soft" />
      {address ? (
        <div className="flex flex-col gap-1.5">
          <p className="font-bold">Visit</p>
          <Line
            label={`${address.label}${area ? ` · ${area.name}` : ""}`}
            value={area ? formatEGP(area.fee) : undefined}
          />
          <p className="text-xs text-grey">{address.details}</p>
          {draft.dateKey && draft.slotStart !== null && end !== null ? (
            <p className="mt-1 flex items-center gap-1.5 text-sm">
              <Icon name="calendar" size={16} />
              {formatLongDate(fromDateKey(draft.dateKey))} · {formatMinute(draft.slotStart)} –{" "}
              {formatMinute(end)}
            </p>
          ) : null}
        </div>
      ) : null}
      <div className="flex items-center justify-between text-sm text-grey">
        <span className="flex items-center gap-1.5">
          <Icon name="clock" size={18} />
          Estimated service time
        </span>
        <span className="font-semibold text-ink">{duration ? formatDuration(duration) : "—"}</span>
      </div>
      <hr className="border-line-soft" />
      <PromoCodeField
        code={draft.promoCode}
        discount={totals.discount}
        onApply={(code) => dispatch({ type: "set-promo", code })}
        onRemove={() => dispatch({ type: "set-promo", code: null })}
      />
      {signedIn ? (
        <WalletToggle
          balance={walletBalance}
          applied={totals.walletApplied}
          enabled={draft.useWallet}
          onChange={(useWallet) => dispatch({ type: "set-use-wallet", useWallet })}
        />
      ) : null}
      <BookingNotesField
        value={draft.notes}
        onChange={(notes) => dispatch({ type: "set-notes", notes })}
      />
      <hr className="border-line-soft" />
      <div className="flex flex-col gap-1.5">
        <Line label="Packages & extras" value={formatEGP(totals.carsTotal)} muted />
        {address ? <Line label="Visit fee" value={formatEGP(totals.locationFee)} muted /> : null}
        {totals.discount > 0 && totals.promotion ? (
          <div className="flex justify-between gap-3 text-sm font-semibold text-success">
            <span>Promo ({totals.promotion.code})</span>
            <span className="whitespace-nowrap">−{formatEGP(totals.discount)}</span>
          </div>
        ) : null}
        {totals.walletApplied > 0 ? (
          <div className="flex justify-between gap-3 text-sm font-semibold text-success">
            <span>Wallet balance</span>
            <span className="whitespace-nowrap">−{formatEGP(totals.walletApplied)}</span>
          </div>
        ) : null}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold">Total</span>
        <span className="text-xl font-bold">{formatEGP(totals.payable)}</span>
      </div>
      <PaymentBreakdown draft={draft} total={totals.payable} />
      <PointsEarnNote points={pointsEarnedFor(totals.payable)} />
    </div>
  );
}

/** Pay-now / remaining split, shown once a down payment is chosen on the payment step. */
function PaymentBreakdown({ draft, total }: { draft: BookingDraft; total: number }) {
  const split = splitPayment(total, draft.payment);
  if (draft.step < 3 || split.plan !== "deposit") return null;
  return (
    <div className="flex flex-col gap-1.5 rounded-xl bg-surface px-4 py-3">
      <div className="flex justify-between gap-3 text-sm font-bold">
        <span>Pay now ({split.depositPercent}%)</span>
        <span>{formatEGP(split.paidNow)}</span>
      </div>
      <div className="flex justify-between gap-3 text-sm text-grey">
        <span>Remaining on visit day</span>
        <span>{formatEGP(split.remaining)}</span>
      </div>
    </div>
  );
}

/** Sticky sidebar on desktop, collapsible card on mobile. */
export function BookingSummary(props: BookingSummaryProps) {
  const [open, setOpen] = useState(false);
  const walletBalance = useAppState((s) => (s.session ? s.loyalty.wallet : 0));
  const total = draftTotals(props.draft, props.address, walletBalance).payable;

  return (
    <aside aria-label="Booking summary" className="lg:sticky lg:top-6">
      <div className="rounded-[1.25rem] bg-white p-5 shadow-card md:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-display">Booking Summary</h2>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="booking-summary-body"
            onClick={() => setOpen((value) => !value)}
            className="flex items-center gap-2 lg:hidden"
          >
            <span className="font-bold">{formatEGP(total)}</span>
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-surface">
              <Icon
                name="chevron-down"
                size={18}
                className={cn("transition-transform", open && "rotate-180")}
              />
            </span>
            <span className="sr-only">{open ? "Hide" : "Show"} booking details</span>
          </button>
        </div>
        <div id="booking-summary-body" className={cn("mt-5 lg:block", open ? "block" : "hidden")}>
          <SummaryBody {...props} />
        </div>
      </div>
    </aside>
  );
}
