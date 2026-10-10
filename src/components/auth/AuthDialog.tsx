"use client";

import { useState, type FormEvent } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { appActions } from "@/lib/store/app-store";
import { closeAuthDialog, completeAuthDialog, useAuthDialog } from "@/lib/store/auth-dialog";
import { OtpInput } from "./OtpInput";

export const EGYPT_MOBILE = /^01[0125]\d{8}$/;

type Step = "phone" | "otp";

/**
 * Phone + OTP sign-in. In this demo build any 4-digit code is accepted and the
 * account lives in the browser. Replace `verify` with the real OTP API.
 */
export function AuthDialog() {
  const { open, reason } = useAuthDialog();
  return (
    <Dialog
      open={open}
      onClose={closeAuthDialog}
      title="Login Your Account"
      description={reason ?? "Enter your mobile number to get started"}
    >
      {/* Remounting on every open resets the form state. */}
      {open ? <AuthForm /> : null}
    </Dialog>
  );
}

function AuthForm() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | undefined>();

  function submitPhone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (!EGYPT_MOBILE.test(digits)) {
      setError("Enter an 11-digit Egyptian mobile number, e.g. 01001234567.");
      return;
    }
    setPhone(digits);
    setError(undefined);
    setStep("otp");
  }

  function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\d{4}$/.test(code)) {
      setError("Enter the 4-digit code.");
      return;
    }
    appActions.login(phone);
    completeAuthDialog();
  }

  if (step === "otp") {
    return (
      <form onSubmit={verify} noValidate className="flex flex-col gap-5">
        <p className="text-sm text-grey">
          We sent a 4-digit code to <span className="font-semibold text-ink">+20 {phone}</span>.{" "}
          <button
            type="button"
            className="font-semibold text-ink underline underline-offset-2"
            onClick={() => {
              setStep("phone");
              setCode("");
              setError(undefined);
            }}
          >
            Change number
          </button>
        </p>
        <OtpInput value={code} onChange={setCode} error={error} />
        <p className="rounded-lg bg-surface px-3 py-2 text-xs text-grey">
          Demo mode: any 4-digit code works.
        </p>
        <Button type="submit" variant="dark" fullWidth icon={null}>
          Verify & Continue
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={submitPhone} noValidate className="flex flex-col gap-5">
      <TextField
        label="Phone Number"
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="01xxxxxxxxx"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        error={error}
        data-autofocus
        prefix={<span className="text-base font-semibold text-ink">🇪🇬 +20</span>}
      />
      <p className="text-center text-sm text-grey">
        New to GLIO? Your account is created automatically after verification.
      </p>
      <Button type="submit" variant="dark" fullWidth icon={null}>
        Continue
      </Button>
    </form>
  );
}
