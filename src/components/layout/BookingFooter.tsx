import Link from "next/link";
import { legalNav } from "@/config/navigation";
import { Logo } from "@/components/brand/Logo";
import { Container } from "./Container";

const copyrightYear = new Date().getFullYear();

export function BookingFooter() {
  return (
    <footer className="bg-lime pt-10 text-ink md:pt-14">
      <Container className="flex flex-col items-center gap-4 pb-6">
        <Logo className="w-full" title="" />
        <p className="text-center font-display md:text-xl">
          Professional mobile car care service operating in Cairo, Egypt.
        </p>
        <div className="flex w-full flex-col items-center justify-between gap-2 border-t border-ink/25 pt-4 text-xs text-grey sm:flex-row">
          <p>© {copyrightYear} GLIO. All rights reserved.</p>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
