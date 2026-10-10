import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Sparkle } from "@/components/brand/Sparkle";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";

function SmarterBadge() {
  return (
    <div className="absolute top-1/2 left-0 z-10 hidden size-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[6px] border-white bg-ink md:flex lg:size-44">
      <svg viewBox="0 0 160 160" className="absolute inset-2 animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M80 80m-56 0a56 56 0 1 1 112 0a56 56 0 1 1-112 0" />
        </defs>
        <text className="fill-lime text-[15px] font-extrabold tracking-[0.12em] italic">
          <textPath href="#badge-circle">SMARTER WAY FOR CAR CARE • SMARTER WAY •</textPath>
        </text>
      </svg>
      <Sparkle className="w-14 text-lime" />
    </div>
  );
}

export function AboutTeaser() {
  return (
    <section aria-labelledby="about-teaser" className="bg-white py-6 md:py-8">
      <Container className="grid gap-3 md:grid-cols-2">
        <Reveal className="flex flex-col justify-between gap-10 rounded-3xl bg-lime p-6 md:p-8 lg:min-h-[50rem]">
          <div className="flex flex-col gap-3">
            <Eyebrow>About GLIO</Eyebrow>
            <h2 id="about-teaser" className="max-w-lg text-h2 font-display">
              Modern Car Care at Your Location
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            <p className="max-w-md text-lg">
              GLIO was created to change the way car care is done. We deliver professional washing
              and detailing services directly to your location, saving you time without compromising
              on quality.
            </p>
            <Button href="/about" variant="outline-dark" size="sm" className="w-fit">
              About Us
            </Button>
          </div>
        </Reveal>
        <div className="relative min-h-[22rem] md:min-h-0">
          <SmarterBadge />
          <div className="relative h-full min-h-[22rem] overflow-hidden rounded-3xl">
            <Image
              src="/images/about/wash.webp"
              alt="GLIO technician pressure washing a soapy black car beside the GLIO van"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-[30%_center]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
