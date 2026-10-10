"use client";

import { useState } from "react";
import { type Address } from "@/types/booking";
import { type TimeBlock } from "@/lib/booking/schedule";
import { Button } from "@/components/ui/Button";
import { type BookingAction, type BookingDraft } from "../state";
import { ContactSection, validateContact, type ContactErrors } from "./ContactSection";
import { LocationSection } from "./LocationSection";
import { ScheduleSection } from "./ScheduleSection";

type DetailsStepProps = {
  draft: BookingDraft;
  addresses: Address[];
  ownBlocksForDate: (dateKey: string) => TimeBlock[];
  dispatch: (action: BookingAction) => void;
  onBack: () => void;
  onContinue: () => void;
};

type StepErrors = { contact: ContactErrors; address?: string; slot?: string };

export function DetailsStep({
  draft,
  addresses,
  ownBlocksForDate,
  dispatch,
  onBack,
  onContinue,
}: DetailsStepProps) {
  const [errors, setErrors] = useState<StepErrors>({ contact: {} });

  function handleContinue() {
    const next: StepErrors = {
      contact: validateContact(draft.contact),
      address: draft.addressId ? undefined : "Choose where we should meet your cars.",
      slot: draft.slotStart !== null && draft.dateKey ? undefined : "Pick a day and a start time.",
    };
    setErrors(next);
    const hasErrors = Object.keys(next.contact).length > 0 || next.address || next.slot;
    if (hasErrors) {
      document.querySelector<HTMLElement>("[aria-invalid='true'], [role='alert']")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }
    onContinue();
  }

  return (
    <div className="flex flex-col gap-10">
      <ContactSection
        value={draft.contact}
        errors={errors.contact}
        onChange={(contact) => {
          dispatch({ type: "set-contact", contact });
          // Re-validate only fields that already show an error, so messages clear as you fix them.
          const fresh = validateContact(contact);
          setErrors((current) => ({
            ...current,
            contact: Object.fromEntries(
              Object.keys(current.contact).flatMap((key) => {
                const message = fresh[key as keyof ContactErrors];
                return message ? [[key, message]] : [];
              }),
            ),
          }));
        }}
      />
      <LocationSection
        addresses={addresses}
        selectedId={draft.addressId}
        newAddress={draft.newAddress}
        dispatch={dispatch}
        error={draft.addressId ? undefined : errors.address}
      />
      <ScheduleSection
        cars={draft.cars}
        dateKey={draft.dateKey}
        slotStart={draft.slotStart}
        ownBlocksForDate={ownBlocksForDate}
        onDateChange={(dateKey) => dispatch({ type: "set-date", dateKey })}
        onSlotChange={(start) => dispatch({ type: "set-slot", start })}
        error={draft.slotStart !== null ? undefined : errors.slot}
      />
      <div className="flex items-center justify-between gap-3 border-t border-line-soft pt-6">
        <Button variant="outline-dark" icon={null} leadingIcon="arrow-left" onClick={onBack}>
          Back
        </Button>
        <Button size="lg" variant="dark" onClick={handleContinue}>
          Next to Payment
        </Button>
      </div>
    </div>
  );
}
