import {
  type Address,
  type Car,
  type DepositPercent,
  type NewCarInput,
  type Profile,
  type RemainingMethod,
} from "@/types/booking";
import { getArea } from "@/content/services";
import { bookingTotals } from "@/lib/booking/pricing";
import { type CarServiceSelection } from "@/lib/booking/schedule";
import { createId } from "@/lib/utils";

export type BookingStep = 1 | 2 | 3 | 4;

export type CarDraft = {
  key: string;
  car: Car;
  /** Added during this booking (not yet in My Cars). */
  isNew: boolean;
  saveToAccount: boolean;
  serviceSlug: string | null;
  extraIds: string[];
};

export type AddressDraft = Omit<Address, "id">;

export type BookingDraft = {
  step: BookingStep;
  cars: CarDraft[];
  expandedKey: string | null;
  prepickSlug: string | null;
  contact: Profile;
  addressId: string | null;
  newAddress: AddressDraft | null;
  saveNewAddress: boolean;
  dateKey: string | null;
  slotStart: number | null;
  promoCode: string | null;
  /** Apply the GLIO wallet balance to this booking. */
  useWallet: boolean;
  notes: string;
  payment: {
    plan: "full" | "deposit";
    depositPercent: DepositPercent;
    remainingMethod: RemainingMethod | null;
  };
};

export type BookingAction =
  | { type: "toggle-saved-car"; car: Car }
  | { type: "add-new-car"; input: NewCarInput; saveToAccount: boolean }
  | { type: "remove-car"; key: string }
  | { type: "set-service"; key: string; serviceSlug: string }
  | { type: "toggle-extra"; key: string; extraId: string }
  | { type: "copy-first-car"; key: string }
  | { type: "expand"; key: string | null }
  | { type: "dismiss-prepick" }
  | { type: "go-to"; step: BookingStep }
  | { type: "set-contact"; contact: Profile }
  | { type: "select-address"; addressId: string }
  | { type: "set-new-address"; address: AddressDraft | null; save?: boolean }
  | { type: "set-date"; dateKey: string }
  | { type: "set-slot"; start: number | null }
  | { type: "sync-saved-cars"; cars: Car[] }
  | { type: "set-promo"; code: string | null }
  | { type: "set-use-wallet"; useWallet: boolean }
  | { type: "set-notes"; notes: string }
  | { type: "set-payment"; payment: Partial<BookingDraft["payment"]> };

export function createInitialDraft(prepickSlug: string | null): BookingDraft {
  return {
    step: 1,
    cars: [],
    expandedKey: null,
    prepickSlug,
    contact: { firstName: "", lastName: "", phone: "", email: "" },
    addressId: null,
    newAddress: null,
    saveNewAddress: true,
    dateKey: null,
    slotStart: null,
    promoCode: null,
    useWallet: false,
    notes: "",
    payment: { plan: "full", depositPercent: 50, remainingMethod: null },
  };
}

function nextExpanded(cars: CarDraft[], fallback: string | null) {
  return cars.find((car) => !car.serviceSlug)?.key ?? fallback;
}

function addCar(draft: BookingDraft, car: Car, isNew: boolean, saveToAccount: boolean) {
  const isFirst = draft.cars.length === 0;
  const entry: CarDraft = {
    key: createId("line"),
    car,
    isNew,
    saveToAccount,
    // A package picked from a service card goes to the first car only.
    serviceSlug: isFirst ? draft.prepickSlug : null,
    extraIds: [],
  };
  const cars = [...draft.cars, entry];
  return {
    ...draft,
    cars,
    expandedKey: entry.serviceSlug ? nextExpanded(cars, entry.key) : entry.key,
    slotStart: null,
  };
}

