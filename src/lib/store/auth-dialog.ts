"use client";

import { useSyncExternalStore } from "react";

type AuthDialogState = {
  open: boolean;
  /** Short reason shown in the dialog, e.g. "to continue your booking". */
  reason?: string;
  onSuccess?: () => void;
};

let state: AuthDialogState = { open: false };
const listeners = new Set<() => void>();

function emit(next: AuthDialogState) {
  state = next;
  listeners.forEach((listener) => listener());
}

export function openAuthDialog(options: Omit<AuthDialogState, "open"> = {}) {
  emit({ open: true, ...options });
}

export function closeAuthDialog() {
  emit({ open: false });
}

export function completeAuthDialog() {
  const callback = state.onSuccess;
  emit({ open: false });
  callback?.();
}

const closed: AuthDialogState = { open: false };

export function useAuthDialog() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => state,
    () => closed,
  );
}
