import { cn } from "@/lib/utils";

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Accessible name when there is no visible label pointing at the switch. */
  label?: string;
  labelledBy?: string;
  describedBy?: string;
  disabled?: boolean;
  className?: string;
};

/** On/off toggle. Renders a real button with role="switch" so it works with keyboard and screen readers. */
export function Switch({
  checked,
  onChange,
  label,
  labelledBy,
  describedBy,
  disabled,
  className,
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200",
        "focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40",
        checked ? "bg-ink" : "bg-line",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-6 rounded-full shadow-card transition-transform duration-200 ease-(--ease-brand)",
          checked ? "translate-x-5 bg-lime" : "translate-x-0 bg-white",
        )}
      />
    </button>
  );
}
