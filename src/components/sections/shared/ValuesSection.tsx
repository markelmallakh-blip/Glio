import { values } from "@/content/marketing";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { ValuesFan } from "./ValuesFan";

const tones = {
  soft: "bg-lime-soft text-ink",
  lime: "bg-lime text-ink",
  dark: "bg-ink-muted text-white",
  cream: "bg-lime-cream text-ink",
};

/** Resting tilt of each card on large screens (matches the Figma composition). */
const tilts = ["lg:-rotate-6", "lg:rotate-3", "lg:-rotate-6", "lg:rotate-3"];

export function ValuesSection() {
  return (
    <section
      aria-labelledby="values"
      className="overflow-hidden bg-ink py-16 md:py-24 lg:py-[6.25rem]"
    >
      <Container className="flex flex-col gap-14 md:gap-20">
        <SectionHeading
          eyebrow="Our Values"
          id="values"
          title="Guided by Values"
          description="Care you can trust. Results you’ll see."
          tone="dark"
        />
        <ValuesFan className="grid gap-4 sm:grid-cols-2 lg:flex lg:justify-center lg:gap-0 lg:pb-10">
          {values.map((value, index) => (
            <li
              key={value.title}
              data-value-card
              className={cn(
                "flex min-h-[19rem] flex-col gap-8 rounded-[2rem] border border-ink p-8 lg:-mx-2 lg:w-[19.5rem] lg:shrink-0",
                tones[value.tone],
                tilts[index],
              )}
            >
              <Icon
                name={value.icon}
                size={44}
                strokeWidth={1.3}
                className={value.tone === "dark" ? "text-lime" : "text-ink"}
              />
              <div className="flex flex-col gap-4">
                <h3 className="text-[1.75rem] leading-tight font-display">{value.title}</h3>
                <p className="text-base leading-relaxed">{value.description}</p>
              </div>
            </li>
          ))}
        </ValuesFan>
      </Container>
    </section>
  );
}
