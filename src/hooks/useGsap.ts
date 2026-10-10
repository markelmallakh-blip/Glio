"use client";

import { useLayoutEffect, useRef, type DependencyList, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

function ensurePlugins() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export type GsapSetup = (context: {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  /** The container element the animation is scoped to. */
  scope: HTMLElement;
  /** True when the user asked for reduced motion; render the end state instead. */
  reducedMotion: boolean;
}) => void | (() => void);

/**
 * Runs GSAP code scoped to a container. Selectors only match inside the
 * container, and every tween / ScrollTrigger is reverted on unmount.
 */
export function useGsap<T extends HTMLElement>(
  setup: GsapSetup,
  deps: DependencyList = [],
): RefObject<T | null> {
  const scope = useRef<T>(null);

  useLayoutEffect(() => {
    const element = scope.current;
    if (!element) return;
    ensurePlugins();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(
      () => setup({ gsap, ScrollTrigger, reducedMotion, scope: element }),
      element,
    );
    return () => context.revert();
    // `setup` is intentionally excluded: callers pass explicit deps like useEffect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
