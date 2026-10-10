"use client";

import { useState } from "react";
import { type Car } from "@/types/booking";
import { appActions, useAppState } from "@/lib/store/app-store";
import { CarForm } from "@/components/forms/CarForm";
import { carTitle } from "@/components/booking/state";
import { CarSpecs } from "@/components/vehicles/CarSpecs";
import { VehicleIcon } from "@/components/vehicles/VehicleIcon";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { ItemActions } from "./ItemActions";

type Editing = { mode: "add" } | { mode: "edit"; car: Car } | null;

export function CarsManager() {
  const cars = useAppState((s) => s.cars);
  const [editing, setEditing] = useState<Editing>(null);
  const [removing, setRemoving] = useState<Car | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-h3 font-display">My Cars</h1>
      {cars.length === 0 ? (
        <p className="rounded-2xl bg-surface p-6 text-grey">
          No saved cars yet. Add one to book faster.
        </p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {cars.map((car) => (
            <li
              key={car.id}
              className="flex items-end justify-between gap-3 rounded-[1.25rem] border border-line p-4 md:p-5"
            >
              <div className="flex flex-col gap-2">
                <VehicleIcon type={car.type} size={30} />
                <p className="text-xl font-display">{carTitle(car)}</p>
                <p className="text-sm text-grey">
                  <CarSpecs car={car} />
                </p>
              </div>
              <ItemActions
                label={carTitle(car)}
                onEdit={() => setEditing({ mode: "edit", car })}
                onRemove={() => setRemoving(car)}
              />
            </li>
          ))}
        </ul>
      )}
      <Button
        variant="dark"
        icon="plus"
        className="w-fit"
        onClick={() => setEditing({ mode: "add" })}
      >
        Add Car
      </Button>

      <Dialog
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={editing?.mode === "edit" ? "Edit Car" : "Add New Car"}
        size="md"
      >
        {editing ? (
          <CarForm
            idPrefix="account-car"
            initial={editing.mode === "edit" ? editing.car : undefined}
            onSubmit={(values) => {
              if (editing.mode === "edit") appActions.updateCar({ ...values, id: editing.car.id });
              else appActions.addCar(values);
              setEditing(null);
            }}
            footer={
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline-dark" icon={null} onClick={() => setEditing(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="dark" icon="check">
                  {editing.mode === "edit" ? "Save Changes" : "Add Car"}
                </Button>
              </div>
            }
          />
        ) : null}
      </Dialog>

      <Dialog
        open={removing !== null}
        onClose={() => setRemoving(null)}
        title="Remove car?"
        description={
          removing
            ? `${carTitle(removing)} will be removed from My Cars. Past bookings keep their details.`
            : undefined
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
              if (removing) appActions.removeCar(removing.id);
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
