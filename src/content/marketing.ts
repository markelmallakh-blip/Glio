import { type ImageAsset } from "@/types/media";

export const marqueeWords = ["Exterior", "Interiors", "Car Care", "Professionals"];

export const howItWorks = [
  {
    title: "Choose Your Cars",
    description: "Pick your cars, SUVs or scooters and a package for each.",
  },
  {
    title: "Pick Time & Location",
    description: "Choose when and where in Cairo you want us.",
  },
  {
    title: "Our Van Arrives",
    description: "A professional team arrives with full equipment.",
  },
  {
    title: "Relax & Enjoy",
    description: "Your cars get professionally cleaned at your location.",
  },
];

export const features = [
  { icon: "users", title: "Professional certified technicians" },
  { icon: "location", title: "Mobile service at your location" },
  { icon: "crown", title: "Premium products and equipment" },
  { icon: "hand", title: "Car owners satisfaction guaranteed" },
] as const;

export const values = [
  {
    icon: "star",
    title: "Quality Service",
    description:
      "We maintain the highest standards in every wash, using premium products and professional techniques.",
    tone: "soft",
  },
  {
    icon: "hand",
    title: "Convenience",
    description:
      "We come to you, saving your time and providing service at your preferred location across Cairo.",
    tone: "lime",
  },
  {
    icon: "sparkles",
    title: "Excellence",
    description:
      "Our trained professionals deliver exceptional results, treating every car with care and attention to detail.",
    tone: "dark",
  },
  {
    icon: "heart-user",
    title: "Customer Focus",
    description:
      "We listen, follow up and make sure every visit ends with a car you're proud to drive.",
    tone: "cream",
  },
] as const;

export type Testimonial = {
  quote: string;
  name: string;
  service: string;
  image: ImageAsset;
};

const testimonialImage: ImageAsset = {
  type: "image",
  src: "/images/testimonial-car.webp",
  alt: "Close-up of a freshly polished black car bonnet",
  width: 1600,
  height: 1060,
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I booked GLIO at home and the team handled everything perfectly. The car looked brand new without me having to leave my place.",
    name: "Ahmed Khaled",
    service: "Polishing & Wax Coat",
    image: testimonialImage,
  },
  {
    quote:
      "Booked both of our cars in one visit. They finished the first, took a short break and moved straight to the second. Super organised.",
    name: "Basma",
    service: "Deluxe + Express",
    image: { ...testimonialImage, src: "/images/media/polishing.webp", width: 1536, height: 1024 },
  },
  {
    quote:
      "The interior looks like it just left the showroom. Seats are stain free and the team was on time to the minute.",
    name: "Peter Nagy",
    service: "Express",
    image: { ...testimonialImage, src: "/images/services/express.webp", width: 1200, height: 800 },
  },
  {
    quote:
      "No water, no electricity, no hassle. They parked next to my office and I picked up a spotless car after work.",
    name: "Anas",
    service: "Regular",
    image: { ...testimonialImage, src: "/images/about/wash.webp", width: 1536, height: 1024 },
  },
];

export const aboutContent = {
  intro:
    "Cairo's premier mobile car care service, bringing professional washing and detailing directly to your doorstep with convenience, quality, and care.",
  whoWeAre:
    "GLIO is redefining car care in Cairo by bringing professional washing and detailing services directly to your location. Whether you’re at home, at work, or parked anywhere in the city, our mobile units arrive fully equipped to deliver consistent, high-quality results without disrupting your day.",
  solutionTitle: "Smart Mobile Car Care, Built for Modern City Life",
  solution:
    "Our mobile service model is designed for efficiency and precision. We combine professional tools, trained specialists, and streamlined processes to deliver reliable car care exactly where you need it.",
  standards: [
    "Trained and experienced car care specialists",
    "Fully equipped mobile service units",
    "Multiple service packages for every need",
    "Reliable scheduling across Cairo",
    "Clear pricing with no hidden fees",
  ],
  mission:
    "To provide Cairo with the most convenient, reliable, and high-quality mobile car care service. We're committed to saving our customers' time while delivering exceptional results that keep their vehicles looking their best.",
  vision:
    "To make professional car care effortless for every driver in Egypt, through innovation, professionalism, and customer-focused service that comes to wherever life takes you.",
};
