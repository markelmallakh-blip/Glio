type MediaBase = {
  /** Accessible description. Leave empty for decorative media. */
  alt: string;
  width: number;
  height: number;
};

export type ImageAsset = MediaBase & {
  type: "image";
  src: string;
};

export type VideoAsset = MediaBase & {
  type: "video";
  src: string;
  /** Poster image shown before playback and when motion is reduced. */
  poster?: string;
  mimeType?: "video/mp4" | "video/webm";
};

export type MediaAsset = ImageAsset | VideoAsset;
