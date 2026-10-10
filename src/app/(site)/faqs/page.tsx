import { faqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { Accordion } from "@/components/ui/Accordion";
import { PageHero } from "@/components/sections/shared/PageHero";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about GLIO mobile car care: booking several cars in one visit, products we use, water and electricity, rescheduling and more.",
  path: "/faqs",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer.join(" ") },
  })),
};

export default function FaqsPage() {
  const items = faqs.map((faq, index) => ({
    id: `faq-${index}`,
    title: faq.question,
    content: faq.answer.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>),
  }));

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD built from static, trusted content; JSON.stringify escapes values.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHero eyebrow="Have A Question?" title="Frequently Asked Questions" />
      <section aria-label="Questions" className="bg-surface py-12 md:py-20">
        <Container size="narrow">
          <Accordion items={items} defaultOpen={0} />
        </Container>
      </section>
      <CtaBanner
        title="Still Have Questions?"
        description="Our support team is here to help. Contact us for personalized assistance."
        cta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
