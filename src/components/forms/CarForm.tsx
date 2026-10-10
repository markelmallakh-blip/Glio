"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { type EgyptianPlate, type NewCarInput, type VehicleType } from "@/types/booking";
import { vehicleTypes } from "@/content/vehicles";
import { isPlateEmpty, validatePlate } from "@/lib/vehicles/plate";
import { EgyptianPlateField } from "@/components/vehicles/EgyptianPlateField";
import { SelectField, TextField } from "@/components/ui/Field";

type TextKey = "brand" | "model" | "year" | "color";
type Errors = Partial<Record<TextKey | "plate", string>>;

const emptyCar: NewCarInput = {
  type: "sedan",
  brand: "",
  model: "",
  year: "",
  color: "",
  plate: null,
};
const latestModelYear = 2027;

export function validateCar(values: NewCarInput): Errors {
  const errors: Errors = {};
  if (!values.brand.trim()) errors.brand = "Enter the brand.";
  if (!values.model.trim()) errors.model = "Enter the model.";
  const year = Number(values.year);
  if (!/^\d{4}$/.test(values.year) || year < 1970 || year > latestModelYear)
    errors.year = "Enter a valid year.";
  if (!values.color.trim()) errors.color = "Enter the color.";
  const plateError = validatePlate(values.plate);
  if (plateError) errors.plate = plateError;
  return errors;
}

type CarFormProps = {
  initial?: NewCarInput;
  onSubmit: (values: NewCarInput) => void;
  /** Rendered under the fields: extra options and the submit button. */
  footer: ReactNode;
  idPrefix: string;
};

export function CarForm({ initial = emptyCar, onSubmit, footer, idPrefix }: CarFormProps) {
  const [values, setValues] = useState<NewCarInput>(initial);
  const [errors, setErrors] = useState<Errors>({});

  const clearError = (key: keyof Errors) => {
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const bind = (name: TextKey) => ({
    id: `${idPrefix}-${name}`,
    value: values[name],
    error: errors[name],
    onChange: (event: { target: { value: string } }) => {
      setValues((current) => ({ ...current, [name]: event.target.value }));
      clearError(name);
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateCar(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSubmit({
      type: values.type,
      brand: values.brand.trim(),
      model: values.model.trim(),
      year: values.year.trim(),
      color: values.color.trim(),
      plate: isPlateEmpty(values.plate) ? null : values.plate,
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-3">
        <SelectField
          id={`${idPrefix}-type`}
          label="Vehicle Type"
          value={values.type}
          data-autofocus
          onChange={(event) =>
            setValues((current) => ({ ...current, type: event.target.value as VehicleType }))
          }
        >
          {vehicleTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </SelectField>
        <TextField label="Brand" placeholder="e.g. Toyota" {...bind("brand")} />
        <TextField label="Model" placeholder="e.g. Corolla" {...bind("model")} />
      </div>
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1.1fr]">
        <TextField
          label="Year"
          inputMode="numeric"
          maxLength={4}
          placeholder="e.g. 2022"
          {...bind("year")}
        />
        <TextField label="Color" placeholder="e.g. White" {...bind("color")} />
        <EgyptianPlateField
          value={values.plate}
          error={errors.plate}
          onChange={(plate: EgyptianPlate) => {
            setValues((current) => ({ ...current, plate }));
            clearError("plate");
          }}
        />
      </div>
      {footer}
    </form>
  );
}
