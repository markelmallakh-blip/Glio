/**
 * Image loader for the GitHub Pages export. There is no optimizer on static hosting,
 * so local images are served as-is with the site's base path in front. Blob, data and
 * remote URLs pass through untouched. `width` is ignored on purpose.
 */
export default function imageLoader({ src }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("/")) return src;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
