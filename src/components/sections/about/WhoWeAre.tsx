import Image from "next/image";
import { aboutContent } from "@/content/marketing";
import { Container } from "@/components/layout/Container";
import { Sparkle } from "@/components/brand/Sparkle";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";

export function WhoWeAre() {
  return (
    <section aria-labelledby="who-we-are" className="bg-ink py-16 text-white md:py-24">
      <Container className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr] lg:items-stretch">
        <Reveal className="flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="dark">Our Solution</Eyebrow>
            <h2 id="who-we-are" className="text-h2 font-display">
              Who We Are
            </h2>
            <p className="text-white/85">{aboutContent.whoWeAre}</p>
          </div>
          <Button href="/booking" className="w-fit">
            Book Now
          </Button>
        </Reveal>

        <Reveal
          delay={0.1}
          className="relative isolate flex min-h-[32rem] flex-col justify-between overflow-hidden rounded-[1.25rem] px-5 py-10"
        >
          <Image
            src="/images/about/solutions.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="-z-20 object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 to-black/25"
          />
          <div className="flex flex-col gap-5">
            <span className="flex size-12 items-center justify-center rounded-full bg-lime text-ink">
              <Sparkle className="w-7" />
            </span>
            <h3 className="text-h4 font-display">{aboutContent.solutionTitle}</h3>
            <p className="text-white/80">{aboutContent.solution}</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {["On-Site Service", "Professional Results"].map((label) => (
              <li
                key={label}
                className="rounded-xl border border-white/20 bg-black/5 px-4 py-3 font-display text-lime backdrop-blur-md"
              >
                {label}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          delay={0.2}
          className="flex flex-col gap-5 rounded-[1.25rem] bg-white p-5 text-ink md:p-6"
        >
          <h3 className="text-2xl font-display">Professional Standards. Consistent Results.</h3>
          <div className="relative aspect-[416/219] overflow-hidden rounded-xl">
            <Image
              src="/images/media/polishing.webp"
              alt="GLIO technician machine-polishing a black car"
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover"
            />
          </div>
          <ul className="flex flex-col gap-3">
            {aboutContent.standards.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <Icon name="check-circle" size={18} className="mt-0.5 text-success" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
