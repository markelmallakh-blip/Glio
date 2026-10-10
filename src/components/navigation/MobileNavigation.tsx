"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/config/navigation";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useAppState } from "@/lib/store/app-store";
import { openAuthDialog } from "@/lib/store/auth-dialog";
import { cn } from "@/lib/utils";
import { isActivePath } from "./NavLinks";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const signedIn = useAppState((s) => Boolean(s.session));
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Closing on navigation: the menu stays open only for the page it was opened on.
  const isOpen = open && openedAt === pathname;

  useEffect(() => {
    if (!isOpen) return;
    const trigger = triggerRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => {
          setOpenedAt(pathname);
          setOpen(true);
        }}
        className="inline-flex size-11 items-center justify-center rounded-full bg-ink-soft text-white lg:hidden"
      >
        <Icon name="menu" />
        <span className="sr-only">Open menu</span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={reduce ? false : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-ink px-4 pt-6 pb-10 text-white sm:px-6"
          >
            <div className="flex items-center justify-between">
              <Link href="/" className="text-lime" onClick={() => setOpen(false)}>
                <Logo className="w-32" />
              </Link>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-11 items-center justify-center rounded-full bg-ink-soft"
              >
                <Icon name="close" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-10 flex-1">
              <ul className="flex flex-col gap-2">
                {[{ label: "Home", href: "/" }, ...mainNav].map((item, index) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={reduce ? false : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index + 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block py-2 text-4xl font-display",
                          active ? "text-lime" : "text-white",
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex flex-col gap-3">
              {signedIn ? (
                <Button
                  href="/account"
                  variant="outline-light"
                  icon={null}
                  leadingIcon="user"
                  onClick={() => setOpen(false)}
                >
                  My Account
                </Button>
              ) : (
                <Button
                  variant="outline-light"
                  icon={null}
                  onClick={() => {
                    setOpen(false);
                    openAuthDialog();
                  }}
                >
                  Login
                </Button>
              )}
              <Button href="/booking" onClick={() => setOpen(false)}>
                Book Now
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
