import { Container } from "@/components/layout/Container";
import { Sparkle } from "@/components/brand/Sparkle";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";

type CtaBannerProps = {
  title?: string;
  description?: string;
  cta?: { label: string; href: string };
};

export function CtaBanner({
  title = "Ready to Get Started?",
  description = "Book your professional car care service now and experience the convenience of mobile detailing at your location.",
  cta = { label: "Book Now", href: "/booking" },
}: CtaBannerProps) {
  return (
    <section className="bg-ink pt-16 pb-28 md:pt-[7.5rem] md:pb-40">
      <Container size="narrow">
        <Reveal className="relative isolate overflow-hidden rounded-3xl bg-lime px-6 py-10 md:px-12 md:py-14">
          <Sparkle className="absolute top-6 -left-24 -z-10 w-72 text-lime-strong md:top-8 md:-left-6 md:w-[24rem]" />
          <div className="ml-auto flex max-w-md flex-col gap-4">
            <h2 className="text-h3 font-display md:text-[3.25rem] md:leading-[1.15]">{title}</h2>
            <p className="text-base md:text-lg">{description}</p>
            <Button href={cta.href} variant="dark" className="w-fit">
              {cta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
