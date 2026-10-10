import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { posts } from "@/content/posts";

const staticRoutes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/our-services", priority: 0.9 },
  { path: "/booking", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/faqs", priority: 0.6 },
  { path: "/media-center", priority: 0.6 },
  { path: "/contact", priority: 0.5 },
  { path: "/privacy-policy", priority: 0.2 },
  { path: "/terms-and-conditions", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: `${siteConfig.url}${path}`,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/media-center/${post.slug}`,
      lastModified: new Date(`${post.publishedAt}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
