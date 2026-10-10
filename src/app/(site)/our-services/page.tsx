import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ServiceDetail } from "@/components/sections/services/ServiceDetail";
import { Testimonials } from "@/components/sections/shared/Testimonials";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";

export const metadata = pageMetadata({
  title: "Our Services",
  description:
    "Six mobile car care packages from a 60 minute Regular wash to 8 hour Elite full detailing. Prices are per car and you can book as many cars as you like in one visit.",
  path: "/our-services",
});

export default function OurServicesPage() {
  return (
    <>
      <PageHero
        tone="lime"
        eyebrow="Our Services"
        title="Professional Car Care, Delivered to You"
        description="A complete range of on-site services designed to keep your car clean, protected, and looking its best. Add as many cars as you like and choose a package for each one."
      />
      {services.map((service, index) => (
        <ServiceDetail key={service.slug} service={service} reversed={index % 2 === 1} />
      ))}
      <Testimonials />
      <FaqSection limit={5} />
      <CtaBanner />
    </>
  );
}
