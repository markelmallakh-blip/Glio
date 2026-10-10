"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { LoyaltyIcon } from "@/components/loyalty/LoyaltyIcon";
import { useIsClient } from "@/hooks/useIsClient";
import { endWalletSpotlight, useWalletSpotlight } from "@/lib/store/wallet-spotlight";
import { formatEGP } from "@/lib/utils";

/** How long the page stays dimmed around the wallet tab. */
const DURATION_MS = 3000;
const PADDING = 6;
const CALLOUT_WIDTH = 288;

type Rect = { top: number; left: number; width: number; height: number };

/**
 * Dims the whole page for a few seconds except the wallet tab, so the customer
 * sees where their redeemed points went. Click anywhere or press Escape to skip.
 */
export function WalletSpotlight({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const spotlight = useWalletSpotlight();
  const reduce = useReducedMotion();
  const isClient = useIsClient();
  const [rect, setRect] = useState<Rect | null>(null);

  useEffect(() => {
    if (!spotlight) return;
    const target = targetRef.current;
    target?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });

    // Follow the tab while the page scrolls it into view.
    let frame = 0;
    const track = () => {
      const box = targetRef.current?.getBoundingClientRect();
      if (box) setRect({ top: box.top, left: box.left, width: box.width, height: box.height });
      frame = requestAnimationFrame(track);
    };
    frame = requestAnimationFrame(track);

    const timer = window.setTimeout(endWalletSpotlight, DURATION_MS);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") endWalletSpotlight();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [spotlight, targetRef, reduce]);

  if (!isClient) return null;

  const viewportWidth = typeof window === "undefined" ? 0 : window.innerWidth;
  const calloutLeft = rect
    ? Math.max(16, Math.min(rect.left - PADDING, viewportWidth - CALLOUT_WIDTH - 16))
    : 0;

  return createPortal(
    <>
      <p role="status" className="sr-only">
        {spotlight ? `${formatEGP(spotlight.amount)} added to your wallet.` : ""}
      </p>
      <AnimatePresence>
        {spotlight && rect ? (
          <motion.div
            key={spotlight.id}
            className="fixed inset-0 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={endWalletSpotlight}
            aria-hidden="true"
          >
            {/* The hole: a huge shadow darkens everything around the wallet tab. */}
            <div
              className="pointer-events-none fixed rounded-xl ring-2 ring-lime"
              style={{
                top: rect.top - PADDING,
                left: rect.left - PADDING,
                width: rect.width + PADDING * 2,
                height: rect.height + PADDING * 2,
                boxShadow: "0 0 0 200vmax rgb(0 0 0 / 0.82), 0 0 32px 4px rgb(231 254 84 / 0.55)",
              }}
            />
            <motion.div
              className="fixed flex items-center gap-3 rounded-2xl bg-white p-3 pr-4 text-ink shadow-float"
              style={{
                top: rect.top + rect.height + PADDING + 12,
                left: calloutLeft,
                width: CALLOUT_WIDTH,
              }}
              initial={reduce ? false : { opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: reduce ? 0 : 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <LoyaltyIcon name="wallet" size={48} />
              <p className="text-sm">
                <span className="block text-lg leading-tight font-display">
                  +{formatEGP(spotlight.amount)} in your wallet
                </span>
                <span className="text-grey">Use it on your next booking.</span>
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>,
    document.body,
  );
}
