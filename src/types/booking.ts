import { type ImageAsset } from "./media";

export type ServicePackage = {
  slug: string;
  name: string;
  /** Short tag shown on cards, e.g. "Full Detailing". */
  category: string;
  summary: string;
  description: string;
  price: number;
  /** Shortest and longest time the package takes for one car. */
  durationMinutes: { min: number; max: number };
  includes: string[];
  image: ImageAsset;
  imageLabel: string;
};

export type Extra = {
  id: string;
  name: string;
  description: string;
  price: number;
  /** Extra time added to the visit for one car. */
  durationMinutes: number;
};

export type ServiceArea = {
  id: string;
  name: string;
  fee: number;
};

export type VehicleType =
  "sedan" | "hatchback" | "suv" | "pickup" | "van" | "motorcycle" | "scooter";

/** Egyptian plate: up to 4 digits and 1–3 Arabic letters. */
export type EgyptianPlate = { numbers: string; letters: string };

export type Car = {
  id: string;
  type: VehicleType;
  brand: string;
  model: string;
  year: string;
  color: string;
  /** Optional: customers can book before they know the plate. */
  plate: EgyptianPlate | null;
};

export type NewCarInput = Omit<Car, "id">;

export type Address = {
  id: string;
  label: string;
  areaId: string;
  details: string;
};

export type Profile = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export type BookingCar = {
  car: Car;
  serviceSlug: string;
  extraIds: string[];
};

export type BookingStatus = "upcoming" | "completed" | "cancelled";

export type DepositPercent = 30 | 50 | 70;

/** How the balance of a down-payment booking is settled on the visit day. */
export type RemainingMethod = "instapay" | "pos" | "cash";

/** "wallet" means the GLIO wallet covered the whole amount, so nothing was charged. */
export type PaymentMethod = "card" | "instapay" | "wallet";

export type ReceiptFile = { name: string; size: number; type: string };

export type BookingPayment = {
  plan: "full" | "deposit";
  depositPercent: DepositPercent | null;
  /** Amount due online now (full total or the down payment). */
  paidNow: number;
  remaining: number;
  remainingMethod: RemainingMethod | null;
  method: PaymentMethod;
  /** Card payments are instant; Instapay transfers wait for the team to check the receipt. */
  status: "paid" | "under-review";
  cardLast4: string | null;
  receipt: ReceiptFile | null;
};

export type Booking = {
  id: string;
  reference: string;
  createdAt: string;
  status: BookingStatus;
  cars: BookingCar[];
  address: Address;
  /** ISO date-time strings. */
  start: string;
  end: string;
  durationMinutes: number;
  locationFee: number;
  promoCode: string | null;
  discount: number;
  total: number;
  /** GLIO wallet money applied to this booking (absent on older bookings). */
  walletUsed?: number;
  /** Loyalty points credited for this booking. */
  pointsEarned?: number;
  /** Instructions for the team, e.g. parking floor or gate code. */
  notes: string;
  payment: BookingPayment;
  contact: Profile;
};

/** One movement in the points or wallet balance. `delta` is signed (points or EGP). */
export type LedgerEntry = {
  id: string;
  date: string;
  label: string;
  delta: number;
};

export type Loyalty = {
  points: number;
  /** Wallet balance in EGP, usable on future bookings. */
  wallet: number;
  pointsActivity: LedgerEntry[];
  walletActivity: LedgerEntry[];
};
