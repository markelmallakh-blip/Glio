import { type Extra, type ServiceArea, type ServicePackage } from "@/types/booking";

export const services: ServicePackage[] = [
  {
    slug: "regular",
    name: "Regular",
    category: "60 min",
    summary: "Exterior & interior care, vacuum, tyre shine",
    description:
      "The Regular package covers essential car care for everyday cleanliness. It maintains your car's interior and exterior with consistent cleaning, making it ideal for routine upkeep without added complexity.",
    price: 350,
    durationMinutes: { min: 60, max: 60 },
    includes: ["Regular exterior care", "Regular interior care", "Vacuum", "Tyre shine"],
    image: {
      type: "image",
      src: "/images/services/regular.webp",
      alt: "Technician wiping a car dashboard with a yellow microfiber cloth",
      width: 620,
      height: 372,
    },
    imageLabel: "Regular interior",
  },
  {
    slug: "detailing",
    name: "Detailing",
    category: "2–3 hrs",
    summary: "Interior & rims detailing, steam cleaning",
    description:
      "Detailing goes beyond a wash. Our specialists steam-clean the cabin, polish the black piano trims and detail the rims, air vents and pedals so every surface looks cared for.",
    price: 1500,
    durationMinutes: { min: 120, max: 180 },
    includes: [
      "Steam cleaning",
      "Exterior care",
      "Interior detailing",
      "Interior black piano polishing",
      "Rims detailing",
      "Air vents, brake & gas pedals",
    ],
    image: {
      type: "image",
      src: "/images/about/interior.webp",
      alt: "GLIO technician detailing a car seat",
      width: 1536,
      height: 1024,
    },
    imageLabel: "Interior detailing",
  },
  {
    slug: "express",
    name: "Express",
    category: "3–4 hrs",
    summary: "Chemical care, door panels, trunk, seats extraction",
    description:
      "Express is a deep interior refresh. It combines chemical car care with door panel, trunk and roof cleaning, plus stain-free seat extraction for a cabin that feels new again.",
    price: 1800,
    durationMinutes: { min: 180, max: 240 },
    includes: [
      "Chemical car care",
      "Door panels",
      "Trunk",
      "Interior roof cleaning",
      "Seats cleaning & extraction (stain free)",
    ],
    image: {
      type: "image",
      src: "/images/services/express.webp",
      alt: "Technician spraying chemical cleaner on a car dashboard",
      width: 1200,
      height: 800,
    },
    imageLabel: "Chemical car care",
  },
  {
    slug: "deluxe",
    name: "Deluxe",
    category: "4 hrs",
    summary: "Seats & roof, interior & exterior detailing",
    description:
      "The Deluxe package offers enhanced detailing for both interior and exterior surfaces. It provides deeper care than a basic wash, focusing on cleanliness, comfort and attention to detail.",
    price: 2500,
    durationMinutes: { min: 240, max: 240 },
    includes: [
      "Seats & interior roof cleaning",
      "Door panels & trunk",
      "Interior & exterior detailing",
      "Chemical car care",
      "Rims detailing",
      "Interior console polishing",
      "Steam cleaning",
    ],
    image: {
      type: "image",
      src: "/images/services/deluxe.webp",
      alt: "Gloved hand detailing a car's center console",
      width: 1000,
      height: 667,
    },
    imageLabel: "Interior car detailing",
  },
  {
    slug: "premium",
    name: "Premium",
    category: "4 hrs",
    summary: "Full exterior polishing, wax coat",
    description:
      "Premium is focused on exterior enhancement and protection. Through professional polishing and a protective wax coat, it improves paint finish, shine and long-term appearance.",
    price: 3500,
    durationMinutes: { min: 240, max: 240 },
    includes: ["Full exterior polishing", "Wax coat", "Regular interior"],
    image: {
      type: "image",
      src: "/images/services/premium.webp",
      alt: "Technician applying wax to a red car's front panel",
      width: 1253,
      height: 837,
    },
    imageLabel: "Wax coat",
  },
  {
    slug: "elite",
    name: "Elite",
    category: "Full detailing · 8 hrs",
    summary: "Full detailing: polishing, wax, interior",
    description:
      "Elite is our most complete detailing package, designed to deliver outstanding results. It combines advanced chemical treatment, detailed interior care, exterior polishing and wax protection to restore shine and protect your car.",
    price: 5000,
    durationMinutes: { min: 480, max: 480 },
    includes: [
      "Wax coat",
      "Full exterior polishing",
      "Interior & exterior detailing",
      "Chemical car care",
    ],
    image: {
      type: "image",
      src: "/images/services/elite.webp",
      alt: "Machine polisher restoring the paint on a silver car",
      width: 800,
      height: 534,
    },
    imageLabel: "Full exterior polishing",
  },
];

export const extras: Extra[] = [
  {
    id: "engine-bay",
    name: "Engine Bay Cleaning",
    description: "Removes dirt and grease for a cleaner, safer engine bay.",
    price: 250,
    durationMinutes: 0,
  },
  {
    id: "exterior-polishing",
    name: "Full exterior polishing",
    description: "Paint correction to remove scratches and restore a smooth finish.",
    price: 3000,
    durationMinutes: 0,
  },
  {
    id: "wax-coat",
    name: "Wax coat",
    description: "Protective wax layer that enhances shine and guards the paint.",
    price: 1000,
    durationMinutes: 0,
  },
  {
    id: "detailing",
    name: "Detailing",
    description: "Thorough interior cleaning with attention to every detail.",
    price: 1500,
    durationMinutes: 0,
  },
  {
    id: "console-polishing",
    name: "Interior console polishing",
    description: "Black piano restoration that removes scratches and brings back the deep black.",
    price: 500,
    durationMinutes: 0,
  },
  {
    id: "rims",
    name: "Rims Detailing",
    description: "Removes dirt and grease for brighter, shinier rims and wheels.",
    price: 500,
    durationMinutes: 0,
  },
  {
    id: "headlights",
    name: "Headlights Restoration",
    description: "Clears yellowed, foggy headlights for better looks and visibility.",
    price: 600,
    durationMinutes: 0,
  },
];

/** Demo coverage zones and their per-visit location fee. */
export const serviceAreas: ServiceArea[] = [
  { id: "new-cairo", name: "New Cairo", fee: 30 },
  { id: "heliopolis", name: "Heliopolis", fee: 40 },
  { id: "nasr-city", name: "Nasr City", fee: 40 },
  { id: "maadi", name: "Maadi", fee: 50 },
  { id: "zamalek", name: "Zamalek", fee: 60 },
  { id: "sheikh-zayed", name: "Sheikh Zayed", fee: 70 },
  { id: "october", name: "6th of October", fee: 70 },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getExtra(id: string) {
  return extras.find((extra) => extra.id === id);
}

export function getArea(id: string) {
  return serviceAreas.find((area) => area.id === id);
}
