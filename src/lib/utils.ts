import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Teach tailwind-merge the custom type scale so `text-h2` isn't mistaken for a colour. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h2", "h3", "h4", "title"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const egp = new Intl.NumberFormat("en-EG", { maximumFractionDigits: 0 });

export function formatEGP(amount: number) {
  return `${egp.format(amount)} EGP`;
}

export function formatSignedEGP(amount: number) {
  return `+${formatEGP(amount)}`;
}

export function createId(prefix: string) {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefix}_${random}`;
}
