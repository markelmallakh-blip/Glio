import { faqs } from "@/content/faqs";
import { Container } from "@/components/layout/Container";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FaqSectionProps = {
  /** Limit the number of questions; the full list lives on /faqs. */
  limit?: number;
  showMoreLink?: boolean;
  headingAs?: "h1" | "h2";
};

export function FaqSection({ limit, showMoreLink = true, headingAs = "h2" }: FaqSectionProps) {
  const items = (limit ? faqs.slice(0, limit) : faqs).map((faq, index) => ({
    id: `faq-${index}`,
    title: faq.question,
    content: faq.answer.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>),
  }));

  return (
    <section aria-labelledby="faqs" className="bg-surface py-14 md:py-16">
      <Container size="narrow" className="flex flex-col items-center gap-8">
        <SectionHeading
          id="faqs"
          as={headingAs}
          eyebrow="Need Help?"
          title="Frequently Asked Questions"
        />
        <Accordion items={items} defaultOpen={0} className="w-full" />
        {showMoreLink ? (
          <Button href="/faqs" variant="outline-dark">
            Explore All FAQs
          </Button>
        ) : null}
      </Container>
    </section>
  );
}
