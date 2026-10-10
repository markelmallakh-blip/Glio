import Image from "next/image";
import { type MediaAsset } from "@/types/media";
import { cn } from "@/lib/utils";
import { Video } from "./Video";

type MediaProps = {
  asset: MediaAsset;
  /** Responsive `sizes` hint for images. Required for correct srcset selection. */
  sizes?: string;
  /** Only for above-the-fold media. */
  priority?: boolean;
  /** Fill the parent box (parent must be positioned with a defined size). */
  fill?: boolean;
  className?: string;
  /** Video-only playback options. */
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
};

/**
 * Single entry point for rendering images or videos. Swapping a placeholder
 * photo for a video only changes the asset passed in, not the layout.
 */
export function Media({
  asset,
  sizes = "100vw",
  priority = false,
  fill = false,
  className,
  autoPlay,
  loop,
  controls,
}: MediaProps) {
  if (asset.type === "video") {
    return (
      <Video
        src={asset.src}
        poster={asset.poster}
        mimeType={asset.mimeType}
        label={asset.alt}
        width={asset.width}
        height={asset.height}
        autoPlay={autoPlay}
        loop={loop}
        controls={controls}
        className={cn(fill && "absolute inset-0 size-full object-cover", className)}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        sizes={sizes}
        preload={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      sizes={sizes}
      preload={priority}
      className={cn("h-auto w-full", className)}
    />
  );
}
