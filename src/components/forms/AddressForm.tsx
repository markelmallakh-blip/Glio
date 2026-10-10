"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { serviceAreas } from "@/content/services";
import { type Address } from "@/types/booking";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { formatEGP } from "@/lib/utils";

export type AddressInput = Omit<Address, "id">;

type Errors = Partial<Record<keyof AddressInput, string>>;

const emptyAddress: AddressInput = { label: "", areaId: "", details: "" };

export function validateAddress(values: AddressInput): Errors {
  const errors: Errors = {};
  if (!values.label.trim()) errors.label = "Name this location, e.g. Home.";
  if (!values.areaId) errors.areaId = "Choose an area.";
  if (values.details.trim().length < 6) errors.details = "Add the street, building and compound.";
  return errors;
}

type AddressFormProps = {
  initial?: AddressInput;
  onSubmit: (values: AddressInput) => void;
  footer: ReactNode;
  idPrefix: string;
};

export function AddressForm({
  initial = emptyAddress,
  onSubmit,
  footer,
  idPrefix,
}: AddressFormProps) {
  const [values, setValues] = useState<AddressInput>(initial);
  const [errors, setErrors] = useState<Errors>({});

  const update = (name: keyof AddressInput, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateAddress(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSubmit({ label: values.label.trim(), areaId: values.areaId, details: values.details.trim() });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <SelectField
          id={`${idPrefix}-area`}
          label="Choose Area"
          value={values.areaId}
          error={errors.areaId}
          onChange={(event) => update("areaId", event.target.value)}
        >
          <option value="" disabled>
            Select an area
          </option>
          {serviceAreas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name} ({formatEGP(area.fee)} visit fee)
            </option>
          ))}
        </SelectField>
        <TextField
          id={`${idPrefix}-label`}
          label="Location Name"
          placeholder="e.g. Home, Work"
          value={values.label}
          error={errors.label}
          onChange={(event) => update("label", event.target.value)}
        />
      </div>
      <TextAreaField
        id={`${idPrefix}-details`}
        label="Address Details"
        placeholder="Building, street, compound and any parking notes"
        rows={2}
        value={values.details}
        error={errors.details}
        onChange={(event) => update("details", event.target.value)}
      />
      {footer}
    </form>
  );
}
