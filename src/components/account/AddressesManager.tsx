"use client";

import { useState } from "react";
import { getArea } from "@/content/services";
import { type Address } from "@/types/booking";
import { appActions, useAppState } from "@/lib/store/app-store";
import { AddressForm } from "@/components/forms/AddressForm";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";
import { formatEGP } from "@/lib/utils";
import { ItemActions } from "./ItemActions";

type Editing = { mode: "add" } | { mode: "edit"; address: Address } | null;

export function AddressesManager() {
  const addresses = useAppState((s) => s.addresses);
  const [editing, setEditing] = useState<Editing>(null);
  const [removing, setRemoving] = useState<Address | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-h3 font-display">My Addresses</h1>
      {addresses.length === 0 ? (
        <p className="rounded-2xl bg-surface p-6 text-grey">No saved addresses yet.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {addresses.map((address) => {
            const area = getArea(address.areaId);
            return (
              <li
                key={address.id}
                className="flex items-end justify-between gap-3 rounded-[1.25rem] border border-line p-4 md:p-5"
              >
                <div className="flex flex-col gap-2">
                  <Icon name="location" size={28} />
                  <p className="text-xl font-display">{address.label}</p>
                  <p className="text-sm text-grey">{address.details}</p>
                  {area ? (
                    <span className="w-fit rounded bg-lime px-1.5 py-0.5 text-xs font-semibold">
                      {area.name} · {formatEGP(area.fee)} visit fee
                    </span>
                  ) : null}
                </div>
                <ItemActions
                  label={address.label}
                  onEdit={() => setEditing({ mode: "edit", address })}
                  onRemove={() => setRemoving(address)}
                />
              </li>
            );
          })}
        </ul>
      )}
      <Button
        variant="dark"
        icon="plus"
        className="w-fit"
        onClick={() => setEditing({ mode: "add" })}
      >
        Add Address
      </Button>

      <Dialog
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={editing?.mode === "edit" ? "Edit Address" : "Add New Address"}
        size="md"
      >
        {editing ? (
          <AddressForm
            idPrefix="account-address"
            initial={editing.mode === "edit" ? editing.address : undefined}
            onSubmit={(values) => {
              if (editing.mode === "edit")
                appActions.updateAddress({ ...values, id: editing.address.id });
              else appActions.addAddress(values);
              setEditing(null);
            }}
            footer={
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline-dark" icon={null} onClick={() => setEditing(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="dark" icon="check">
                  {editing.mode === "edit" ? "Save Changes" : "Add Address"}
                </Button>
              </div>
            }
          />
        ) : null}
        {editing?.mode === "edit" ? (
          <p className="mt-4 text-xs text-grey">
            Changing the area of an address linked to an upcoming booking may change its visit fee.
          </p>
        ) : null}
      </Dialog>

      <Dialog
        open={removing !== null}
        onClose={() => setRemoving(null)}
        title="Remove address?"
        description={
          removing ? `“${removing.label}” will be removed from My Addresses.` : undefined
        }
      >
        <div className="flex justify-end gap-2">
          <Button variant="outline-dark" icon={null} onClick={() => setRemoving(null)}>
            Cancel
          </Button>
          <Button
            variant="dark"
            icon={null}
            className="bg-danger hover:bg-danger/90"
            onClick={() => {
              if (removing) appActions.removeAddress(removing.id);
              setRemoving(null);
            }}
          >
            Remove
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
