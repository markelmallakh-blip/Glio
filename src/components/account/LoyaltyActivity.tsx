import { type LedgerEntry } from "@/types/booking";
import { formatLongDate } from "@/lib/booking/time";
import { cn } from "@/lib/utils";

/** History of points or wallet movements, newest first. */
export function LoyaltyActivity({
  title,
  entries,
  format,
  emptyText,
}: {
  title: string;
  entries: LedgerEntry[];
  /** Formats the absolute amount, e.g. points or EGP. */
  format: (amount: number) => string;
  emptyText: string;
}) {
  return (
    <section aria-labelledby="loyalty-activity" className="flex flex-col gap-3">
      <h2 id="loyalty-activity" className="text-2xl font-display">
        {title}
      </h2>
      {entries.length === 0 ? (
        <p className="rounded-2xl bg-surface p-5 text-sm text-grey">{emptyText}</p>
      ) : (
        <ul className="divide-y divide-line-soft rounded-2xl border border-line">
          {entries.map((entry) => (
            <li key={entry.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-semibold">{entry.label}</span>
                <span className="text-xs text-grey">{formatLongDate(new Date(entry.date))}</span>
              </div>
              <span
                className={cn(
                  "font-bold whitespace-nowrap tabular-nums",
                  entry.delta > 0 ? "text-success" : "text-grey",
                )}
              >
                {entry.delta > 0 ? "+" : "−"}
                {format(Math.abs(entry.delta))}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
