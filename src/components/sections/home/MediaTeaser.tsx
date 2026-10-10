import { posts } from "@/content/posts";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { PostCard } from "@/components/sections/media/PostCard";

export function MediaTeaser() {
  return (
    <section aria-labelledby="media" className="bg-surface-strong py-16 md:py-24 lg:py-[6.25rem]">
      <Container size="narrow" className="flex flex-col items-center gap-10">
        <SectionHeading id="media" eyebrow="Stay Updated" title="GLIO Media Center" />
        <ul className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Reveal delay={index * 0.08} className="h-full">
                <PostCard post={post} />
              </Reveal>
            </li>
          ))}
        </ul>
        <Button href="/media-center" variant="outline-dark">
          Explore All
        </Button>
      </Container>
    </section>
  );
}
