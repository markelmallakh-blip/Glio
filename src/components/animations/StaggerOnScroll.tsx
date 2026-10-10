"use client";

import { type ElementType, type ReactNode } from "react";
import { useGsap } from "@/hooks/useGsap";

type StaggerOnScrollProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Selector for the items to stagger, scoped to this element. */
  selector?: string;
  from?: { x?: number; y?: number };
};

/** GSAP ScrollTrigger stagger for a list of items marked with `data-stagger`. */
export function StaggerOnScroll({
  children,
  as: Component = "div",
  className,
  selector = "[data-stagger]",
  from = { x: -32 },
}: StaggerOnScrollProps) {
  const scope = useGsap<HTMLElement>(({ gsap, reducedMotion, scope: element }) => {
    if (reducedMotion) return;
    gsap.from(selector, {
      ...from,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: element, start: "top 80%", once: true },
    });
  });

  return (
    <Component ref={scope} className={className}>
      {children}
    </Component>
  );
}
