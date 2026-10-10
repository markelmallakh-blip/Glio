"use client";

import { getService } from "@/content/services";
import { type Car } from "@/types/booking";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { carTitle, isCarsStepComplete, type BookingAction, type BookingDraft } from "../state";
import { CarPanel } from "./CarPanel";
import { CarPicker } from "./CarPicker";

type CarsStepProps = {
  draft: BookingDraft;
  savedCars: Car[];
  signedIn: boolean;
  dispatch: (action: BookingAction) => void;
  onContinue: () => void;
};

export function CarsStep({ draft, savedCars, signedIn, dispatch, onContinue }: CarsStepProps) {
  const prepick = draft.prepickSlug ? getService(draft.prepickSlug) : undefined;
  const complete = isCarsStepComplete(draft);
  const missing = draft.cars.find((line) => !line.serviceSlug);

  return (
    <div className="flex flex-col gap-8">
      {prepick ? (
        <div className="flex items-center gap-3 rounded-2xl border border-lime-strong bg-lime-tint px-4 py-3">
          <Icon name="check-circle" className="text-success" />
          <p className="flex-1 text-sm">
            You picked <span className="font-bold">{prepick.name}</span> from Our Services. It will
            be applied to Car 1, and you can change it for each car below.
          </p>
          <button
            type="button"
            onClick={() => dispatch({ type: "dismiss-prepick" })}
            className="text-sm font-semibold underline underline-offset-4"
          >
            Remove
          </button>
        </div>
      ) : null}

      <CarPicker
        savedCars={savedCars}
        selected={draft.cars}
        signedIn={signedIn}
        dispatch={dispatch}
      />

      {draft.cars.length > 0 ? (
        <ol aria-label="Packages per car" className="flex flex-col gap-4">
          {draft.cars.map((line, index) => (
            <CarPanel
              key={line.key}
              line={line}
              index={index}
              expanded={draft.expandedKey === line.key}
              firstLine={draft.cars[0]}
              dispatch={dispatch}
            />
          ))}
        </ol>
      ) : null}

      {draft.cars.length > 1 ? (
        <div className="flex items-start gap-3 rounded-2xl bg-surface px-4 py-3.5">
          <Icon name="clock" className="mt-0.5" />
          <p className="text-sm">
            <span className="font-bold">{draft.cars.length} cars, 1 visit.</span>{" "}
            <span className="text-grey">
              One van services them back-to-back with a 30 min break between each. We only show
              start times long enough for the whole visit.
            </span>
          </p>
        </div>
      ) : null}

      <div className="flex flex-col items-stretch gap-3 border-t border-line-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-grey" aria-live="polite">
          {draft.cars.length === 0
            ? "Add at least one car to continue."
            : missing
              ? `Choose a package for ${carTitle(missing.car)} to continue.`
              : signedIn
                ? "All set. Next, pick a location and time."
                : "Next, log in with your phone number to pick a location and time."}
        </p>
        <Button size="lg" variant="dark" disabled={!complete} onClick={onContinue}>
          Next to Booking Details
        </Button>
      </div>
    </div>
  );
}
