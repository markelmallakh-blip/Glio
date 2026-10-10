import Image from "next/image";
import { features } from "@/content/marketing";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { StaggerOnScroll } from "@/components/animations/StaggerOnScroll";

export function WhyChoose() {
  return (
    <section
      aria-labelledby="why-glio"
      className="relative isolate flex min-h-[44rem] flex-col justify-between gap-10 overflow-hidden p-4 sm:p-6 lg:min-h-[57.5rem] lg:p-8"
    >
      <Image
        src="/images/why-team.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[60%_center]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/35" />

      <div className="flex w-fit flex-col gap-2 rounded-2xl bg-white p-5 md:p-6">
        <Eyebrow>Our Key Features</Eyebrow>
        <h2 id="why-glio" className="text-h2 font-display">
          Why Choose GLIO?
        </h2>
      </div>

      <StaggerOnScroll
        as="ul"
        from={{ y: 40 }}
        className="grid gap-2 self-end sm:grid-cols-2 lg:w-[53rem]"
      >
        {features.map((feature) => (
          <li
            key={feature.title}
            data-stagger
            className="flex flex-col gap-4 rounded-2xl bg-white/10 p-4 text-white backdrop-blur-[31px] md:p-5"
          >
            <Icon name={feature.icon} size={40} className="text-lime" strokeWidth={1.3} />
            <p className="text-2xl leading-tight font-display md:text-[2rem]">{feature.title}</p>
          </li>
        ))}
      </StaggerOnScroll>
    </section>
  );
}
