"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { type Testimonial } from "@/content/marketing";
import { Icon } from "@/components/ui/Icon";

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [[index, direction], setState] = useState<[number, 1 | -1]>([0, 1]);
  const reduce = useReducedMotion();
  const item = items[index];

  function go(step: 1 | -1) {
    setState(([current]) => [(current + step + items.length) % items.length, step]);
  }

  const offset = reduce ? 0 : 60;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      className="flex flex-col items-center gap-10"
    >
      <div className="relative w-full max-w-[64rem]">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.figure
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * offset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -offset }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${items.length}`}
            className="grid gap-4 md:grid-cols-[2fr_3fr]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] md:aspect-auto md:min-h-[26rem]">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 768px) 400px, 100vw"
                className="object-cover"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                {item.service}
              </span>
            </div>
            <div className="flex flex-col justify-between gap-10 rounded-[2rem] bg-lime p-6 md:p-8">
              <blockquote className="text-lg leading-relaxed md:text-xl">“{item.quote}”</blockquote>
              <figcaption className="text-sm font-semibold">{item.name}</figcaption>
            </div>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          className="inline-flex size-11 items-center justify-center rounded-md bg-ink text-white transition-colors hover:bg-ink-soft"
        >
          <Icon name="arrow-left" size={22} />
          <span className="sr-only">Previous testimonial</span>
        </button>
        <p className="min-w-12 text-center text-sm font-semibold text-grey" aria-live="polite">
          {index + 1} / {items.length}
        </p>
        <button
          type="button"
          onClick={() => go(1)}
          className="inline-flex size-11 items-center justify-center rounded-md bg-ink text-white transition-colors hover:bg-ink-soft"
        >
          <Icon name="arrow-right" size={22} />
          <span className="sr-only">Next testimonial</span>
        </button>
      </div>
    </div>
  );
}
