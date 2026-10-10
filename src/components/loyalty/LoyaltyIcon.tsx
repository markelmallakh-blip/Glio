import Image from "next/image";
import { cn } from "@/lib/utils";

const sources = {
  points: "/images/points.webp",
  wallet: "/images/wallet.webp",
  promo: "/images/promo.webp",
};

/**
 * 3D brand illustrations for points, wallet and promo. The files have a white
 * background, so `mix-blend-multiply` lets them sit on light tinted surfaces.
 */
export function LoyaltyIcon({
  name,
  size = 40,
  className,
}: {
  name: keyof typeof sources;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={sources[name]}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={cn("shrink-0 mix-blend-multiply select-none", className)}
    />
  );
}
