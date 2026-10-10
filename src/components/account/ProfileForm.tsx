"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { type Profile } from "@/types/booking";
import { validateContact, type ContactErrors } from "@/components/booking/details/ContactSection";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { TextField } from "@/components/ui/Field";
import { appActions } from "@/lib/store/app-store";

export function ProfileForm({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [values, setValues] = useState(profile);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [saved, setSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const bind = (name: keyof Profile) => ({
    value: values[name],
    error: errors[name],
    onChange: (event: { target: { value: string } }) => {
      setValues((current) => ({ ...current, [name]: event.target.value }));
      setSaved(false);
    },
  });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    appActions.updateProfile({ ...values, phone: profile.phone });
    setSaved(true);
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-h3 font-display">My Profile</h1>
      <form onSubmit={onSubmit} noValidate className="flex max-w-2xl flex-col gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <TextField label="First Name" autoComplete="given-name" {...bind("firstName")} />
          <TextField label="Last Name" autoComplete="family-name" {...bind("lastName")} />
        </div>
        <TextField
          label="Phone Number"
          value={profile.phone}
          disabled
          readOnly
          hint="Your phone number is your login. Contact support to change it."
          prefix={<span className="text-base font-semibold">🇪🇬 +20</span>}
        />
        <TextField label="Email Address" type="email" autoComplete="email" {...bind("email")} />
        <div className="flex flex-wrap items-center gap-4 pt-3">
          <Button type="submit" variant="dark" icon="check">
            Save Changes
          </Button>
          <p role="status" className="text-sm text-success">
            {saved ? "Profile saved." : null}
          </p>
        </div>
      </form>

      <div className="flex max-w-2xl flex-col items-start gap-2 border-t border-line-soft pt-6">
        <h2 className="font-bold">Delete account</h2>
        <p className="text-sm text-grey">
          Permanently removes your profile, saved cars, addresses and booking history from this
          device.
        </p>
        <Button
          variant="ghost"
          size="sm"
          icon={null}
          leadingIcon="trash"
          className="text-danger"
          onClick={() => setConfirmDelete(true)}
        >
          Delete my account
        </Button>
      </div>

      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Delete your account?"
        description="This can’t be undone. Upcoming bookings will need to be cancelled with customer service."
      >
        <div className="flex justify-end gap-2">
          <Button variant="outline-dark" icon={null} onClick={() => setConfirmDelete(false)}>
            Keep account
          </Button>
          <Button
            variant="dark"
            icon={null}
            className="bg-danger hover:bg-danger/90"
            onClick={() => {
              appActions.deleteAccount();
              router.push("/");
            }}
          >
            Delete account
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
