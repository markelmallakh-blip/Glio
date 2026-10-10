"use client";

import { useId } from "react";
import { type EgyptianPlate } from "@/types/booking";
import { normalizePlateLetters, normalizePlateNumbers } from "@/lib/vehicles/plate";
import { cn } from "@/lib/utils";

type EgyptianPlateFieldProps = {
  value: EgyptianPlate | null;
  onChange: (value: EgyptianPlate) => void;
  error?: string;
  className?: string;
};

/** Plate input styled like an Egyptian licence plate: numbers left, Arabic letters right. */
export function EgyptianPlateField({ value, onChange, error, className }: EgyptianPlateFieldProps) {
  const id = useId();
  const plate = value ?? { numbers: "", letters: "" };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <fieldset
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "overflow-hidden rounded-[0.625rem] border bg-white transition-colors focus-within:ring-2 focus-within:ring-lime/70",
          error ? "border-danger" : "border-line-soft focus-within:border-ink",
        )}
      >
        <legend className="sr-only">Plate number (optional)</legend>
        <div
          aria-hidden="true"
          className="flex items-center justify-between bg-plate px-3.5 py-1.5 text-white"
        >
          <span className="text-sm font-semibold">Plate Number</span>
          <span className="text-xs">Optional</span>
        </div>
        <div className="grid grid-cols-2 divide-x divide-ink">
          <label className="sr-only" htmlFor={`${id}-numbers`}>
            Plate numbers
          </label>
          <input
            id={`${id}-numbers`}
            inputMode="numeric"
            autoComplete="off"
            placeholder="239"
            value={plate.numbers}
            aria-invalid={error ? true : undefined}
            onChange={(event) =>
              onChange({ ...plate, numbers: normalizePlateNumbers(event.target.value) })
            }
            className="h-[2.625rem] min-w-0 bg-transparent text-center text-base font-semibold text-ink placeholder:font-normal placeholder:text-grey-light focus:outline-none"
          />
          <label className="sr-only" htmlFor={`${id}-letters`}>
            Plate letters in Arabic
          </label>
          <input
            id={`${id}-letters`}
            dir="rtl"
            lang="ar"
            autoComplete="off"
            placeholder="ك ا ي"
            value={plate.letters}
            aria-invalid={error ? true : undefined}
            onChange={(event) =>
              onChange({ ...plate, letters: normalizePlateLetters(event.target.value) })
            }
            className="h-[2.625rem] min-w-0 bg-transparent text-center text-base font-semibold text-ink placeholder:font-normal placeholder:text-grey-light focus:outline-none"
          />
        </div>
      </fieldset>
      {error ? (
        <p id={`${id}-error`} className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
