import { getExtra, getService } from "@/content/services";
import { combineDateAndMinute, minuteOfDay, toDateKey } from "./time";

/**
 * Operating rules confirmed with the client:
 * one van, cars serviced back-to-back, 30 minute break between cars.
 * Working hours are an assumption until the client confirms them.
 */
export const schedulingRules = {
  openMinute: 8 * 60,
  closeMinute: 20 * 60,
  slotStepMinutes: 30,
  carBreakMinutes: 30,
  /** Travel / setup gap kept free around other customers' visits. */
  jobBufferMinutes: 30,
  /** Earliest start must be at least this far from now. */
  leadTimeMinutes: 120,
  bookingWindowDays: 14,
} as const;

export type CarServiceSelection = {
  serviceSlug: string | null;
  extraIds: string[];
};

export type TimeBlock = { start: number; end: number };

/** Longest time one car can take, so the slot is always long enough. */
export function carDurationMinutes(selection: CarServiceSelection) {
  const service = selection.serviceSlug ? getService(selection.serviceSlug) : undefined;
  if (!service) return 0;
  const extrasTime = selection.extraIds.reduce(
    (sum, id) => sum + (getExtra(id)?.durationMinutes ?? 0),
    0,
  );
  return service.durationMinutes.max + extrasTime;
}

export function visitDurationMinutes(selections: CarServiceSelection[]) {
  const timed = selections.filter((selection) => selection.serviceSlug);
  if (timed.length === 0) return 0;
  const work = timed.reduce((sum, selection) => sum + carDurationMinutes(selection), 0);
  return work + schedulingRules.carBreakMinutes * (timed.length - 1);
}

/* ---------- Van availability (deterministic demo data) ---------- */

function hashString(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type DayAvailability = {
  dateKey: string;
  fullyBooked: boolean;
  busy: TimeBlock[];
};

/**
 * Simulates the van's existing jobs for a day. Replace with an API call
 * that returns the same `DayAvailability` shape when the backend is ready.
 */
export function getVanAvailability(
  dateKey: string,
  ownBookings: TimeBlock[] = [],
): DayAvailability {
  const random = seededRandom(hashString(dateKey));
  if (random() < 0.08) return { dateKey, fullyBooked: true, busy: [] };

  // Most days have zero or one other visit, usually early morning or late afternoon.
  const roll = random();
  const jobs = roll < 0.45 ? 0 : roll < 0.85 ? 1 : 2;
  const busy: TimeBlock[] = [...ownBookings];
  const durations = [60, 120, 180, 240];
  for (let i = 0; i < jobs; i += 1) {
    const duration = durations[Math.floor(random() * durations.length)];
    const morning = random() < 0.4;
    const windowStart = morning ? schedulingRules.openMinute : 15 * 60;
    const windowEnd = morning ? 9 * 60 : schedulingRules.closeMinute - duration;
    const steps = Math.max(0, (windowEnd - windowStart) / schedulingRules.slotStepMinutes);
    const start =
      windowStart + Math.floor(random() * (steps + 1)) * schedulingRules.slotStepMinutes;
    busy.push({ start, end: Math.min(start + duration, schedulingRules.closeMinute) });
  }
  return { dateKey, fullyBooked: false, busy: busy.sort((a, b) => a.start - b.start) };
}

/* ---------- Slots ---------- */

export type SlotStatus = "available" | "booked" | "past";

export type Slot = { start: number; end: number; status: SlotStatus };

export type DaySlots = {
  slots: Slot[];
  /** Last start time that still finishes before closing, or null if none. */
  latestStart: number | null;
  /** The visit is longer than the whole working day. */
  exceedsWorkingDay: boolean;
  fullyBooked: boolean;
  availableCount: number;
};

function overlaps(a: TimeBlock, b: TimeBlock) {
  return a.start < b.end && b.start < a.end;
}

export function getDaySlots(
  availability: DayAvailability,
  durationMinutes: number,
  now: Date,
): DaySlots {
  const { openMinute, closeMinute, slotStepMinutes, jobBufferMinutes, leadTimeMinutes } =
    schedulingRules;
  const latest = closeMinute - durationMinutes;
  const exceedsWorkingDay = durationMinutes > 0 && latest < openMinute;

  if (availability.fullyBooked || exceedsWorkingDay || durationMinutes === 0) {
    return {
      slots: [],
      latestStart: exceedsWorkingDay ? null : latest,
      exceedsWorkingDay,
      fullyBooked: availability.fullyBooked,
      availableCount: 0,
    };
  }

  const isToday = availability.dateKey === toDateKey(now);
  const earliestToday = minuteOfDay(now) + leadTimeMinutes;
  const slots: Slot[] = [];

  for (let start = openMinute; start <= latest; start += slotStepMinutes) {
    const block = { start, end: start + durationMinutes };
    let status: SlotStatus = "available";
    if (isToday && start < earliestToday) status = "past";
    else if (
      availability.busy.some((job) =>
        overlaps(block, { start: job.start - jobBufferMinutes, end: job.end + jobBufferMinutes }),
      )
    ) {
      status = "booked";
    }
    slots.push({ ...block, status });
  }

  return {
    slots,
    latestStart: latest,
    exceedsWorkingDay: false,
    fullyBooked: false,
    availableCount: slots.filter((slot) => slot.status === "available").length,
  };
}

/** Converts saved bookings on a given day into busy blocks for the van. */
export function bookingsToBlocks(bookings: { start: string; end: string }[], dateKey: string) {
  return bookings
    .filter((booking) => toDateKey(new Date(booking.start)) === dateKey)
    .map((booking) => ({
      start: minuteOfDay(new Date(booking.start)),
      end: minuteOfDay(new Date(booking.end)),
    }));
}

export function slotToRange(dateKey: string, slot: Slot) {
  return {
    start: combineDateAndMinute(dateKey, slot.start),
    end: combineDateAndMinute(dateKey, slot.end),
  };
}
