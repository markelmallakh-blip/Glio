"use client";

import { TextField } from "@/components/ui/Field";
import {
  formatCardNumber,
  formatExpiry,
  type CardErrors,
  type CardInput,
} from "@/lib/booking/card";

type CardFieldsProps = {
  value: CardInput;
  errors: CardErrors;
  onChange: (name: keyof CardInput, value: string) => void;
};

export function CardFields({ value, errors, onChange }: CardFieldsProps) {
  return (
    <div className="flex flex-col gap-3">
      <TextField
        label="Card Number"
        inputMode="numeric"
        autoComplete="cc-number"
        placeholder="1234 5678 9012 3456"
        value={value.number}
        error={errors.number}
        onChange={(event) => onChange("number", formatCardNumber(event.target.value))}
        trailingIcon="credit-card"
      />
      <TextField
        label="Card Holder Name"
        autoComplete="cc-name"
        value={value.name}
        error={errors.name}
        onChange={(event) => onChange("name", event.target.value)}
      />
      <div className="grid grid-cols-2 gap-3">
        <TextField
          label="Expiry Date"
          inputMode="numeric"
          autoComplete="cc-exp"
          placeholder="MM/YY"
          value={value.expiry}
          error={errors.expiry}
          onChange={(event) => onChange("expiry", formatExpiry(event.target.value))}
        />
        <TextField
          label="CVV"
          inputMode="numeric"
          autoComplete="cc-csc"
          maxLength={4}
          value={value.cvv}
          error={errors.cvv}
          onChange={(event) => onChange("cvv", event.target.value.replace(/\D/g, ""))}
        />
      </div>
    </div>
  );
}
