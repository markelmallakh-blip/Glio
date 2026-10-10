"use client";

import { useSyncExternalStore } from "react";
import {
  type Address,
  type Booking,
  type Car,
  type LedgerEntry,
  type Loyalty,
  type NewCarInput,
  type Profile,
} from "@/types/booking";
import { pointsToEGP } from "@/content/loyalty";
import { createId } from "@/lib/utils";
import { createDemoAccount, createDemoLoyalty } from "./demo-account";

/**
 * Client-side persistence for the demo experience. Every mutation goes
 * through this module, so swapping localStorage for real API calls only
 * touches this file.
 */
export type AppState = {
  version: 4;
  session: { phone: string } | null;
  profile: Profile | null;
  cars: Car[];
  addresses: Address[];
  bookings: Booking[];
  loyalty: Loyalty;
  lastBookingId: string | null;
};

const STORAGE_KEY = "glio.app.v4";

const initialState: AppState = {
  version: 4,
  session: null,
  profile: null,
  cars: [],
  addresses: [],
  bookings: [],
  loyalty: { points: 0, wallet: 0, pointsActivity: [], walletActivity: [] },
  lastBookingId: null,
};

let state: AppState = initialState;
let hydrated = false;
const listeners = new Set<() => void>();

function readStorage(): AppState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    if (parsed.version !== 4) return initialState;
    // Accounts saved before loyalty existed get the demo starting points.
    const loyalty = parsed.loyalty ?? (parsed.profile ? createDemoLoyalty() : initialState.loyalty);
    return { ...initialState, ...parsed, loyalty };
  } catch {
    return initialState;
  }
}

function writeStorage(next: AppState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private mode, quota). The session keeps working in memory.
  }
}

function ensureHydrated() {
  if (!hydrated && typeof window !== "undefined") {
    state = readStorage();
    hydrated = true;
  }
}

function setState(updater: (current: AppState) => AppState) {
  ensureHydrated();
  state = updater(state);
  writeStorage(state);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    state = readStorage();
    listeners.forEach((l) => l());
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  ensureHydrated();
  return state;
}

function getServerSnapshot() {
  return initialState;
}

/** Imperative read for event handlers that run after an async step (e.g. login). */
export function getAppState() {
  return getSnapshot();
}

export function useAppState<T>(selector: (current: AppState) => T): T {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return selector(snapshot);
}

function entry(label: string, delta: number): LedgerEntry {
  return { id: createId("led"), date: new Date().toISOString(), label, delta };
}

/** True once the browser snapshot is in use (avoids flashing logged-out UI). */
export { useIsClient as useStoreReady } from "@/hooks/useIsClient";

export const appActions = {
  login(phone: string) {
    setState((current) => {
      if (current.session?.phone === phone) return current;
      const isReturning = current.profile?.phone === phone;
      if (isReturning) return { ...current, session: { phone } };
      return { ...initialState, ...createDemoAccount(phone), session: { phone } };
    });
  },
  logout() {
    setState((current) => ({ ...current, session: null }));
  },
  deleteAccount() {
    setState(() => initialState);
  },
  updateProfile(profile: Profile) {
    setState((current) => ({ ...current, profile }));
  },
  addCar(input: NewCarInput) {
    const car: Car = { id: createId("car"), ...input };
    setState((current) => ({ ...current, cars: [...current.cars, car] }));
    return car;
  },
  updateCar(car: Car) {
    setState((current) => ({
      ...current,
      cars: current.cars.map((item) => (item.id === car.id ? car : item)),
    }));
  },
  removeCar(id: string) {
    setState((current) => ({ ...current, cars: current.cars.filter((car) => car.id !== id) }));
  },
  addAddress(input: Omit<Address, "id">) {
    const address: Address = { id: createId("addr"), ...input };
    setState((current) => ({ ...current, addresses: [...current.addresses, address] }));
    return address;
  },
  updateAddress(address: Address) {
    setState((current) => ({
      ...current,
      addresses: current.addresses.map((item) => (item.id === address.id ? address : item)),
    }));
  },
  removeAddress(id: string) {
    setState((current) => ({
      ...current,
      addresses: current.addresses.filter((address) => address.id !== id),
    }));
  },
  saveBooking(booking: Booking) {
    setState((current) => {
      const { loyalty } = current;
      const walletUsed = Math.min(booking.walletUsed ?? 0, loyalty.wallet);
      const earned = booking.pointsEarned ?? 0;
      const label = `Booking ${booking.reference}`;
      return {
        ...current,
        bookings: [booking, ...current.bookings],
        lastBookingId: booking.id,
        loyalty: {
          points: loyalty.points + earned,
          wallet: loyalty.wallet - walletUsed,
          pointsActivity: earned
            ? [entry(label, earned), ...loyalty.pointsActivity]
            : loyalty.pointsActivity,
          walletActivity: walletUsed
            ? [entry(label, -walletUsed), ...loyalty.walletActivity]
            : loyalty.walletActivity,
        },
      };
    });
  },
  cancelBooking(id: string) {
    setState((current) => {
      const booking = current.bookings.find((item) => item.id === id);
      if (!booking || booking.status === "cancelled") return current;
      // Cancelling returns wallet money and takes back the points it earned.
      const { loyalty } = current;
      const refund = booking.walletUsed ?? 0;
      const clawback = Math.min(booking.pointsEarned ?? 0, loyalty.points);
      const label = `Cancelled ${booking.reference}`;
      return {
        ...current,
        bookings: current.bookings.map((item) =>
          item.id === id ? { ...item, status: "cancelled" } : item,
        ),
        loyalty: {
          points: loyalty.points - clawback,
          wallet: loyalty.wallet + refund,
          pointsActivity: clawback
            ? [entry(label, -clawback), ...loyalty.pointsActivity]
            : loyalty.pointsActivity,
          walletActivity: refund
            ? [entry(label, refund), ...loyalty.walletActivity]
            : loyalty.walletActivity,
        },
      };
    });
  },
  /** Turns points into wallet money. Returns the EGP credited, or 0 if nothing changed. */
  redeemPoints(points: number) {
    const { loyalty } = getSnapshot();
    const amount = pointsToEGP(points);
    if (points <= 0 || points > loyalty.points || amount <= 0) return 0;
    setState((current) => ({
      ...current,
      loyalty: {
        points: current.loyalty.points - points,
        wallet: current.loyalty.wallet + amount,
        pointsActivity: [entry("Redeemed to wallet", -points), ...current.loyalty.pointsActivity],
        walletActivity: [
          entry(`Redeemed ${points} points`, amount),
          ...current.loyalty.walletActivity,
        ],
      },
    }));
    return amount;
  },
};
