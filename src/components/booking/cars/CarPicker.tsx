"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { type Car } from "@/types/booking";
import { openAuthDialog } from "@/lib/store/auth-dialog";
import { Badge, CheckIndicator } from "@/components/ui/Choice";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { VehicleIcon } from "@/components/vehicles/VehicleIcon";
import { cn } from "@/lib/utils";
import { carTitle, type BookingAction, type CarDraft } from "../state";
import { NewCarPanel } from "./NewCarPanel";

type CarPickerProps = {
  savedCars: Car[];
  selected: CarDraft[];
  signedIn: boolean;
  dispatch: (action: BookingAction) => void;
};

export function CarPicker({ savedCars, selected, signedIn, dispatch }: CarPickerProps) {
  const reduce = useReducedMotion();
  // null = untouched: open by default only while there is nothing to pick from.
  const [formOpen, setFormOpen] = useState<boolean | null>(null);
  const showForm = formOpen ?? (savedCars.length === 0 && selected.length === 0);
  const newCars = selected.filter((item) => item.isNew);
  const badgeFor = (carId: string) => {
    const index = selected.findIndex((item) => item.car.id === carId);
    return index >= 0 ? `Car ${index + 1}` : null;
  };

  return (
    <section aria-labelledby="cars-heading" className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 id="cars-heading" className="text-h4 font-display">
            Which cars are we washing?
          </h2>
          <p className="text-grey">
            Pick as many cars, SUVs or scooters as you like, then choose a package for each one.
          </p>
        </div>
        <p
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-sm font-bold text-white"
          aria-live="polite"
        >
          <Icon name="car" size={18} className="text-lime" />
          {selected.length}
          <span className="sr-only">{selected.length === 1 ? "vehicle" : "vehicles"} selected</span>
        </p>
      </div>

      {!signedIn ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface px-4 py-3">
          <p className="text-sm">
            <span className="font-semibold">Have saved cars?</span> Log in to pick them in one tap.
          </p>
          <Button
            size="sm"
            variant="outline-dark"
            icon={null}
            onClick={() => openAuthDialog({ reason: "Log in to use your saved cars" })}
          >
            Log in
          </Button>
        </div>
      ) : null}

      <ul className="flex flex-wrap gap-2.5" aria-label="Your cars">
        {[...savedCars, ...newCars.map((item) => item.car)].map((car) => {
          const badge = badgeFor(car.id);
          const isSelected = Boolean(badge);
          const isNew = newCars.some((item) => item.car.id === car.id);
          return (
            <li key={car.id}>
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  if (isNew) {
                    const line = selected.find((item) => item.car.id === car.id);
                    if (line) dispatch({ type: "remove-car", key: line.key });
                  } else {
                    dispatch({ type: "toggle-saved-car", car });
                  }
                }}
                className={cn(
                  "flex items-center gap-2 rounded-full border py-2.5 pr-4 pl-3 text-[0.95rem] font-bold transition-colors",
                  isSelected
                    ? "border-2 border-lime-strong bg-lime-tint"
                    : "border-line bg-white hover:border-ink",
                )}
              >
                <CheckIndicator checked={isSelected} />
                {badge ? <Badge>{badge}</Badge> : null}
                <VehicleIcon type={car.type} size={18} className="text-grey" />
                {carTitle(car)}
                {isNew ? <span className="text-xs font-semibold text-grey">(new)</span> : null}
              </button>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            aria-expanded={showForm}
            aria-controls="new-car-panel"
            onClick={() => setFormOpen(!showForm)}
            className="flex items-center gap-2 rounded-full border border-dashed border-ink/40 bg-white py-2.5 pr-4 pl-3 text-[0.95rem] font-semibold transition-colors hover:border-ink"
          >
            <Icon name={showForm ? "minus" : "plus"} size={18} />
            Add a new car
          </button>
        </li>
      </ul>

      <AnimatePresence initial={false}>
        {showForm ? (
          <motion.div
            id="new-car-panel"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <NewCarPanel
              carNumber={selected.length + 1}
              signedIn={signedIn}
              onCancel={() => setFormOpen(false)}
              onAdd={(input, saveToAccount) => {
                dispatch({ type: "add-new-car", input, saveToAccount });
                setFormOpen(false);
              }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
