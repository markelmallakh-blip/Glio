"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { getService } from "@/content/services";
import { type Booking } from "@/types/booking";
import { formatLongDate, formatMinute, minuteOfDay } from "@/lib/booking/time";
import { appActions, useAppState } from "@/lib/store/app-store";
import { BookingDetailsList } from "@/components/booking/BookingDetailsList";
import { carTitle } from "@/components/booking/state";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Choice";
import { Dialog } from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";
import { cn, formatEGP } from "@/lib/utils";

const CANCEL_WINDOW_MS = 48 * 60 * 60 * 1000;

type Tab = "upcoming" | "previous";

function BookingCard({ booking, now }: { booking: Booking; now: number }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const start = new Date(booking.start);
  const end = new Date(booking.end);
  const canCancel = booking.status === "upcoming" && start.getTime() - now > CANCEL_WINDOW_MS;
  const statusTone =
    booking.status === "cancelled" ? "danger" : booking.status === "completed" ? "soft" : "lime";
  const panelId = `booking-${booking.id}`;

  return (
    <li className="rounded-[1.25rem] border border-line p-4 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={statusTone}>
              {booking.status[0].toUpperCase() + booking.status.slice(1)}
            </Badge>
            {booking.payment.status === "under-review" && booking.status === "upcoming" ? (
              <Badge tone="warning">Payment under review</Badge>
            ) : null}
            <span className="text-sm text-grey">{booking.reference}</span>
          </div>
          <p className="text-xl font-display">
            {booking.cars
              .map((line) => `${carTitle(line.car)} · ${getService(line.serviceSlug)?.name ?? ""}`)
              .join("  +  ")}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-grey">
            <Icon name="calendar" size={16} />
            {formatLongDate(start)} · {formatMinute(minuteOfDay(start))} –{" "}
            {formatMinute(minuteOfDay(end))}
          </p>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <p className="text-lg font-bold">{formatEGP(booking.total)}</p>
          {booking.status === "upcoming" && booking.payment.remaining > 0 ? (
            <p className="text-xs font-semibold text-grey">
              {formatEGP(booking.payment.remaining)} due on visit day
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline"
        >
          {open ? "Hide details" : "View details"}
          <Icon
            name="chevron-down"
            size={16}
            className={cn("transition-transform", open && "rotate-180")}
          />
        </button>
        {booking.status === "upcoming" ? (
          canCancel ? (
            <Button
              size="sm"
              variant="ghost"
              icon={null}
              className="text-danger"
              onClick={() => setConfirming(true)}
            >
              Cancel booking
            </Button>
          ) : (
            <p className="text-xs text-grey">
              Less than 48 hours to go. Contact support for changes.
            </p>
          )
        ) : null}
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-2xl bg-surface p-4 md:p-5">
              <BookingDetailsList booking={booking} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Dialog
        open={confirming}
        onClose={() => setConfirming(false)}
        title="Cancel this booking?"
        description="You're more than 48 hours before the visit, so everything you paid online will be refunded to your card."
      >
        <div className="flex justify-end gap-2">
          <Button variant="outline-dark" icon={null} onClick={() => setConfirming(false)}>
            Keep booking
          </Button>
          <Button
            variant="dark"
            icon={null}
            onClick={() => {
              appActions.cancelBooking(booking.id);
              setConfirming(false);
            }}
          >
            Cancel booking
          </Button>
        </div>
      </Dialog>
    </li>
  );
}

export function BookingsList() {
  const bookings = useAppState((s) => s.bookings);
  const [tab, setTab] = useState<Tab>("upcoming");
  const [now] = useState(() => Date.now());
  const upcoming = bookings
    .filter((booking) => booking.status === "upcoming" && new Date(booking.end).getTime() > now)
    .sort((a, b) => a.start.localeCompare(b.start));
  const previous = bookings.filter((booking) => !upcoming.includes(booking));
  const list = tab === "upcoming" ? upcoming : previous;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-h3 font-display">My Bookings</h1>
        <Button href="/booking" size="sm" variant="dark">
          New booking
        </Button>
      </div>
      <div
        role="tablist"
        aria-label="Bookings"
        className="flex w-fit gap-1 rounded-full bg-surface p-1"
      >
        {(["upcoming", "previous"] as const).map((value) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={tab === value}
            onClick={() => setTab(value)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-bold capitalize transition-colors",
              tab === value ? "bg-ink text-lime" : "text-grey hover:text-ink",
            )}
          >
            {value} ({value === "upcoming" ? upcoming.length : previous.length})
          </button>
        ))}
      </div>
      <div role="tabpanel">
        {list.length === 0 ? (
          <div className="flex flex-col items-start gap-3 rounded-2xl bg-surface p-6">
            <p className="font-semibold">No {tab} bookings.</p>
            {tab === "upcoming" ? (
              <Button href="/booking" size="sm">
                Book GLIO now
              </Button>
            ) : null}
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {list.map((booking) => (
              <BookingCard key={booking.id} booking={booking} now={now} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
