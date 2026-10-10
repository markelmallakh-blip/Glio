"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Counts from `from` up (or down) to `target`. Pass `from: null` to show `target`
 * straight away. Reduced motion skips the animation.
 */
export function useCountUp(target: number, from: number | null, duration = 1400) {
  const reduce = usePrefersReducedMotion();
  const animate = from !== null && !reduce;
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!animate) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(from + (target - from) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animate, from, target, duration]);

  return animate ? value : target;
}
