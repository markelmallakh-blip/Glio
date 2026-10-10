import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { HeaderAccount } from "@/components/navigation/HeaderAccount";
import { Container } from "./Container";

/** Focused header for the booking funnel: no main navigation to distract. */
export function BookingHeader() {
  return (
    <header className="border-b border-white/5 bg-ink text-white">
      <Container className="grid h-[4.5rem] grid-cols-[1fr_auto_1fr] items-center lg:h-[6.125rem]">
        <Link
          href="/"
          className="flex w-fit items-center gap-2 text-sm font-semibold text-white/80 hover:text-lime"
        >
          <Icon name="arrow-left" size={18} />
          <span className="hidden sm:inline">Back to site</span>
          <span className="sr-only sm:hidden">Back to site</span>
        </Link>
        <Link href="/" className="text-lime" aria-label="GLIO home">
          <Logo className="w-28 sm:w-40 lg:w-[12.5rem]" title="" />
        </Link>
        <div className="flex justify-end">
          <HeaderAccount />
        </div>
      </Container>
    </header>
  );
}
