import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPostDate, getPost, posts } from "@/content/posts";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Choice";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PostCard } from "@/components/sections/media/PostCard";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/media-center/${post.slug}`,
    image: post.image.src,
  });
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt,
    image: `${siteConfig.url}${post.image.src}`,
    publisher: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD built from static, trusted content; `<` is escaped.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="bg-ink py-10 text-white md:py-14">
        <Container className="flex flex-col gap-5">
          <Link
            href="/media-center"
            className="flex w-fit items-center gap-2 text-sm text-white/80 hover:text-lime"
          >
            <Icon name="arrow-left" size={18} />
            Back to Media Center
          </Link>
          <h1 className="max-w-4xl text-display font-display text-balance">{post.title}</h1>
          <p className="flex flex-wrap items-center gap-3 text-sm text-white/80">
            <Badge>{post.category}</Badge>
            <span>{post.readingMinutes} min read</span>
            <span aria-hidden="true">|</span>
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          </p>
        </Container>
      </section>

      <article className="bg-white py-10 md:py-16">
        <Container className="flex flex-col gap-10">
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              fill
              preload
              sizes="(min-width: 1512px) 1392px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mx-auto flex max-w-3xl flex-col gap-8">
            <p className="text-lg leading-relaxed">{post.excerpt}</p>
            {post.body.map((block, index) => (
              <div key={block.heading ?? index} className="flex flex-col gap-3">
                {block.heading ? <h2 className="text-h4 font-display">{block.heading}</h2> : null}
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="leading-relaxed text-grey">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
            <Button href="/booking" className="w-fit">
              Book GLIO Now
            </Button>
          </div>
        </Container>
      </article>

      <section aria-labelledby="read-also" className="bg-surface-strong py-14 md:py-20">
        <Container size="narrow" className="flex flex-col gap-8">
          <h2 id="read-also" className="text-center text-h2 font-display">
            Read Also
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <PostCard post={item} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
