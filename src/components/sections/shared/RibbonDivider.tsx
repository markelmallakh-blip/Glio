import { Marquee } from "./Marquee";

/** Two crossing ribbons between the hero and the next section. */
export function RibbonDivider() {
  return (
    <div className="relative z-10 -mt-6 -mb-16 h-28 overflow-hidden md:-mt-10 md:-mb-24 md:h-36">
      <Marquee tone="lime" tilt={-2.2} reverse className="absolute inset-x-[-5%] top-4" />
      <Marquee tone="dark" className="absolute inset-x-0 top-12 md:top-16" />
    </div>
  );
}
