"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/Button";
import { useAppState, useStoreReady } from "@/lib/store/app-store";
import { openAuthDialog } from "@/lib/store/auth-dialog";
import { cn } from "@/lib/utils";

/** Login button for guests, account shortcut for signed-in users. */
export function HeaderAccount({ className }: { className?: string }) {
  const ready = useStoreReady();
  const profile = useAppState((s) => (s.session ? s.profile : null));

  if (ready && profile) {
    const name = profile.firstName || "My Account";
    return (
      <Link
        href="/account"
        className={cn(
          buttonClasses({ variant: "outline-light", size: "sm" }),
          "max-w-40 gap-2",
          className,
        )}
      >
        <Icon name="user" size={16} />
        <span className="truncate">{name}</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => openAuthDialog()}
      className={cn(buttonClasses({ variant: "outline-light", size: "sm" }), className)}
    >
      Login
    </button>
  );
}
