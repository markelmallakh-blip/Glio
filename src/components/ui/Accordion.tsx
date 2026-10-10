"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

export type AccordionItem = { id: string; title: string; content: ReactNode };

type AccordionProps = {
  items: AccordionItem[];
  /** Index opened on first render. */
  defaultOpen?: number;
  className?: string;
};

export function Accordion({ items, defaultOpen = -1, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[defaultOpen]?.id ?? null);
  const baseId = useId();
  const reduce = useReducedMotion();

  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => {
        const open = openId === item.id;
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <li key={item.id} className="rounded-xl bg-white shadow-card">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold md:px-8 md:text-lg"
              >
                {item.title}
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-lime">
                  <Icon name={open ? "minus" : "plus"} size={16} strokeWidth={2.2} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-3 px-5 pb-5 text-sm leading-relaxed text-grey md:px-8 md:text-base">
                    {item.content}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