export function bookingReducer(draft: BookingDraft, action: BookingAction): BookingDraft {
  switch (action.type) {
    case "toggle-saved-car": {
      const existing = draft.cars.find((item) => item.car.id === action.car.id);
      if (existing) return bookingReducer(draft, { type: "remove-car", key: existing.key });
      return addCar(draft, action.car, false, false);
    }
    case "add-new-car":
      return addCar(draft, { id: createId("new"), ...action.input }, true, action.saveToAccount);
    case "remove-car": {
      const cars = draft.cars.filter((item) => item.key !== action.key);
      return {
        ...draft,
        cars,
        expandedKey:
          draft.expandedKey === action.key ? nextExpanded(cars, null) : draft.expandedKey,
        slotStart: null,
      };
    }
    case "set-service": {
      const cars = draft.cars.map((item) =>
        item.key === action.key ? { ...item, serviceSlug: action.serviceSlug } : item,
      );
      return { ...draft, cars, slotStart: null };
    }
    case "toggle-extra": {
      const cars = draft.cars.map((item) => {
        if (item.key !== action.key) return item;
        const has = item.extraIds.includes(action.extraId);
        return {
          ...item,
          extraIds: has
            ? item.extraIds.filter((id) => id !== action.extraId)
            : [...item.extraIds, action.extraId],
        };
      });
      return { ...draft, cars, slotStart: null };
    }
    case "copy-first-car": {
      const first = draft.cars[0];
      if (!first?.serviceSlug) return draft;
      const cars = draft.cars.map((item) =>
        item.key === action.key
          ? { ...item, serviceSlug: first.serviceSlug, extraIds: [...first.extraIds] }
          : item,
      );
      return { ...draft, cars, slotStart: null };
    }
    case "expand":
      // Collapsing a finished car opens the next car that still needs a package.
      return { ...draft, expandedKey: action.key ?? nextExpanded(draft.cars, null) };
    case "dismiss-prepick": {
      const first = draft.cars[0];
      const cars =
        first && first.serviceSlug === draft.prepickSlug
          ? draft.cars.map((item, index) => (index === 0 ? { ...item, serviceSlug: null } : item))
          : draft.cars;
      return {
        ...draft,
        prepickSlug: null,
        cars,
        expandedKey: nextExpanded(cars, draft.expandedKey),
      };
    }
    case "go-to":
      return { ...draft, step: action.step };
    case "set-contact":
      return { ...draft, contact: action.contact };
    case "select-address":
      return { ...draft, addressId: action.addressId, slotStart: draft.slotStart };
    case "set-new-address":
      return {
        ...draft,
        newAddress: action.address,
        addressId: action.address ? "new" : draft.addressId === "new" ? null : draft.addressId,
        saveNewAddress: action.save ?? draft.saveNewAddress,
      };
    case "set-date":
      return { ...draft, dateKey: action.dateKey, slotStart: null };
    case "set-slot":
      return { ...draft, slotStart: action.start };
    case "sync-saved-cars": {
      // Keeps saved-car drafts in sync if a car was edited or deleted in another tab.
      const cars = draft.cars.flatMap((item) => {
        if (item.isNew) return [item];
        const fresh = action.cars.find((car) => car.id === item.car.id);
        return fresh ? [{ ...item, car: fresh }] : [];
      });
      return cars.length === draft.cars.length &&
        cars.every((item, index) => item.car === draft.cars[index].car)
        ? draft
        : { ...draft, cars };
    }
    case "set-promo":
      return { ...draft, promoCode: action.code };
    case "set-use-wallet":
      return { ...draft, useWallet: action.useWallet };
    case "set-notes":
      return { ...draft, notes: action.notes };
    case "set-payment":
      return { ...draft, payment: { ...draft.payment, ...action.payment } };
    default:
      return draft;
  }
}

export function toSelections(cars: CarDraft[]): CarServiceSelection[] {
  return cars.map((item) => ({ serviceSlug: item.serviceSlug, extraIds: item.extraIds }));
}

export function carTitle(car: Pick<Car, "brand" | "model">) {
  return `${car.brand} ${car.model}`.trim();
}

export function isCarsStepComplete(draft: BookingDraft) {
  return draft.cars.length > 0 && draft.cars.every((item) => item.serviceSlug);
}

/** Prices for the current draft; the wallet only counts when the customer switched it on. */
export function draftTotals(
  draft: BookingDraft,
  address: AddressDraft | null,
  walletBalance: number,
) {
  return bookingTotals(
    toSelections(draft.cars),
    address ? (getArea(address.areaId)?.fee ?? 0) : 0,
    draft.promoCode,
    draft.useWallet ? walletBalance : 0,
  );
}
