"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, type ReactNode } from "react";
import { accountNav } from "@/config/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Choice";
import { Icon } from "@/components/ui/Icon";
import { formatPoints } from "@/content/loyalty";
import { useCountUp } from "@/hooks/useCountUp";
import { appActions, useAppState, useStoreReady } from "@/lib/store/app-store";
import { openAuthDialog } from "@/lib/store/auth-dialog";
import { useWalletSpotlight } from "@/lib/store/wallet-spotlight";
import { cn, formatEGP } from "@/lib/utils";
import { WalletSpotlight } from "./WalletSpotlight";

/** Live balance on the wallet tab; counts up while the redeem spotlight runs. */
function WalletBadge({ balance }: { balance: number }) {
  const spotlight = useWalletSpotlight();
  const value = useCountUp(balance, spotlight ? spotlight.from : null);
  if (balance <= 0 && !spotlight) return null;
  return (
    <span className="ml-auto rounded-full bg-ink px-2 py-0.5 text-xs font-bold text-lime tabular-nums">
      {formatEGP(value)}
    </span>
  );
}

/** Sidebar layout + sign-in gate for every /account page. */
export function AccountShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const ready = useStoreReady();
  const profile = useAppState((s) => (s.session ? s.profile : null));
  const loyalty = useAppState((s) => (s.session ? s.loyalty : null));
  const spotlight = useWalletSpotlight();
  const walletRef = useRef<HTMLAnchorElement>(null);

  return (
    <section className="bg-ink py-8 md:py-12">
      <Container className="grid gap-5 lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start lg:gap-6">
        <aside className="rounded-[1.25rem] bg-white p-4 md:p-5 lg:sticky lg:top-28">
          <div className="flex items-center justify-between gap-2 border-b border-line-soft pb-4">
            <p className="truncate text-2xl font-display">
              Hello{profile?.firstName ? `, ${profile.firstName}` : ""}
            </p>
            {profile && !profile.firstName ? (
              <Link href="/account">
                <Badge tone="soft" className="bg-warning-soft text-warning">
                  Complete Profile
                </Badge>
              </Link>
            ) : null}
          </div>
          <nav aria-label="Account" className="py-3">
            <ul className="flex gap-1 overflow-x-auto lg:flex-col">
              {accountNav.map((item) => {
                const active = pathname === item.href;
                const isWallet = item.href === "/account/wallet";
                const lit = isWallet && spotlight !== null;
                return (
                  <li key={item.href} className="shrink-0">
                    <Link
                      ref={isWallet ? walletRef : undefined}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-base font-semibold transition-colors",
                        active || lit
                          ? "bg-lime text-ink"
                          : "text-grey hover:bg-surface hover:text-ink",
                      )}
                    >
                      <Icon name={item.icon} size={22} />
                      {item.label}
                      {isWallet && loyalty ? <WalletBadge balance={loyalty.wallet} /> : null}
                      {item.href === "/account/points" && loyalty && loyalty.points > 0 ? (
                        <span className="ml-auto rounded-full bg-surface px-2 py-0.5 text-xs font-bold text-ink tabular-nums">
                          {formatPoints(loyalty.points)}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          {profile ? (
            <button
              type="button"
              onClick={() => {
                appActions.logout();
                router.push("/");
              }}
              className="flex w-full items-center gap-2 border-t border-line-soft px-3 pt-4 text-sm text-grey hover:text-ink"
            >
              <Icon name="logout" size={18} />
              Logout
            </button>
          ) : null}
        </aside>
        <WalletSpotlight targetRef={walletRef} />

        <div className="min-h-[24rem] rounded-[1.25rem] bg-white p-5 md:p-8">
          {!ready ? (
            <div aria-busy="true" className="flex flex-col gap-4">
              <div className="h-10 w-48 animate-pulse rounded-lg bg-surface" />
              <div className="h-32 animate-pulse rounded-2xl bg-surface" />
            </div>
          ) : profile ? (
            children
          ) : (
            <div className="flex flex-col items-start gap-4">
              <h1 className="text-h3 font-display">Log in to your account</h1>
              <p className="max-w-md text-grey">
                Manage your bookings, saved cars and addresses. We’ll send a one-time code to your
                phone.
              </p>
              <Button variant="dark" icon={null} onClick={() => openAuthDialog()}>
                Log in
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
