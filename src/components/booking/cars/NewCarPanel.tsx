"use client";

import { useState } from "react";
import { type NewCarInput } from "@/types/booking";
import { CarForm } from "@/components/forms/CarForm";
import { Badge, CheckIndicator } from "@/components/ui/Choice";
import { Button } from "@/components/ui/Button";

type NewCarPanelProps = {
  carNumber: number;
  signedIn: boolean;
  onAdd: (input: NewCarInput, saveToAccount: boolean) => void;
  onCancel: () => void;
};

export function NewCarPanel({ carNumber, signedIn, onAdd, onCancel }: NewCarPanelProps) {
  const [save, setSave] = useState(true);
  return (
    <div className="flex flex-col gap-4 rounded-[1.25rem] border-2 border-lime-strong bg-white p-4 md:p-5">
      <div className="flex items-center gap-2">
        <Badge>Car {carNumber}</Badge>
        <h3 className="flex-1 text-[1.375rem] font-display">Add your new car</h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-semibold text-grey underline underline-offset-4 hover:text-ink"
        >
          Cancel
        </button>
      </div>
      <CarForm
        idPrefix="booking-new-car"
        onSubmit={(values) => onAdd(values, save)}
        footer={
          <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={save}
                onChange={(event) => setSave(event.target.checked)}
                className="peer sr-only"
              />
              <CheckIndicator
                checked={save}
                className="peer-focus-visible:ring-2 peer-focus-visible:ring-ink"
              />
              {signedIn
                ? "Save this car to My Cars for faster booking next time"
                : "Save this car to My Cars after I log in"}
            </label>
            <Button type="submit" variant="dark" size="sm" icon="plus" className="w-fit">
              Add car
            </Button>
          </div>
        }
      />
    </div>
  );
}
