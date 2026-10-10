import { posts } from "@/content/posts";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/sections/shared/PageHero";
import { PostGrid } from "@/components/sections/media/PostGrid";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";

export const metadata = pageMetadata({
  title: "Media Center",
  description: "News, tips and events from GLIO, Cairo's mobile car care service.",
  path: "/media-center",
});

export default function MediaCenterPage() {
  return (
    <>
      <PageHero eyebrow="Stay Updated" title="Media Center" />
      <section aria-label="Posts" className="bg-surface-strong py-12 md:py-20">
        <Container size="narrow">
          <PostGrid posts={posts} />
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
