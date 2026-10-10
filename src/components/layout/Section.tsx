import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const tones = {
  white: "bg-white text-ink",
  surface: "bg-surface text-ink",
  muted: "bg-surface-strong text-ink",
  dark: "bg-ink text-white",
  lime: "bg-lime text-ink",
};

const spacings = {
  none: "",
  sm: "py-10 md:py-14",
  md: "py-14 md:py-20 lg:py-24",
  lg: "py-16 md:py-24 lg:py-[6.25rem]",
};

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: keyof typeof tones;
  spacing?: keyof typeof spacings;
};

export function Section({ tone = "white", spacing = "lg", className, ...props }: SectionProps) {
  return <section className={cn(tones[tone], spacings[spacing], className)} {...props} />;
}
