import { type Address, type Booking, type Car, type Loyalty, type Profile } from "@/types/booking";
import { addDays } from "@/lib/booking/time";

/** Seed data so a first-time demo login has saved cars, addresses and history. */
export function createDemoAccount(phone: string): {
  profile: Profile;
  cars: Car[];
  addresses: Address[];
  bookings: Booking[];
  loyalty: Loyalty;
} {
  const profile: Profile = { firstName: "", lastName: "", phone, email: "" };
  const cars: Car[] = [
    {
      id: "car_mercedes",
      type: "sedan",
      brand: "Mercedes",
      model: "C180",
      year: "2023",
      color: "Black",
      plate: { numbers: "239", letters: "ك ا ي" },
    },
    {
      id: "car_pajero",
      type: "suv",
      brand: "Mitsubishi",
      model: "Pajero",
      year: "2021",
      color: "Silver",
      plate: { numbers: "812", letters: "س ر ن" },
    },
    {
      id: "car_sunny",
      type: "sedan",
      brand: "Nissan",
      model: "Sunny",
      year: "2019",
      color: "White",
      plate: { numbers: "4471", letters: "م ع ب" },
    },
    {
      id: "car_vespa",
      type: "scooter",
      brand: "Vespa",
      model: "Primavera",
      year: "2022",
      color: "Mint",
      plate: null,
    },
  ];
  const addresses: Address[] = [
    {
      id: "addr_home",
      label: "Home",
      areaId: "new-cairo",
      details: "124 B Gardenia Heights Compound, New Cairo",
    },
    {
      id: "addr_work",
      label: "Work",
      areaId: "heliopolis",
      details: "18 El Merghany St, Heliopolis",
    },
  ];

  const pastStart = addDays(new Date(), -21);
  pastStart.setHours(10, 0, 0, 0);
  const pastEnd = new Date(pastStart);
  pastEnd.setHours(11, 0, 0, 0);

  const bookings: Booking[] = [
    {
      id: "bk_demo_past",
      reference: "GL-24817",
      createdAt: addDays(pastStart, -3).toISOString(),
      status: "completed",
      cars: [{ car: cars[0], serviceSlug: "regular", extraIds: [] }],
      address: addresses[0],
      start: pastStart.toISOString(),
      end: pastEnd.toISOString(),
      durationMinutes: 60,
      locationFee: 30,
      promoCode: null,
      discount: 0,
      total: 380,
      walletUsed: 0,
      pointsEarned: 380,
      notes: "",
      payment: {
        plan: "full",
        depositPercent: null,
        paidNow: 380,
        remaining: 0,
        remainingMethod: null,
        method: "card",
        status: "paid",
        cardLast4: "0262",
        receipt: null,
      },
      contact: profile,
    },
  ];

  return { profile, cars, addresses, bookings, loyalty: createDemoLoyalty(pastStart) };
}

/** Starting points so the demo can show redeeming right away. */
export function createDemoLoyalty(lastVisit = addDays(new Date(), -21)): Loyalty {
  return {
    points: 1250,
    wallet: 0,
    pointsActivity: [
      {
        id: "pts_bonus",
        date: addDays(lastVisit, 2).toISOString(),
        label: "Spring car care bonus",
        delta: 370,
      },
      {
        id: "pts_booking",
        date: lastVisit.toISOString(),
        label: "Booking GL-24817",
        delta: 380,
      },
      {
        id: "pts_welcome",
        date: addDays(lastVisit, -3).toISOString(),
        label: "Welcome to GLIO",
        delta: 500,
      },
    ],
    walletActivity: [],
  };
}
