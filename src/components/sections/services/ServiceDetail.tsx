import { type ServicePackage } from "@/types/booking";
import { Container } from "@/components/layout/Container";
import { Media } from "@/components/media/Media";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/animations/Reveal";
import { formatEGP, cn } from "@/lib/utils";
import { formatDurationRange } from "@/lib/booking/time";

type ServiceDetailProps = { service: ServicePackage; reversed?: boolean };

/** Alternating full-width package row on /our-services. */
export function ServiceDetail({ service, reversed = false }: ServiceDetailProps) {
  return (
    <section
      id={service.slug}
      aria-labelledby={`${service.slug}-title`}
      className={cn("scroll-mt-28 py-12 text-white md:py-20", reversed ? "bg-ink-soft" : "bg-ink")}
    >
      <Container className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <Reveal className={cn("flex flex-col gap-5", reversed && "md:order-2")}>
          <span className="w-fit -rotate-2 rounded bg-lime px-2.5 py-0.5 text-sm font-display text-ink">
            {service.category}
          </span>
          <h2 id={`${service.slug}-title`} className="text-h2 font-display">
            {service.name}
          </h2>
          <p className="max-w-xl text-white/85">{service.description}</p>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-display">Included Services</h3>
            <ul className="flex flex-wrap gap-2">
              {service.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-xs font-display md:text-sm"
                >
                  <Icon name="check-circle" size={16} className="text-lime" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
            <p className="text-4xl font-display">
              {formatEGP(service.price)}
              <span className="ml-2 text-base text-white/60 not-italic">/ car</span>
            </p>
            <p className="flex items-center gap-1.5 pb-1 text-sm font-semibold text-white/80">
              <Icon name="clock" size={18} className="text-lime" />
              {formatDurationRange(service.durationMinutes)} per car
            </p>
          </div>
          <Button
            href={`/booking?service=${service.slug}`}
            className="w-fit sm:min-w-64 sm:justify-between"
          >
            Book {service.name}
          </Button>
        </Reveal>
        <Reveal delay={0.1} className={cn(reversed && "md:order-1")}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Media asset={service.image} fill sizes="(min-width: 768px) 50vw, 100vw" />
            <span className="absolute top-3 left-3 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-semibold backdrop-blur-xl">
              {service.imageLabel}
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
