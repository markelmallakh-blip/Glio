"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { TextAreaField, TextField } from "@/components/ui/Field";

type Values = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
};
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = { firstName: "", lastName: "", phone: "", email: "", message: "" };

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.firstName.trim()) errors.firstName = "Please enter your first name.";
  if (!values.lastName.trim()) errors.lastName = "Please enter your last name.";
  if (!/^01[0125]\d{8}$/.test(values.phone.replace(/\D/g, "")))
    errors.phone = "Enter an 11-digit Egyptian mobile number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  if (values.message.trim().length < 10) errors.message = "Tell us a little more (10+ characters).";
  return errors;
}

/** Client-validated contact form. Wire `onSubmit` to the support inbox API when available. */
export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const field = (name: keyof Values) => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: (event: { target: { value: string } }) =>
      setValues((current) => ({ ...current, [name]: event.target.value })),
  });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSent(true);
    setValues(empty);
  }

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-2xl bg-white/10 p-6">
        <h3 className="text-2xl font-display text-lime">Message sent</h3>
        <p className="text-white/85">
          Thanks for reaching out. Our support team will get back to you within one business day.
        </p>
        <Button variant="outline-light" size="sm" icon={null} onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField label="First Name" autoComplete="given-name" {...field("firstName")} />
        <TextField label="Last Name" autoComplete="family-name" {...field("lastName")} />
      </div>
      <TextField
        label="Phone Number"
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="01xxxxxxxxx"
        prefix={<span className="text-base font-semibold">🇪🇬 +20</span>}
        {...field("phone")}
      />
      <TextField label="Email Address" type="email" autoComplete="email" {...field("email")} />
      <TextAreaField label="Your Message" rows={4} {...field("message")} />
      <Button type="submit" size="lg" fullWidth className="mt-2 justify-between">
        Send Message
      </Button>
    </form>
  );
}
