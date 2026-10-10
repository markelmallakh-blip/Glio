import { Hero } from "@/components/sections/home/Hero";
import { ServicesShowcase } from "@/components/sections/home/ServicesShowcase";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { AboutTeaser } from "@/components/sections/home/AboutTeaser";
import { WhyChoose } from "@/components/sections/home/WhyChoose";
import { MediaTeaser } from "@/components/sections/home/MediaTeaser";
import { RibbonDivider } from "@/components/sections/shared/RibbonDivider";
import { ValuesSection } from "@/components/sections/shared/ValuesSection";
import { Testimonials } from "@/components/sections/shared/Testimonials";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export const metadata = {
  ...pageMetadata({
    title: "Mobile Car Care in Cairo",
    description: siteConfig.description,
    path: "/",
  }),
  title: { absolute: siteConfig.title },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <RibbonDivider />
      <ServicesShowcase />
      <HowItWorks />
      <AboutTeaser />
      <WhyChoose />
      <ValuesSection />
      <Testimonials />
      <FaqSection limit={5} />
      <MediaTeaser />
      <CtaBanner />
    </>
  );
}
