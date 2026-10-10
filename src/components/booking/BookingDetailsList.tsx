import { Fragment } from "react";
import { getRemainingMethod } from "@/content/payment";
import { getArea, getExtra, getService } from "@/content/services";
import { type Booking } from "@/types/booking";
import { carSubtotal } from "@/lib/booking/pricing";
import { formatDuration, formatLongDate, formatMinute, minuteOfDay } from "@/lib/booking/time";
import { Badge } from "@/components/ui/Choice";
import { Icon } from "@/components/ui/Icon";
import { formatEGP } from "@/lib/utils";
import { CarSpecs } from "@/components/vehicles/CarSpecs";
import { carTitle } from "./state";

/** Read-only breakdown of a confirmed booking (confirmation page + My Bookings). */
export function BookingDetailsList({ booking }: { booking: Booking }) {
  const start = new Date(booking.start);
  const end = new Date(booking.end);
  const area = getArea(booking.address.areaId);
  const remainingMethod = booking.payment.remainingMethod
    ? getRemainingMethod(booking.payment.remainingMethod)
    : undefined;

  return (
    <dl className="flex flex-col gap-5 text-sm">
      {booking.cars.map((line, index) => {
        const service = getService(line.serviceSlug);
        return (
          <Fragment key={`${line.car.id}-${index}`}>
            <div className="flex flex-col gap-1.5 border-b border-line-soft pb-5">
              <dt className="flex items-center gap-2">
                <Badge>Car {index + 1}</Badge>
                <span className="font-bold">{carTitle(line.car)}</span>
              </dt>
              <dd className="text-xs text-grey">
                <CarSpecs car={line.car} />
              </dd>
              <dd className="flex justify-between gap-3">
                <span>
                  {service?.name ?? "Package"}
                  {line.extraIds.length
                    ? ` + ${line.extraIds
                        .map((id) => getExtra(id)?.name)
                        .filter(Boolean)
                        .join(", ")}`
                    : ""}
                </span>
                <span className="font-semibold whitespace-nowrap">
                  {formatEGP(
                    carSubtotal({ serviceSlug: line.serviceSlug, extraIds: line.extraIds }),
                  )}
                </span>
              </dd>
            </div>
          </Fragment>
        );
      })}
      <div className="flex flex-col gap-1.5 border-b border-line-soft pb-5">
        <dt className="font-bold">Date & Time</dt>
        <dd className="flex items-center gap-1.5">
          <Icon name="calendar" size={16} />
          {formatLongDate(start)} · {formatMinute(minuteOfDay(start))} –{" "}
          {formatMinute(minuteOfDay(end))}
        </dd>
        <dd className="text-xs text-grey">
          {formatDuration(booking.durationMinutes)}
          {booking.cars.length > 1 ? " · cars serviced back-to-back with a 30 min break" : ""}
        </dd>
      </div>
      <div className="flex flex-col gap-1.5 border-b border-line-soft pb-5">
        <dt className="font-bold">Location</dt>
        <dd className="flex justify-between gap-3">
          <span>
            {booking.address.label}
            {area ? ` · ${area.name}` : ""}
          </span>
          <span className="whitespace-nowrap">{formatEGP(booking.locationFee)}</span>
        </dd>
        <dd className="text-xs text-grey">{booking.address.details}</dd>
      </div>
      {booking.notes ? (
        <div className="flex flex-col gap-1.5 border-b border-line-soft pb-5">
          <dt className="font-bold">Notes for the team</dt>
          <dd className="whitespace-pre-line text-grey">{booking.notes}</dd>
        </div>
      ) : null}
      {booking.discount > 0 ? (
        <div className="flex justify-between gap-3 font-semibold text-success">
          <dt>Promo{booking.promoCode ? ` (${booking.promoCode})` : ""}</dt>
          <dd>−{formatEGP(booking.discount)}</dd>
        </div>
      ) : null}
      {booking.walletUsed ? (
        <div className="flex justify-between gap-3 font-semibold text-success">
          <dt>Wallet balance</dt>
          <dd>−{formatEGP(booking.walletUsed)}</dd>
        </div>
      ) : null}
      <div className="flex items-center justify-between gap-3">
        <dt className="text-lg font-semibold">Total</dt>
        <dd className="text-lg font-bold">
          {formatEGP(booking.total - (booking.walletUsed ?? 0))}
        </dd>
      </div>
      <div className="flex flex-col gap-1.5 rounded-xl bg-white/70 p-3 ring-1 ring-line-soft">
        <div className="flex justify-between gap-3">
          <dt>
            {booking.payment.status === "under-review" ? "Transferred now" : "Paid now"}
            {booking.payment.plan === "deposit"
              ? ` (${booking.payment.depositPercent}% down payment)`
              : ""}
          </dt>
          <dd className="font-semibold">{formatEGP(booking.payment.paidNow)}</dd>
        </div>
        <dd className="text-xs text-grey">
          {booking.payment.method === "card"
            ? `Card ending in ${booking.payment.cardLast4}`
            : booking.payment.method === "wallet"
              ? "Covered by your GLIO wallet"
              : `InstaPay transfer · receipt ${booking.payment.receipt?.name ?? "uploaded"}`}
        </dd>
        {booking.payment.status === "under-review" ? (
          <dd className="w-fit rounded-full bg-warning-soft px-2.5 py-0.5 text-xs font-bold text-warning">
            Payment under review
          </dd>
        ) : null}
        {booking.payment.remaining > 0 ? (
          <div className="flex justify-between gap-3 border-t border-line-soft pt-1.5 font-semibold">
            <dt>
              Remaining on visit day
              {remainingMethod ? (
                <span className="block text-xs font-normal text-grey">
                  via {remainingMethod.label}
                </span>
              ) : null}
            </dt>
            <dd>{formatEGP(booking.payment.remaining)}</dd>
          </div>
        ) : null}
      </div>
    </dl>
  );
}
