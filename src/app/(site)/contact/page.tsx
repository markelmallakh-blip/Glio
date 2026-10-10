import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { ContactForm } from "@/components/sections/shared/ContactForm";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Get in touch with the GLIO support team by phone, email or our contact form.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="bg-ink py-10 text-white md:py-16">
      <Container>
        <div className="relative isolate grid overflow-hidden rounded-[1.25rem] bg-ink-soft md:grid-cols-2">
          <div
            aria-hidden="true"
            className="absolute -top-1/3 -left-1/4 -z-10 size-[44rem] rounded-full bg-[radial-gradient(closest-side,rgb(196_216_71/0.65),transparent)]"
          />
          <div
            aria-hidden="true"
            className="absolute -right-1/4 -bottom-1/3 -z-10 size-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(196_216_71/0.45),transparent)]"
          />
          <div className="flex flex-col justify-between gap-12 p-6 md:p-12 md:pr-8">
            <div className="flex flex-col gap-3">
              <h1 className="animate-rise text-display font-display">Let’s Get in Touch</h1>
              <p className="max-w-sm animate-rise text-white/85 [--delay:120ms]">
                Our support team is here to help. Contact us for personalized assistance.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-display">Reach Us</h2>
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center gap-2 hover:text-lime"
                  >
                    <Icon name="mail" className="text-lime" />
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="flex items-center gap-2 hover:text-lime"
                  >
                    <Icon name="phone" className="text-lime" />
                    {siteConfig.contact.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t border-white/10 p-6 md:border-t-0 md:border-l md:p-12 md:pl-8">
            <h2 className="text-3xl font-display">Send Us A Message</h2>
            <p className="text-white/80">
              Our support team is here to help. Contact us for personalized assistance.
            </p>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
