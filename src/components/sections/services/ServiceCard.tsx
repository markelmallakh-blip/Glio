import { type ServicePackage } from "@/types/booking";
import { Media } from "@/components/media/Media";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { formatEGP } from "@/lib/utils";
import { formatDurationRange } from "@/lib/booking/time";

/** Dark package card from the homepage. Price and time are per car. */
export function ServiceCard({ service }: { service: ServicePackage }) {
  const headingId = `service-${service.slug}`;
  return (
    <article
      aria-labelledby={headingId}
      className="relative flex h-full flex-col gap-5 rounded-xl border border-lime/35 bg-ink-soft p-4 pt-6 text-white transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-lime"
    >
      <span className="absolute -top-3 left-5 rotate-3 rounded bg-lime px-2.5 py-0.5 text-sm font-display text-ink">
        {service.category}
      </span>

      <div className="relative aspect-[227/186] overflow-hidden rounded-lg">
        <Media
          asset={service.image}
          fill
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, 90vw"
        />
        <span className="absolute top-2 left-2 rounded-full border border-white/10 bg-black/25 px-2.5 py-0.5 text-xs font-semibold backdrop-blur-xl">
          {service.imageLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <h3 id={headingId} className="text-[2rem] leading-tight font-display">
          {service.name}
        </h3>
        <ul className="flex flex-col gap-1.5">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm font-semibold">
              <Icon name="check-circle" size={16} className="mt-0.5 text-lime" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-2xl font-display">
            {formatEGP(service.price)}
            <span className="ml-1.5 text-sm font-semibold text-white/60 not-italic">/ car</span>
          </p>
          <p className="flex items-center gap-1 text-xs font-semibold text-white/75">
            <Icon name="clock" size={14} className="text-lime" />
            {formatDurationRange(service.durationMinutes)}
          </p>
        </div>
        <Button
          href={`/our-services#${service.slug}`}
          variant="outline-light"
          size="sm"
          fullWidth
          aria-label={`Explore ${service.name}`}
        >
          Explore Service
        </Button>
      </div>
    </article>
  );
}
