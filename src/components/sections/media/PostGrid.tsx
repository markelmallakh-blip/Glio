"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { type Post, type PostCategory } from "@/content/posts";
import { cn } from "@/lib/utils";
import { PostCard } from "./PostCard";

const filters: ("All" | PostCategory)[] = ["All", "Blog", "News", "Event"];

export function PostGrid({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const reduce = useReducedMotion();
  const visible = filter === "All" ? posts : posts.filter((post) => post.category === filter);

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Filter posts" className="flex flex-wrap justify-center gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-bold transition-colors",
              filter === item
                ? "border-ink bg-ink text-lime"
                : "border-ink/20 bg-white text-ink hover:border-ink",
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <motion.ul layout={!reduce} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((post) => (
            <motion.li
              key={post.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <PostCard post={post} headingLevel="h2" />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {visible.length === 0 ? (
        <p className="text-center text-grey">No posts in this category yet.</p>
      ) : null}
    </div>
  );
}
