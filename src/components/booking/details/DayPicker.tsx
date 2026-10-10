"use client";

import { useEffect, useRef } from "react";
import { formatDayParts } from "@/lib/booking/time";
import { cn } from "@/lib/utils";

export type DayOption = { key: string; date: Date; availableCount: number; fullyBooked: boolean };

type DayPickerProps = {
  days: DayOption[];
  value: string;
  onChange: (key: string) => void;
};

export function DayPicker({ days, value, onChange }: DayPickerProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  // Keep the selected day visible in the horizontally scrolling row.
  useEffect(() => {
    const row = rowRef.current;
    const selected = row?.querySelector<HTMLElement>(`[data-day="${value}"]`);
    if (row && selected) {
      row.scrollTo({ left: selected.offsetLeft - row.offsetLeft - 8, behavior: "smooth" });
    }
  }, [value]);

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-base font-bold">Pick a day</legend>
      <div
        ref={rowRef}
        className="-mx-1 flex snap-x [scrollbar-width:thin] gap-2 overflow-x-auto px-1 pb-2"
      >
        {days.map((day) => {
          const parts = formatDayParts(day.date);
          const selected = day.key === value;
          const full = day.availableCount === 0;
          return (
            <label
              key={day.key}
              data-day={day.key}
              title={
                full
                  ? day.fullyBooked
                    ? "Fully booked"
                    : "No start time long enough for this visit"
                  : undefined
              }
              className={cn(
                "relative flex w-[4.5rem] shrink-0 snap-start flex-col items-center rounded-2xl border py-2.5 transition-colors",
                selected ? "border-ink bg-ink text-white" : "border-line bg-white",
                full ? "cursor-not-allowed opacity-45" : "cursor-pointer hover:border-ink",
              )}
            >
              <input
                type="radio"
                name="booking-day"
                value={day.key}
                checked={selected}
                disabled={full}
                onChange={() => onChange(day.key)}
                className="peer sr-only"
              />
              <span className={cn("text-xs", selected ? "text-lime" : "text-grey")}>
                {parts.weekday}
              </span>
              <span className="text-2xl leading-tight font-display">{parts.day}</span>
              <span className={cn("text-[0.7rem]", selected ? "text-white/80" : "text-grey")}>
                {full ? (day.fullyBooked ? "Full" : "No slot") : parts.month}
              </span>
              <span className="pointer-events-none absolute inset-0 rounded-2xl peer-focus-visible:ring-2 peer-focus-visible:ring-lime-strong peer-focus-visible:ring-offset-2" />
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
