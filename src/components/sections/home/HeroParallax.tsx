"use client";

import { type ReactNode } from "react";
import { useGsap } from "@/hooks/useGsap";

/** Scroll-driven parallax for the hero layers (GSAP ScrollTrigger, scrubbed). */
export function HeroParallax({ children, className }: { children: ReactNode; className?: string }) {
  const scope = useGsap<HTMLElement>(({ gsap, reducedMotion, scope: element }) => {
    if (reducedMotion) return;
    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: element, start: "top top", end: "bottom top", scrub: 0.6 },
    });
    timeline
      .to("[data-parallax='van']", { xPercent: -6, yPercent: 6, scale: 1.04 }, 0)
      .to("[data-parallax='chips']", { yPercent: -45 }, 0)
      .to("[data-parallax='route']", { xPercent: 8, opacity: 0 }, 0)
      .to("[data-parallax='glow']", { yPercent: 12, opacity: 0.6 }, 0);
  });

  return (
    <section ref={scope} className={className} aria-label="Introduction">
      {children}
    </section>
  );
}
