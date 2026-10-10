"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { getArea, getService } from "@/content/services";
import { type Address, type Booking, type Car, type NewCarInput } from "@/types/booking";
import { splitPayment } from "@/lib/booking/payment";
import { pointsEarnedFor } from "@/content/loyalty";
import { bookingsToBlocks, visitDurationMinutes } from "@/lib/booking/schedule";
import { combineDateAndMinute } from "@/lib/booking/time";
import { appActions, getAppState, useAppState } from "@/lib/store/app-store";
import { openAuthDialog } from "@/lib/store/auth-dialog";
import { createId } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { BookingStepper } from "./BookingStepper";
import { BookingSummary } from "./BookingSummary";
import { CarsStep } from "./cars/CarsStep";
import { DetailsStep } from "./details/DetailsStep";
import { CheckoutStep, type CheckoutResult } from "./payment/CheckoutStep";
import { PaymentPlanStep } from "./payment/PaymentPlanStep";
import {
  bookingReducer,
  createInitialDraft,
  draftTotals,
  toSelections,
  type BookingDraft,
  type BookingStep,
} from "./state";

const NO_CARS: Car[] = [];
const NO_ADDRESSES: Address[] = [];

function toCarInput({ type, brand, model, year, color, plate }: Car): NewCarInput {
  return { type, brand, model, year, color, plate };
}

function resolveAddress(draft: BookingDraft) {
  if (draft.addressId === "new") return draft.newAddress;
  return getAppState().addresses.find((address) => address.id === draft.addressId) ?? null;
}

export function BookingFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prepick = searchParams.get("service");
  const [draft, dispatch] = useReducer(
    bookingReducer,
    prepick && getService(prepick) ? prepick : null,
    createInitialDraft,
  );
  const signedIn = useAppState((s) => Boolean(s.session));
  const savedCars = useAppState((s) => (s.session ? s.cars : NO_CARS));
  const addresses = useAppState((s) => (s.session ? s.addresses : NO_ADDRESSES));
  const bookings = useAppState((s) => s.bookings);
  const walletBalance = useAppState((s) => (s.session ? s.loyalty.wallet : 0));
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch({ type: "sync-saved-cars", cars: savedCars });
  }, [savedCars]);

  const goTo = useCallback(
    (step: BookingStep) => {
      if (step === 2) {
        const { profile, addresses: saved } = getAppState();
        if (profile) {
          dispatch({
            type: "set-contact",
            contact: {
              firstName: draft.contact.firstName || profile.firstName,
              lastName: draft.contact.lastName || profile.lastName,
              email: draft.contact.email || profile.email,
              phone: profile.phone,
            },
          });
        }
        if (!draft.addressId && saved[0])
          dispatch({ type: "select-address", addressId: saved[0].id });
      }
      dispatch({ type: "go-to", step });
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [draft.addressId, draft.contact],
  );

  const ownBlocksForDate = useCallback(
    (dateKey: string) =>
      bookingsToBlocks(
        bookings.filter((booking) => booking.status === "upcoming"),
        dateKey,
      ),
    [bookings],
  );

  function continueFromCars() {
    if (getAppState().session) {
      goTo(2);
      return;
    }
    openAuthDialog({
      reason: "Log in with your phone number to continue your booking",
      onSuccess: () => goTo(2),
    });
  }

  function confirmBooking(result: CheckoutResult) {
    const address = resolveAddress(draft);
    if (!address || !draft.dateKey || draft.slotStart === null) return;
    const selections = toSelections(draft.cars);
    const duration = visitDurationMinutes(selections);
    const fee = getArea(address.areaId)?.fee ?? 0;
    const start = combineDateAndMinute(draft.dateKey, draft.slotStart);
    const end = combineDateAndMinute(draft.dateKey, draft.slotStart + duration);

    const savedAddress =
      draft.addressId === "new" && draft.newAddress
        ? appActions.addAddress(draft.newAddress)
        : { id: draft.addressId ?? createId("addr"), ...address };
    const cars = draft.cars.map((line) => ({
      car: line.isNew && line.saveToAccount ? appActions.addCar(toCarInput(line.car)) : line.car,
      serviceSlug: line.serviceSlug ?? "",
      extraIds: line.extraIds,
    }));

    const { profile } = getAppState();
    if (profile && (!profile.firstName || !profile.email)) {
      appActions.updateProfile({ ...profile, ...draft.contact, phone: profile.phone });
    }

    const totals = draftTotals(draft, address, walletBalance);
    const split = splitPayment(totals.payable, draft.payment);
    const booking: Booking = {
      id: createId("bk"),
      reference: `GL-${Math.floor(10000 + Math.random() * 89999)}`,
      createdAt: new Date().toISOString(),
      status: "upcoming",
      cars,
      address: savedAddress,
      start: start.toISOString(),
      end: end.toISOString(),
      durationMinutes: duration,
      locationFee: fee,
      promoCode: totals.promotion?.code ?? null,
      discount: totals.discount,
      total: totals.total,
      walletUsed: totals.walletApplied,
      pointsEarned: pointsEarnedFor(totals.payable),
      notes: draft.notes.trim(),
      payment: {
        ...split,
        remainingMethod: split.plan === "deposit" ? draft.payment.remainingMethod : null,
        method: result.method,
        status: result.method === "instapay" ? "under-review" : "paid",
        cardLast4: result.method === "card" ? result.cardLast4 : null,
        receipt: result.method === "instapay" ? result.receipt : null,
      },
      contact: draft.contact,
    };
    appActions.saveBooking(booking);
    router.push("/booking/confirmed");
  }

  const address = draft.step > 1 ? resolveAddress(draft) : null;
  const totals = draftTotals(draft, address, walletBalance);
  const total = totals.payable;
  const split = splitPayment(total, draft.payment);

  return (
    <div ref={topRef} className="scroll-mt-0">
      <BookingStepper current={draft.step} onSelect={goTo} />
      <div className="bg-surface py-8 md:py-14">
        <Container className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-[minmax(0,1fr)_25rem] xl:grid-cols-[minmax(0,1fr)_35rem] xl:gap-11">
          <div className="order-2 rounded-[1.25rem] bg-white p-5 shadow-card md:p-6 lg:order-1">
            {draft.step === 1 ? (
              <CarsStep
                draft={draft}
                savedCars={savedCars}
                signedIn={signedIn}
                dispatch={dispatch}
                onContinue={continueFromCars}
              />
            ) : null}
            {draft.step === 2 ? (
              <DetailsStep
                draft={draft}
                addresses={addresses}
                ownBlocksForDate={ownBlocksForDate}
                dispatch={dispatch}
                onBack={() => goTo(1)}
                onContinue={() => goTo(3)}
              />
            ) : null}
            {draft.step === 3 ? (
              <PaymentPlanStep
                total={total}
                payment={draft.payment}
                dispatch={dispatch}
                onBack={() => goTo(2)}
                onContinue={() => goTo(4)}
              />
            ) : null}
            {draft.step === 4 ? (
              <CheckoutStep
                amountDue={split.paidNow}
                walletUsed={totals.walletApplied}
                remaining={split.remaining}
                onBack={() => goTo(3)}
                onConfirm={confirmBooking}
              />
            ) : null}
          </div>
          <div className="order-1 lg:order-2">
            <BookingSummary
              draft={draft}
              address={address}
              dispatch={dispatch}
              onEditCars={draft.step > 1 ? () => goTo(1) : undefined}
            />
          </div>
        </Container>
      </div>
    </div>
  );
}
