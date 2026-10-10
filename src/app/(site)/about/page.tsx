import { aboutContent } from "@/content/marketing";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/shared/PageHero";
import { AboutHeroGallery } from "@/components/sections/about/AboutHeroGallery";
import { WhoWeAre } from "@/components/sections/about/WhoWeAre";
import { MissionVision } from "@/components/sections/about/MissionVision";
import { ValuesSection } from "@/components/sections/shared/ValuesSection";
import { Testimonials } from "@/components/sections/shared/Testimonials";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";

export const metadata = pageMetadata({
  title: "About Us",
  description: aboutContent.intro,
  path: "/about",
  image: "/images/about/van-city.webp",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        tone="lime"
        eyebrow="About GLIO"
        title="A Smarter Way to Care for Your Car"
        description={aboutContent.intro}
        className="pb-14"
      >
        <AboutHeroGallery />
      </PageHero>
      <WhoWeAre />
      <MissionVision />
      <ValuesSection />
      <Testimonials />
      <FaqSection limit={5} />
      <CtaBanner />
    </>
  );
}
