import { testimonials } from "@/content/marketing";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCarousel } from "./TestimonialCarousel";

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials"
      className="overflow-hidden bg-white py-16 md:py-24 lg:py-[6.25rem]"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="testimonials"
          eyebrow="What Our Customers Say"
          title="Trusted by Car Owners Across Cairo"
          description="Real experiences from people who chose professional car care at their location."
        />
        <TestimonialCarousel items={testimonials} />
      </Container>
    </section>
  );
}
