import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = { children: ReactNode; tone?: "light" | "dark"; className?: string };

/** Small pill label above headings ("Book GLIO Now", "Need Help?"). */
export function Eyebrow({ children, tone = "light", className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full px-4 py-0.5 text-sm font-bold md:text-base",
        tone === "light" ? "eyebrow-gradient text-ink" : "eyebrow-gradient-dark text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "start";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Heading
        id={id}
        className={cn(
          "font-display text-balance",
          Heading === "h1" ? "text-display" : "text-h2",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "max-w-xl text-base text-pretty md:text-lg",
            tone === "dark" ? "text-white/85" : "text-grey",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
