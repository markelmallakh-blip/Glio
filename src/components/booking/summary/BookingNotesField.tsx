"use client";

import { useId } from "react";

const MAX_NOTES = 300;

type BookingNotesFieldProps = { value: string; onChange: (value: string) => void };

export function BookingNotesField({ value, onChange }: BookingNotesFieldProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={`${id}-notes`} className="text-sm font-bold">
        Booking notes <span className="font-normal text-grey">(optional)</span>
      </label>
      <textarea
        id={`${id}-notes`}
        rows={3}
        maxLength={MAX_NOTES}
        value={value}
        placeholder="Parking floor, gate code, where to find the keys…"
        aria-describedby={`${id}-count`}
        onChange={(event) => onChange(event.target.value)}
        className="resize-none rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm placeholder:text-grey-light focus:border-ink focus:ring-2 focus:ring-lime/70 focus:outline-none"
      />
      <p id={`${id}-count`} className="self-end text-xs text-grey" aria-live="polite">
        {value.length}/{MAX_NOTES}
      </p>
    </div>
  );
}
