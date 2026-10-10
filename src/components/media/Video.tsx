"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type VideoProps = {
  src: string;
  poster?: string;
  mimeType?: "video/mp4" | "video/webm";
  /** Accessible description of the video content. */
  label: string;
  width: number;
  height: number;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
};

/**
 * Native HTML5 video that only attaches its source once it nears the viewport.
 * Autoplay is always muted + inline and is skipped when motion is reduced.
 */
export function Video({
  src,
  poster,
  mimeType = "video/mp4",
  label,
  width,
  height,
  autoPlay = false,
  loop = false,
  controls = false,
  className,
}: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const shouldAutoPlay = autoPlay && !reducedMotion;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element || !inView) return;
    if (shouldAutoPlay) {
      element.play().catch(() => {
        // Autoplay can be blocked by the browser; the poster stays visible.
      });
    } else {
      element.pause();
    }
  }, [inView, shouldAutoPlay]);

  return (
    <video
      ref={ref}
      width={width}
      height={height}
      poster={poster}
      aria-label={label}
      muted={shouldAutoPlay || undefined}
      playsInline
      loop={loop}
      controls={controls || (!shouldAutoPlay && autoPlay)}
      preload="none"
      className={cn("h-auto w-full", className)}
    >
      {inView ? <source src={src} type={mimeType} /> : null}
    </video>
  );
}
