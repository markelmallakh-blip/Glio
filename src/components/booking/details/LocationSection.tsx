"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { getArea } from "@/content/services";
import { type Address } from "@/types/booking";
import { AddressForm } from "@/components/forms/AddressForm";
import { Button } from "@/components/ui/Button";
import { RadioIndicator } from "@/components/ui/Choice";
import { Icon } from "@/components/ui/Icon";
import { cn, formatEGP } from "@/lib/utils";
import { type AddressDraft, type BookingAction } from "../state";

type LocationSectionProps = {
  addresses: Address[];
  selectedId: string | null;
  newAddress: AddressDraft | null;
  dispatch: (action: BookingAction) => void;
  error?: string;
};

function AddressOption({
  id,
  address,
  checked,
  onSelect,
}: {
  id: string;
  address: AddressDraft;
  checked: boolean;
  onSelect: () => void;
}) {
  const area = getArea(address.areaId);
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start justify-between gap-4 rounded-[1.25rem] border p-4 transition-colors md:p-5",
        checked
          ? "border-2 border-lime-strong bg-lime-tint"
          : "border-line bg-white hover:border-ink/50",
      )}
    >
      <input
        type="radio"
        name="booking-address"
        value={id}
        checked={checked}
        onChange={onSelect}
        className="peer sr-only"
      />
      <span className="flex flex-col gap-1">
        <span className="text-xl font-display">{address.label}</span>
        <span className="text-sm text-grey">{address.details}</span>
        {area ? (
          <span className="mt-1 w-fit rounded bg-lime px-1.5 py-0.5 text-xs font-semibold">
            {area.name} · {formatEGP(area.fee)}
          </span>
        ) : null}
      </span>
      <RadioIndicator
        checked={checked}
        className="mt-1 peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-2"
      />
    </label>
  );
}

export function LocationSection({
  addresses,
  selectedId,
  newAddress,
  dispatch,
  error,
}: LocationSectionProps) {
  const reduce = useReducedMotion();
  const [formOpen, setFormOpen] = useState(addresses.length === 0 && !newAddress);

  return (
    <section aria-labelledby="location-heading" className="flex flex-col gap-4">
      <h2 id="location-heading" className="text-h4 font-display">
        Add Location
      </h2>
      <fieldset className="grid gap-3 sm:grid-cols-2">
        <legend className="sr-only">Service address</legend>
        {addresses.map((address) => (
          <AddressOption
            key={address.id}
            id={address.id}
            address={address}
            checked={selectedId === address.id}
            onSelect={() => dispatch({ type: "select-address", addressId: address.id })}
          />
        ))}
        {newAddress ? (
          <AddressOption
            id="new"
            address={newAddress}
            checked={selectedId === "new"}
            onSelect={() => dispatch({ type: "select-address", addressId: "new" })}
          />
        ) : null}
      </fieldset>

      {!formOpen ? (
        <button
          type="button"
          onClick={() => setFormOpen(true)}
          className="flex w-fit items-center gap-1.5 text-sm font-semibold"
        >
          <span className="inline-flex size-5 items-center justify-center rounded-full bg-surface">
            <Icon name="plus" size={14} />
          </span>
          {newAddress ? "Replace new address" : "Add New Address"}
        </button>
      ) : null}

      <AnimatePresence initial={false}>
        {formOpen ? (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-[1.25rem] border border-line p-4 md:p-5">
              <AddressForm
                idPrefix="booking-address"
                initial={newAddress ?? undefined}
                onSubmit={(address) => {
                  dispatch({ type: "set-new-address", address });
                  setFormOpen(false);
                }}
                footer={
                  <div className="flex justify-end gap-2 pt-1">
                    {addresses.length > 0 || newAddress ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={null}
                        onClick={() => setFormOpen(false)}
                      >
                        Cancel
                      </Button>
                    ) : null}
                    <Button type="submit" variant="dark" size="sm" icon="check">
                      Use this address
                    </Button>
                  </div>
                }
              />
              <p className="mt-3 text-xs text-grey">
                New addresses are saved to My Addresses when you confirm.
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </section>
  );
}
