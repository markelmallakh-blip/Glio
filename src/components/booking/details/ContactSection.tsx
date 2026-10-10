"use client";

import { type Profile } from "@/types/booking";
import { TextField } from "@/components/ui/Field";

export type ContactErrors = Partial<Record<keyof Profile, string>>;

export function validateContact(contact: Profile): ContactErrors {
  const errors: ContactErrors = {};
  if (!contact.firstName.trim()) errors.firstName = "Please enter your first name.";
  if (!contact.lastName.trim()) errors.lastName = "Please enter your last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim()))
    errors.email = "Enter a valid email for your booking confirmation.";
  return errors;
}

type ContactSectionProps = {
  value: Profile;
  errors: ContactErrors;
  onChange: (value: Profile) => void;
};

export function ContactSection({ value, errors, onChange }: ContactSectionProps) {
  const bind = (name: keyof Profile) => ({
    value: value[name],
    error: errors[name],
    onChange: (event: { target: { value: string } }) =>
      onChange({ ...value, [name]: event.target.value }),
  });

  return (
    <section aria-labelledby="contact-heading" className="flex flex-col gap-4">
      <h2 id="contact-heading" className="text-h4 font-display">
        Personal Info
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField label="First Name" autoComplete="given-name" {...bind("firstName")} />
        <TextField label="Last Name" autoComplete="family-name" {...bind("lastName")} />
      </div>
      <TextField
        label="Phone Number"
        value={value.phone}
        disabled
        readOnly
        hint="Verified with OTP"
        prefix={<span className="text-base font-semibold">🇪🇬 +20</span>}
      />
      <TextField label="Email Address" type="email" autoComplete="email" {...bind("email")} />
    </section>
  );
}
