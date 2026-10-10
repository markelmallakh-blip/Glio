import type { NextConfig } from "next";

/**
 * `GITHUB_PAGES=true next build` produces a static export for GitHub Pages, served
 * from https://markelmallakh-blip.github.io/Glio. Local dev and normal builds are unchanged.
 */
const githubPages = process.env.GITHUB_PAGES === "true";
const basePath = githubPages ? "/Glio" : "";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
];

const nextConfig: NextConfig = {
  // Cache Components needs a Next server; the static export renders everything at build time.
  cacheComponents: !githubPages,
  partialPrefetching: !githubPages,
  poweredByHeader: false,
  // robots.ts and sitemap.ts (the only `.ts` routes) only make sense at a domain root,
  // and a static export can't build them alongside Cache Components, so the GitHub
  // Pages build only picks up `.tsx` routes.
  ...(githubPages ? { pageExtensions: ["tsx"] } : {}),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: githubPages
    ? // Static hosting has no image optimizer; the loader only adds the base path.
      { loader: "custom", loaderFile: "./src/lib/image-loader.ts" }
    : { formats: ["image/avif", "image/webp"] },
  ...(githubPages
    ? { output: "export", basePath, trailingSlash: true }
    : {
        // Static exports can't send headers, so these only apply when served by Next.
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
