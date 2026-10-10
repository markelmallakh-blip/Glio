import Link from "next/link";
import { footerNav, legalNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { Marquee } from "@/components/sections/shared/Marquee";
import { NewsletterForm } from "@/components/sections/shared/NewsletterForm";
import { Container } from "./Container";

/** Evaluated at build time; a static page must not read the clock during render. */
const copyrightYear = new Date().getFullYear();

export function SiteFooter() {
  return (
    // Clip sideways only: the ribbon is centred on the footer's top edge so the tilt
    // never shows a wedge of footer above it, and it is wider than the screen so its
    // ends stay hidden. `.ribbon-clearance` on <main> keeps it off the content above.
    <footer className="relative flow-root overflow-x-clip bg-lime text-ink">
      <Marquee
        tone="white"
        tilt={-1.6}
        className="relative z-10 mx-[-5%] mt-[calc(var(--footer-ribbon-half)*-1)] mb-6 md:mb-10"
      />

      <Container className="flex flex-col gap-10 pb-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-10">
          <div className="flex flex-col gap-6">
            <nav aria-label="Footer" className="rounded-[1.25rem] bg-lime-pale p-5 md:px-6">
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-bold underline-offset-4 hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <li>
                <a href={siteConfig.contact.phoneHref} className="flex items-center gap-2">
                  <Icon name="phone" size={20} />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2">
                  <Icon name="mail" size={20} />
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>

            <ul className="flex gap-2">
              {siteConfig.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-10 items-center justify-center rounded-md bg-ink/10 transition-colors hover:bg-ink hover:text-lime"
                  >
                    <Icon name={item.icon} size={20} />
                    <span className="sr-only">GLIO on {item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.25rem] bg-ink p-6 text-white lg:w-[28rem] lg:p-8">
            <h2 className="text-2xl font-display">Join Our Newsletter</h2>
            <p className="mt-1 mb-5 text-sm text-white/85">For exclusive offers and updates</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Logo className="w-full text-ink" title="" />
          <p className="text-center text-base font-display md:text-xl">
            Professional mobile car care service operating in Cairo, Egypt.
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-ink/25 pt-4 text-xs text-grey sm:flex-row sm:items-center sm:justify-between">
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
