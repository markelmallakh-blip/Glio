import Image from "next/image";
import { aboutContent } from "@/content/marketing";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";

const blocks = [
  {
    id: "mission",
    title: "Our Mission",
    text: aboutContent.mission,
    image: { src: "/images/about/team.webp", alt: "Three GLIO technicians standing by the van" },
  },
  {
    id: "vision",
    title: "Our Vision",
    text: aboutContent.vision,
    image: { src: "/images/about/mission.webp", alt: "GLIO technician finishing a car's exterior" },
  },
];

export function MissionVision() {
  return (
    <section aria-label="Mission and vision" className="bg-white py-16 md:py-24">
      <Container className="flex flex-col gap-6">
        {blocks.map((block, index) => (
          <div key={block.id} className="grid gap-3 md:grid-cols-2">
            <Reveal
              className={`flex min-h-[18rem] flex-col justify-between gap-8 rounded-[1.875rem] p-6 md:min-h-[34rem] md:p-8 ${
                index === 0 ? "bg-lime" : "bg-ink text-white md:order-2"
              }`}
            >
              <h2 className="text-h2 font-display">{block.title}</h2>
              <p className="max-w-lg text-base md:text-lg">{block.text}</p>
            </Reveal>
            <Reveal
              delay={0.1}
              className="relative min-h-[18rem] overflow-hidden rounded-[1.875rem]"
            >
              <Image
                src={block.image.src}
                alt={block.image.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        ))}
      </Container>
    </section>
  );
}
