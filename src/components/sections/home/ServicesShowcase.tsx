import { services } from "@/content/services";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { ServiceCard } from "@/components/sections/services/ServiceCard";

export function ServicesShowcase() {
  return (
    <Section id="services" className="pt-24 md:pt-36">
      <Container className="flex flex-col gap-12 md:gap-16">
        <SectionHeading
          eyebrow="Book GLIO Now"
          title="Our Services"
          description="A full range of professional services to keep your car looking its best. Book all your cars in the same visit."
        />
        <ul className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-6">
          {services.map((service, index) => (
            <li key={service.slug}>
              <Reveal delay={(index % 3) * 0.08} className="h-full">
                <ServiceCard service={service} />
              </Reveal>
            </li>
          ))}
        </ul>
        <Button href="/booking" size="lg" className="self-center">
          Book GLIO Now
        </Button>
      </Container>
    </Section>
  );
}
