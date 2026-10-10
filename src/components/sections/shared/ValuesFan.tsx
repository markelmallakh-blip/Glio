"use client";

import { type ReactNode } from "react";
import { useGsap } from "@/hooks/useGsap";

/**
 * On large screens the value cards start stacked in the center and fan out
 * into their tilted resting positions as the section scrolls into view.
 */
export function ValuesFan({ children, className }: { children: ReactNode; className?: string }) {
  const scope = useGsap<HTMLUListElement>(({ gsap, reducedMotion, scope: element }) => {
    if (reducedMotion) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-value-card]");
      const center = (cards.length - 1) / 2;
      cards.forEach((card, index) => {
        gsap.from(card, {
          x: (center - index) * card.offsetWidth * 0.9,
          y: 60,
          opacity: index === Math.round(center) ? 1 : 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "top 35%",
            scrub: 0.8,
          },
        });
      });
    });
  });

  return (
    <ul ref={scope} className={className}>
      {children}
    </ul>
  );
}
