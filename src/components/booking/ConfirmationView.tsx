"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Sparkle } from "@/components/brand/Sparkle";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { formatPoints } from "@/content/loyalty";
import { getRemainingMethod } from "@/content/payment";
import { useAppState, useStoreReady } from "@/lib/store/app-store";
import { formatEGP } from "@/lib/utils";
import { BookingDetailsList } from "./BookingDetailsList";
import { BookingSkeleton } from "./BookingSkeleton";

export function ConfirmationView() {
  const ready = useStoreReady();
  const reduce = useReducedMotion();
  const booking = useAppState((s) => s.bookings.find((item) => item.id === s.lastBookingId));

  if (!ready) return <BookingSkeleton />;

  const remainingMethod = booking?.payment.remainingMethod
    ? getRemainingMethod(booking.payment.remainingMethod)
    : undefined;

  const underReview = booking?.payment.status === "under-review";

  if (!booking) {
    return (
      <section className="bg-surface py-20">
        <Container size="prose" className="flex flex-col items-center gap-5 text-center">
          <h1 className="text-h2 font-display">No recent booking found</h1>
          <p className="text-grey">Start a new booking to pick your cars, location and time.</p>
          <Button href="/booking" variant="dark">
            Book Now
          </Button>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink py-14 text-white md:py-20">
        <Sparkle className="absolute -top-10 -right-24 -z-10 w-[26rem] text-lime/10 md:right-0" />
        <Container className="flex flex-col items-center gap-4 text-center">
          <motion.span
            initial={reduce ? false : { scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="flex size-20 items-center justify-center rounded-full bg-lime text-ink"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-10"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              aria-hidden="true"
            >
              <motion.path
                d="m5 12.5 4.5 4.5L19 7.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              />
            </svg>
          </motion.span>
          <Eyebrow tone="dark">Booking {booking.reference}</Eyebrow>
          <h1 className="text-display font-display">
            {underReview ? "Booking Received!" : "Thank You! You’re All Set"}
          </h1>
          {underReview ? (
            <p className="max-w-xl rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/90">
              We got your InstaPay receipt. Our team will check the transfer and confirm your
              booking by SMS and email, usually within a few working hours.
            </p>
          ) : null}
          <p className="max-w-xl text-white/80">
            We sent the details to {booking.contact.email || "your email"}. Our team will call{" "}
            {booking.contact.phone ? `+20 ${booking.contact.phone}` : "you"} before arriving.
          </p>
          {booking.pointsEarned ? (
            <p className="flex items-center gap-2 rounded-full bg-lime px-4 py-1.5 text-sm font-bold text-ink">
              <Icon name="star" size={18} />
              You earned {formatPoints(booking.pointsEarned)} points
            </p>
          ) : null}
          {booking.payment.remaining > 0 && remainingMethod ? (
            <p className="rounded-full bg-white/10 px-4 py-2 text-sm text-lime">
              {formatEGP(booking.payment.remaining)} remaining, to be paid on the visit day via{" "}
              {remainingMethod.label}.
            </p>
          ) : null}
        </Container>
      </section>
      <section className="bg-surface py-10 md:py-16">
        <Container size="prose" className="flex flex-col gap-6">
          <div className="rounded-[1.25rem] bg-white p-5 shadow-card md:p-8">
            <h2 className="mb-6 text-2xl font-display">Booking Summary</h2>
            <BookingDetailsList booking={booking} />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button href="/" variant="outline-dark" icon={null} leadingIcon="arrow-left">
              Back to Home
            </Button>
            <Button href="/account/bookings" variant="dark">
              View My Bookings
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
