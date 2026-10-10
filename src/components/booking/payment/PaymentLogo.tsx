import Image from "next/image";
import { cn } from "@/lib/utils";

const logos = {
  visa: { src: "/images/payments/visa.svg", alt: "Visa", width: 40, height: 40 },
  mastercard: { src: "/images/payments/mastercard.svg", alt: "Mastercard", width: 38, height: 24 },
  instapay: { src: "/images/payments/instapay.svg", alt: "InstaPay", width: 96, height: 24 },
} as const;

/** Payment brand marks served from /public/images/payments (swap files to update). */
export function PaymentLogo({ name, className }: { name: keyof typeof logos; className?: string }) {
  const logo = logos[name];
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      unoptimized
      className={cn("h-6 w-auto", className)}
    />
  );
}
