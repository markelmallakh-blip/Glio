import Image from "next/image";
import { howItWorks } from "@/content/marketing";
import { Container } from "@/components/layout/Container";
import { StaggerOnScroll } from "@/components/animations/StaggerOnScroll";

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works" className="bg-white py-6 md:py-8">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[1.5rem] bg-lime px-5 pt-10 pb-0 md:px-10 md:pt-12 lg:min-h-[48rem] lg:pb-12">
          <div className="flex flex-col gap-8 lg:max-w-[28rem]">
            <h2 id="how-it-works" className="text-h2 font-display">
              How It Works
            </h2>
            <StaggerOnScroll as="ol" className="flex flex-col gap-4">
              {howItWorks.map((step, index) => (
                <li
                  key={step.title}
                  data-stagger
                  className="flex gap-4 rounded-2xl bg-white p-5 shadow-[0_1px_0_rgb(0_0_0/0.04)]"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-lime text-lg font-display">
                    {index + 1}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-display md:text-[1.375rem]">{step.title}</h3>
                    <p className="text-grey">{step.description}</p>
                  </div>
                </li>
              ))}
            </StaggerOnScroll>
          </div>
          <div className="relative mx-auto mt-6 aspect-[2/3] w-full max-w-[24rem] lg:absolute lg:right-[8%] lg:bottom-0 lg:mt-0 lg:w-[34%] lg:max-w-[32rem]">
            <Image
              src="/images/technician.webp"
              alt="Smiling GLIO technician holding a spray bottle and a wash mitt"
              fill
              sizes="(min-width: 1024px) 34vw, 384px"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
