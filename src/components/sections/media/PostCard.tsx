import Image from "next/image";
import Link from "next/link";
import { formatPostDate, type Post } from "@/content/posts";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const categoryTones = {
  Blog: "bg-lime text-ink",
  News: "bg-ink text-white",
  Event: "bg-success text-white",
};

export function PostCard({
  post,
  headingLevel = "h3",
}: {
  post: Post;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col rounded-[1.25rem] bg-white p-3">
      <div className="relative aspect-[390/271] overflow-hidden rounded-xl">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span
          className={cn(
            "absolute top-2 left-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold",
            categoryTones[post.category],
          )}
        >
          <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
          {post.category}
        </span>
      </div>
      <Heading className="mt-4 px-1 text-xl leading-snug font-display md:text-[1.375rem]">
        <Link
          href={`/media-center/${post.slug}`}
          className="after:absolute after:inset-0 after:rounded-[1.25rem]"
        >
          {post.title}
        </Link>
      </Heading>
      <div className="mt-auto flex items-center justify-between gap-3 px-1 pt-5">
        <p className="flex items-center gap-2 text-xs text-grey">
          <span>{post.readingMinutes} min read</span>
          <span aria-hidden="true">|</span>
          <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
        </p>
        <span className="flex items-center gap-2 text-base text-ink" aria-hidden="true">
          Read More
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-ink text-lime transition-transform group-hover:rotate-45">
            <Icon name="arrow-up-right" size={16} />
          </span>
        </span>
      </div>
    </article>
  );
}
