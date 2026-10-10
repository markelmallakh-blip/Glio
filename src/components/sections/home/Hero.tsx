import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Media } from "@/components/media/Media";
import { type ImageAsset } from "@/types/media";
import { HeroParallax } from "./HeroParallax";

const van: ImageAsset = {
  type: "image",
  src: "/images/hero-van.webp",
  alt: "The black GLIO service van with lime branding",
  width: 1536,
  height: 1024,
};

function RouteLine() {
  return (
    <svg
      viewBox="0 0 430 110"
      fill="none"
      aria-hidden="true"
      className="absolute top-[34%] right-[6%] hidden w-[26rem] text-white/15 lg:block"
      data-parallax="route"
    >
      <path
        d="M4 96c40-30 70-34 104-22 30 11 34 36 64 30s20-44 56-48 46 26 84 14 52-26 93-41"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="10 9"
        strokeLinecap="round"
      />
      <circle cx="6" cy="95" r="6" fill="currentColor" />
      <path
        d="M414 14c0 8-9 15-9 15s-9-7-9-15a9 9 0 0 1 18 0Z"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    </svg>
  );
}

function GlassChip({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={`rounded-xl border border-white/20 bg-black/5 px-4 py-3 text-sm font-display whitespace-nowrap text-lime backdrop-blur-md md:text-base ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

export function Hero() {
  return (
    <HeroParallax className="relative isolate overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1/3 left-1/2 -z-10 aspect-[3/2] w-[140%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(196_216_71/0.7),rgb(196_216_71/0.22)_55%,transparent)] md:w-[90%]"
        data-parallax="glow"
      />
      <RouteLine />

      <Container className="flex flex-col items-center gap-6 pt-12 pb-10 text-center md:gap-8 md:pt-16 lg:pt-[3.75rem]">
        <div className="flex flex-col items-center gap-3">
          <Eyebrow tone="dark" className="animate-rise">
            Egypt’s First Mobile Car Care Service
          </Eyebrow>
          <h1 className="max-w-[58rem] animate-rise text-display font-display text-balance [--delay:120ms]">
            Professional <span className="text-lime">Car Care</span>, Right Where You Park.
          </h1>
        </div>
        <Button href="/booking" size="lg" className="animate-rise [--delay:240ms]">
          Book Now
        </Button>

        <div className="relative w-full max-w-[70rem]">
          <div data-parallax="van">
            <div className="animate-drive [--delay:200ms]">
              <Media
                asset={van}
                priority
                sizes="(min-width: 1024px) 1120px, 100vw"
                className="mx-auto w-[118%] max-w-none -translate-x-[8%] sm:w-full sm:translate-x-0"
              />
            </div>
          </div>
          <div
            className="absolute bottom-[10%] -left-1 flex flex-col items-start gap-2 sm:bottom-[14%] sm:left-[-4%]"
            data-parallax="chips"
          >
            <GlassChip className="ml-5 rotate-[4.5deg] animate-rise [--delay:600ms]">
              ON-SITE SERVICE
            </GlassChip>
            <GlassChip className="animate-rise [--delay:720ms]">EXPERT CAR CARE</GlassChip>
          </div>
        </div>
      </Container>
    </HeroParallax>
  );
}
