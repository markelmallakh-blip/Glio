"use client";

import { schedulingRules, type DaySlots } from "@/lib/booking/schedule";
import { formatMinute } from "@/lib/booking/time";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const statusLabel = { available: "", booked: "Booked", past: "Too soon" } as const;

type SlotGridProps = {
  daySlots: DaySlots;
  value: number | null;
  onChange: (start: number) => void;
};

export function SlotGrid({ daySlots, value, onChange }: SlotGridProps) {
  if (daySlots.fullyBooked || daySlots.availableCount === 0) {
    return (
      <p className="rounded-2xl bg-surface px-4 py-4 text-sm">
        No start times left on this day for a visit this long. Please pick another day.
      </p>
    );
  }

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-base font-bold">Start time</legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {daySlots.slots.map((slot) => {
          const selected = slot.start === value;
          const unavailable = slot.status !== "available";
          return (
            <label
              key={slot.start}
              className={cn(
                "relative flex flex-col gap-0.5 rounded-[0.875rem] border px-3.5 py-3 transition-colors",
                selected && "border-2 border-lime-strong bg-lime-tint",
                !selected && !unavailable && "cursor-pointer border-line bg-white hover:border-ink",
                unavailable && "cursor-not-allowed border-surface bg-surface text-grey-light",
              )}
            >
              <input
                type="radio"
                name="booking-slot"
                value={slot.start}
                checked={selected}
                disabled={unavailable}
                onChange={() => onChange(slot.start)}
                className="peer sr-only"
              />
              <span className={cn("text-base font-bold", unavailable && "line-through")}>
                {formatMinute(slot.start)}
              </span>
              <span className={cn("text-xs", unavailable ? "text-grey-light" : "text-grey")}>
                {unavailable ? statusLabel[slot.status] : `Until ${formatMinute(slot.end)}`}
              </span>
              <span className="pointer-events-none absolute inset-0 rounded-[0.875rem] peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-2" />
            </label>
          );
        })}
      </div>
      {daySlots.latestStart !== null ? (
        <p className="flex items-center gap-2 text-sm text-grey">
          <Icon name="info" size={16} />
          Later starts aren’t shown because the visit must finish by{" "}
          {formatMinute(schedulingRules.closeMinute)}. Need later? Pick another day or remove a car.
        </p>
      ) : null}
    </fieldset>
  );
}
