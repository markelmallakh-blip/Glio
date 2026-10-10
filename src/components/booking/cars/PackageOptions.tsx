"use client";

import { extras, services } from "@/content/services";
import { formatDurationRange } from "@/lib/booking/time";
import { RadioIndicator } from "@/components/ui/Choice";
import { Icon } from "@/components/ui/Icon";
import { cn, formatEGP, formatSignedEGP } from "@/lib/utils";

type PackageListProps = {
  name: string;
  value: string | null;
  onChange: (slug: string) => void;
};

/** Native radio group styled as the Option B package rows. */
export function PackageList({ name, value, onChange }: PackageListProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-3 text-base font-bold">Choose a package</legend>
      {services.map((service) => {
        const checked = value === service.slug;
        return (
          <label
            key={service.slug}
            className={cn(
              "group flex cursor-pointer items-center gap-3 rounded-[0.875rem] border px-3.5 py-3 transition-colors md:gap-4 md:px-4",
              checked
                ? "border-2 border-lime-strong bg-lime-tint"
                : "border-line bg-white hover:border-ink/50",
            )}
          >
            <input
              type="radio"
              name={name}
              value={service.slug}
              checked={checked}
              onChange={() => onChange(service.slug)}
              className="peer sr-only"
            />
            <RadioIndicator
              checked={checked}
              className="peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-2"
            />
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-lg font-display">{service.name}</span>
              <span className="text-[0.8rem] text-grey">{service.summary}</span>
            </span>
            <span className="hidden items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-xs font-semibold whitespace-nowrap sm:flex">
              <Icon name="clock" size={14} />
              {formatDurationRange(service.durationMinutes)}
            </span>
            <span className="flex flex-col items-end gap-0.5 text-right">
              <span className="font-bold whitespace-nowrap">{formatEGP(service.price)}</span>
              <span className="text-xs text-grey sm:hidden">
                {formatDurationRange(service.durationMinutes)}
              </span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}

type ExtrasPickerProps = {
  carLabel: string;
  value: string[];
  onToggle: (id: string) => void;
};

export function ExtrasPicker({ carLabel, value, onToggle }: ExtrasPickerProps) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-base font-bold">
        Extras for {carLabel} <span className="font-normal text-grey">(optional)</span>
      </h4>
      <ul className="flex flex-wrap gap-2">
        {extras.map((extra) => {
          const on = value.includes(extra.id);
          return (
            <li key={extra.id}>
              <button
                type="button"
                aria-pressed={on}
                title={extra.description}
                onClick={() => onToggle(extra.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border py-2 pr-3.5 pl-2.5 text-[0.8rem] font-semibold transition-colors",
                  on
                    ? "border-2 border-lime-strong bg-lime-tint"
                    : "border-line bg-white hover:border-ink/60",
                )}
              >
                <Icon name={on ? "check-circle" : "plus"} size={16} />
                {extra.name}
                <span className="font-normal text-grey">{formatSignedEGP(extra.price)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
