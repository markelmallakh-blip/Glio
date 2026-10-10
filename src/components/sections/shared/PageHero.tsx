import { type ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "lime";
  children?: ReactNode;
  className?: string;
};

/** Top band for inner pages: eyebrow + H1 (+ optional media below). */
export function PageHero({
  eyebrow,
  title,
  description,
  tone = "dark",
  children,
  className,
}: PageHeroProps) {
  const dark = tone === "dark";
  return (
    <section className={cn(dark ? "bg-ink text-white" : "bg-lime text-ink", className)}>
      <Container className="flex flex-col items-center gap-4 py-12 text-center md:py-16">
        <Eyebrow
          tone={dark ? "dark" : "light"}
          className={cn("animate-rise", !dark && "bg-ink/10 bg-none")}
        >
          {eyebrow}
        </Eyebrow>
        <h1
          className={cn(
            "max-w-4xl animate-rise text-display font-display text-balance [--delay:100ms]",
            dark ? "text-lime" : "text-ink",
          )}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "max-w-2xl animate-rise text-base text-pretty [--delay:200ms] md:text-lg",
              dark ? "text-white/80" : "text-ink/80",
            )}
          >
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
