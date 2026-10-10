import Image from "next/image";
import { type CSSProperties } from "react";
import { cn } from "@/lib/utils";

const images = [
  {
    src: "/images/about/van-city.webp",
    alt: "GLIO van parked on a Cairo street",
    className: "hidden aspect-[348/450] md:block md:translate-y-10",
  },
  {
    src: "/images/media/trunk.webp",
    alt: "GLIO equipment neatly packed in an SUV trunk",
    className: "aspect-[610/546]",
  },
  {
    src: "/images/about/interior.webp",
    alt: "GLIO technician detailing a car interior",
    className: "hidden aspect-[348/450] md:block md:translate-y-10",
  },
];

export function AboutHeroGallery() {
  return (
    <div className="mt-6 grid w-full grid-cols-1 items-start gap-3 md:mt-10 md:grid-cols-[1fr_1.75fr_1fr] md:gap-4">
      {images.map((image, index) => (
        <div
          key={image.src}
          className={cn("relative animate-rise overflow-hidden rounded-[2rem]", image.className)}
          style={{ "--delay": `${200 + index * 120}ms` } as CSSProperties}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload={index === 1}
            sizes={index === 1 ? "(min-width: 768px) 45vw, 100vw" : "25vw"}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
