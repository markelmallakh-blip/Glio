import { type ImageAsset } from "@/types/media";

export type PostCategory = "Blog" | "News" | "Event";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  publishedAt: string;
  readingMinutes: number;
  image: ImageAsset;
  body: { heading?: string; paragraphs: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "why-regular-car-cleaning-matters-in-city-driving",
    title: "Why Regular Car Cleaning Matters in City Driving",
    excerpt:
      "Dust, traffic and heat take a toll on your car every day. Here is why a regular cleaning routine protects more than just looks.",
    category: "Blog",
    publishedAt: "2026-02-05",
    readingMinutes: 4,
    image: {
      type: "image",
      src: "/images/media/trunk.webp",
      alt: "GLIO equipment kit packed in the trunk of an SUV",
      width: 1024,
      height: 683,
    },
    body: [
      {
        paragraphs: [
          "Driving in Cairo means dust, stop-and-go traffic and strong sun almost every day of the year. Over time, that mix settles into your paint, your cabin and your air vents.",
        ],
      },
      {
        heading: "Protect the paint",
        paragraphs: [
          "Fine dust acts like sandpaper when it is wiped off dry. Regular washing with the right shampoo lifts it safely and keeps the clear coat healthy, which makes polishing and wax treatments last longer.",
        ],
      },
      {
        heading: "A healthier cabin",
        paragraphs: [
          "Vacuuming and interior care remove allergens and food crumbs that build up between seats. A clean cabin simply feels better on a long commute.",
          "With GLIO you don't need to plan a trip to a car wash: we come to where your car is already parked.",
        ],
      },
    ],
  },
  {
    slug: "book-several-cars-in-one-visit",
    title: "You Can Now Book Several Cars in One Visit",
    excerpt:
      "Pick your cars, choose a package for each, and our van takes care of them back-to-back at the same address.",
    category: "News",
    publishedAt: "2026-03-12",
    readingMinutes: 3,
    image: {
      type: "image",
      src: "/images/media/polishing.webp",
      alt: "GLIO technician polishing a black car next to the GLIO van",
      width: 1536,
      height: 1024,
    },
    body: [
      {
        paragraphs: [
          "Booking starts with your car now. Choose from your saved cars or add a new one, then pick a package for each car in the same step.",
        ],
      },
      {
        heading: "How timing works",
        paragraphs: [
          "One van services every car back-to-back with a 30 minute break in between. We only show start times that leave enough room for the whole visit, so there are no surprises on the day.",
        ],
      },
    ],
  },
  {
    slug: "meet-the-glio-product-line",
    title: "Meet the Products Behind Every GLIO Visit",
    excerpt:
      "From Italian shampoos to German polish, a look at what our technicians carry in every van.",
    category: "Event",
    publishedAt: "2026-04-20",
    readingMinutes: 5,
    image: {
      type: "image",
      src: "/images/media/products.webp",
      alt: "Row of GLIO branded car care spray bottles",
      width: 780,
      height: 542,
    },
    body: [
      {
        paragraphs: [
          "We use Fra Ber Italian chemicals, shampoos, tyre shine and foams, Menzerna German polish and Sonax wax coats.",
        ],
      },
      {
        heading: "Why it matters",
        paragraphs: [
          "Professional products clean more effectively while staying gentle on paint, plastics and leather. That is how we deliver consistent results on every car.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}
