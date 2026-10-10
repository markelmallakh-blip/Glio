"use client";

import { useMemo, useState } from "react";
import {
  getDaySlots,
  getVanAvailability,
  schedulingRules,
  visitDurationMinutes,
  type TimeBlock,
} from "@/lib/booking/schedule";
import { addDays, formatDuration, formatMinute, fromDateKey, toDateKey } from "@/lib/booking/time";
import { Icon } from "@/components/ui/Icon";
import { toSelections, type CarDraft } from "../state";
import { DayPicker, type DayOption } from "./DayPicker";
import { SlotGrid } from "./SlotGrid";

type ScheduleSectionProps = {
  cars: CarDraft[];
  dateKey: string | null;
  slotStart: number | null;
  /** Van time already taken by this customer's other bookings, keyed by date. */
  ownBlocksForDate: (dateKey: string) => TimeBlock[];
  onDateChange: (dateKey: string) => void;
  onSlotChange: (start: number) => void;
  error?: string;
};

export function ScheduleSection({
  cars,
  dateKey,
  slotStart,
  ownBlocksForDate,
  onDateChange,
  onSlotChange,
  error,
}: ScheduleSectionProps) {
  const [now] = useState(() => new Date());
  const selections = toSelections(cars);
  const duration = visitDurationMinutes(selections);

  const days: DayOption[] = useMemo(
    () =>
      Array.from({ length: schedulingRules.bookingWindowDays }, (_, offset) => {
        const key = toDateKey(addDays(now, offset));
        const daySlots = getDaySlots(getVanAvailability(key, ownBlocksForDate(key)), duration, now);
        return {
          key,
          date: fromDateKey(key),
          availableCount: daySlots.availableCount,
          fullyBooked: daySlots.fullyBooked,
        };
      }),
    [now, duration, ownBlocksForDate],
  );

  // A remembered day that no longer fits the visit (e.g. a car was added) falls back to the first day that does.
  const chosenDayFits = days.some((day) => day.key === dateKey && day.availableCount > 0);
  const activeKey =
    (chosenDayFits ? dateKey : null) ??
    days.find((day) => day.availableCount > 0)?.key ??
    days[0].key;
  const daySlots = getDaySlots(
    getVanAvailability(activeKey, ownBlocksForDate(activeKey)),
    duration,
    now,
  );
  const exceedsDay = daySlots.exceedsWorkingDay;

  return (
    <section aria-labelledby="schedule-heading" className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="schedule-heading" className="text-h4 font-display">
          Choose Date & Time
        </h2>
        <p className="flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-sm font-bold text-white">
          <Icon name="clock" size={18} className="text-lime" />
          {cars.length} {cars.length === 1 ? "car" : "cars"} · {formatDuration(duration)}
        </p>
      </div>

      {exceedsDay ? (
        <div
          role="alert"
          className="rounded-2xl border border-danger/40 bg-danger-soft px-4 py-4 text-sm"
        >
          <p className="font-bold text-danger">This visit is longer than one working day.</p>
          <p className="mt-1 text-ink">
            {formatDuration(duration)} doesn’t fit between{" "}
            {formatMinute(schedulingRules.openMinute)} and{" "}
            {formatMinute(schedulingRules.closeMinute)}. Choose shorter packages, or split your cars
            into two bookings on different days.
          </p>
        </div>
      ) : (
        <>
          <DayPicker days={days} value={activeKey} onChange={onDateChange} />
          <SlotGrid
            daySlots={daySlots}
            value={dateKey === activeKey ? slotStart : null}
            onChange={(start) => {
              if (dateKey !== activeKey) onDateChange(activeKey);
              onSlotChange(start);
            }}
          />
        </>
      )}
      {error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </section>
  );
}
