import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

/** Visual checkbox / radio indicators. Pair with a real input or an aria-pressed button. */
export function CheckIndicator({ checked, className }: { checked: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-[1.375rem] shrink-0 items-center justify-center rounded-md border transition-colors",
        checked ? "border-lime-strong bg-lime text-ink" : "border-line bg-white",
        className,
      )}
    >
      {checked ? <Icon name="check" size={16} strokeWidth={2.4} /> : null}
    </span>
  );
}

export function RadioIndicator({ checked, className }: { checked: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-[1.375rem] shrink-0 items-center justify-center rounded-full border transition-colors",
        checked ? "border-ink bg-lime" : "border-line bg-white",
        className,
      )}
    >
      {checked ? <span className="size-2.5 rounded-full bg-ink" /> : null}
    </span>
  );
}

export function Badge({
  children,
  tone = "lime",
  className,
}: {
  children: React.ReactNode;
  tone?: "lime" | "dark" | "soft" | "danger" | "warning";
  className?: string;
}) {
  const tones = {
    lime: "bg-lime text-ink",
    dark: "bg-ink text-white",
    soft: "bg-surface text-ink",
    danger: "bg-danger-soft text-danger",
    warning: "bg-warning-soft text-warning",
  };
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-bold whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
