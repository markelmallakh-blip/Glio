"use client";

import { Fragment } from "react";
import { marqueeWords } from "@/content/marketing";
import { Sparkle } from "@/components/brand/Sparkle";
import { useGsap } from "@/hooks/useGsap";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  tone?: "white" | "dark" | "lime";
  /** Slight rotation like the Figma ribbons. */
  tilt?: number;
  reverse?: boolean;
  className?: string;
};

const tones = {
  white: "bg-white text-ink [--spark:var(--color-lime-strong)]",
  dark: "bg-ink text-white [--spark:var(--color-lime)]",
  lime: "bg-lime text-ink [--spark:var(--color-ink)]",
};

/** Percent of the track (one full copy = 50%) travelled per second at rest. */
const BASE_SPEED = 50 / 30;
/** Extra stretch at full scroll speed (0.28 = 28% taller). */
const MAX_STRETCH = 0.28;

/**
 * Infinite ribbon of brand words. It follows the scroll direction (scrolling up
 * reverses it), speeds up with scroll velocity, and stretches vertically before
 * springing back. Static under reduced motion.
 */
export function Marquee({ tone = "white", tilt = 0, reverse = false, className }: MarqueeProps) {
  const sequence = [...marqueeWords, ...marqueeWords];

  const scope = useGsap<HTMLDivElement>(
    ({ gsap, ScrollTrigger, reducedMotion, scope: element }) => {
      if (reducedMotion) return;
      const band = element.querySelector<HTMLElement>("[data-marquee-band]");
      const track = element.querySelector<HTMLElement>("[data-marquee-track]");
      if (!band || !track) return;

      const state = { direction: 1, boost: 0, x: 0 };
      const wrap = gsap.utils.wrap(-50, 0);
      const setX = gsap.quickSetter(track, "xPercent");
      const heading = reverse ? -1 : 1;

      const tick = (_time: number, deltaMs: number) => {
        const step = BASE_SPEED * (1 + state.boost) * (deltaMs / 1000);
        state.x = wrap(state.x - heading * state.direction * step);
        setX(state.x);
        state.boost *= 0.94;
      };
      gsap.ticker.add(tick);

      ScrollTrigger.create({
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          state.direction = self.direction;
          const speed = Math.abs(self.getVelocity());
          state.boost = Math.max(state.boost, gsap.utils.clamp(0, 4, speed / 600));
          const stretch = 1 + gsap.utils.clamp(0, MAX_STRETCH, speed / 9000);
          gsap.to(band, {
            scaleY: stretch,
            duration: 0.18,
            ease: "power2.out",
            overwrite: true,
            onComplete: () => {
              gsap.to(band, { scaleY: 1, duration: 1.2, ease: "elastic.out(1, 0.3)" });
            },
          });
        },
      });

      return () => gsap.ticker.remove(tick);
    },
    [reverse],
  );

  return (
    <div
      ref={scope}
      className={cn("select-none", className)}
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined }}
      aria-hidden="true"
    >
      <div
        data-marquee-band
        className={cn("overflow-hidden py-2 will-change-transform", tones[tone])}
      >
        <div data-marquee-track className="flex w-max items-center gap-6">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-6">
              {sequence.map((word, index) => (
                <Fragment key={`${copy}-${index}`}>
                  <span className="text-3xl font-display whitespace-nowrap md:text-[2.75rem]">
                    {word}
                  </span>
                  <Sparkle className="w-8 text-(--spark) md:w-10" />
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
