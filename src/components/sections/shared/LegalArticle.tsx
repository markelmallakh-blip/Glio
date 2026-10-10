import { type LegalDocument } from "@/content/legal";
import { Container } from "@/components/layout/Container";
import { PageHero } from "./PageHero";

export function LegalArticle({ document }: { document: LegalDocument }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={document.title} />
      <section className="bg-white py-12 md:py-20">
        <Container size="prose" className="flex flex-col gap-10">
          <p className="text-lg leading-relaxed">{document.intro}</p>
          <ol className="flex flex-col gap-8">
            {document.sections.map((section, index) => (
              <li key={section.heading} className="flex flex-col gap-3">
                <h2 className="text-2xl font-display md:text-[1.75rem]">
                  {index + 1}. {section.heading}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="leading-relaxed text-grey">
                    {paragraph}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="flex list-disc flex-col gap-1.5 pl-5 text-grey marker:text-lime-strong">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {section.after?.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="leading-relaxed text-grey">
                    {paragraph}
                  </p>
                ))}
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
