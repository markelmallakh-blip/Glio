import Link from "next/link";
import { mainNav } from "@/config/navigation";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { HeaderAccount } from "@/components/navigation/HeaderAccount";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { NavLinks } from "@/components/navigation/NavLinks";
import { Container } from "./Container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink text-white">
      <Container className="flex h-[4.5rem] items-center justify-between gap-4 lg:h-[6.125rem]">
        <Link href="/" className="text-lime transition-opacity hover:opacity-85">
          <Logo className="w-28 sm:w-36 lg:w-[11.5rem] xl:w-[14.625rem]" />
        </Link>

        <nav aria-label="Main" className="hidden rounded-full bg-ink-soft px-3 py-2 lg:block">
          <NavLinks items={mainNav} />
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <HeaderAccount className="hidden sm:inline-flex" />
          <Button href="/booking" size="sm" className="hidden sm:inline-flex">
            Book Now
          </Button>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
