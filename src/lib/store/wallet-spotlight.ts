"use client";

import { useSyncExternalStore } from "react";

/** A short "your money landed here" moment after redeeming points. */
export type WalletSpotlight = {
  id: number;
  /** Wallet balance before and after, for the count-up. */
  from: number;
  to: number;
  amount: number;
} | null;

let state: WalletSpotlight = null;
let nextId = 1;
const listeners = new Set<() => void>();

function emit(next: WalletSpotlight) {
  state = next;
  listeners.forEach((listener) => listener());
}

export function showWalletSpotlight(from: number, to: number) {
  emit({ id: nextId++, from, to, amount: to - from });
}

export function endWalletSpotlight() {
  emit(null);
}

export function useWalletSpotlight() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => state,
    () => null,
  );
}
