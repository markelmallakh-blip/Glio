import { getExtra, getService } from "@/content/services";
import { findPromotion, promotionDiscount } from "@/content/promotions";
import { type CarServiceSelection } from "./schedule";

export function carSubtotal(selection: CarServiceSelection) {
  const service = selection.serviceSlug ? getService(selection.serviceSlug) : undefined;
  const extrasTotal = selection.extraIds.reduce((sum, id) => sum + (getExtra(id)?.price ?? 0), 0);
  return (service?.price ?? 0) + extrasTotal;
}

/**
 * `total` is the booking price after the promo. `payable` is what the customer still
 * pays after `walletAvailable` (wallet money they chose to use) is applied.
 */
export function bookingTotals(
  selections: CarServiceSelection[],
  locationFee: number,
  promoCode: string | null = null,
  walletAvailable = 0,
) {
  const carsTotal = selections.reduce((sum, selection) => sum + carSubtotal(selection), 0);
  const promotion = promoCode ? findPromotion(promoCode) : undefined;
  const discount =
    promotion && carsTotal > 0 ? promotionDiscount(promotion, carsTotal, locationFee) : 0;
  const total = Math.max(0, carsTotal + locationFee - discount);
  const walletApplied = Math.min(Math.max(0, walletAvailable), total);
  return {
    carsTotal,
    locationFee,
    promotion,
    discount,
    total,
    walletApplied,
    payable: total - walletApplied,
  };
}
