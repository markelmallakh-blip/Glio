import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/our-services". Used for the canonical URL. */
  path: string;
  image?: string;
  noIndex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  noIndex = false,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: path,
      images: [{ url: image }],
    },
    twitter: { title: `${title} | ${siteConfig.name}`, description, images: [image] },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}
