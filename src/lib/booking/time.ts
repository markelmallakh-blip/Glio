/** Minutes since midnight → "09:30 AM". */
export function formatMinute(minute: number) {
  const hours24 = Math.floor(minute / 60) % 24;
  const minutes = minute % 60;
  const suffix = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${String(hours12).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

/** 510 → "8 hrs 30 min". */
export function formatDuration(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const parts: string[] = [];
  if (hours) parts.push(`${hours} ${hours === 1 ? "hr" : "hrs"}`);
  if (minutes) parts.push(`${minutes} min`);
  return parts.join(" ") || "0 min";
}

/** Package range label, e.g. "3–4 hrs" or "60 min". */
export function formatDurationRange(range: { min: number; max: number }) {
  if (range.max < 60) return `${range.max} min`;
  if (range.min === range.max) {
    return range.max === 60 ? "60 min" : formatDuration(range.max);
  }
  return `${range.min / 60}–${range.max / 60} hrs`;
}

/** Local calendar key, e.g. "2026-10-14". */
export function toDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromDateKey(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function combineDateAndMinute(dateKey: string, minute: number) {
  const date = fromDateKey(dateKey);
  date.setHours(Math.floor(minute / 60), minute % 60, 0, 0);
  return date;
}

export function minuteOfDay(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

const dayFormatter = new Intl.DateTimeFormat("en-GB", { weekday: "short" });
const monthFormatter = new Intl.DateTimeFormat("en-GB", { month: "short" });
const longFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatDayParts(date: Date) {
  return {
    weekday: dayFormatter.format(date),
    day: String(date.getDate()),
    month: monthFormatter.format(date),
  };
}

export function formatLongDate(date: Date) {
  return longFormatter.format(date);
}
