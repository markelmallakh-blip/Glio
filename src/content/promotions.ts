export type Promotion = {
  code: string;
  label: string;
  kind: "percent-off-packages" | "fixed-off" | "free-visit-fee";
  value: number;
};

/** Demo codes. Replace with a server-side validation call in production. */
export const promotions: Promotion[] = [
  { code: "GLIO10", label: "10% off all packages", kind: "percent-off-packages", value: 10 },
  { code: "WELCOME50", label: "50 EGP off your first visit", kind: "fixed-off", value: 50 },
  { code: "FREEVISIT", label: "Visit fee waived", kind: "free-visit-fee", value: 0 },
];

export function findPromotion(code: string) {
  const normalized = code.trim().toUpperCase();
  return promotions.find((promotion) => promotion.code === normalized);
}

export function promotionDiscount(promotion: Promotion, carsTotal: number, locationFee: number) {
  switch (promotion.kind) {
    case "percent-off-packages":
      return Math.round((carsTotal * promotion.value) / 100);
    case "fixed-off":
      return Math.min(promotion.value, carsTotal + locationFee);
    case "free-visit-fee":
      return locationFee;
  }
}
