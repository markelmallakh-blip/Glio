import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { type BookingStep } from "./state";

const steps: { step: BookingStep; label: string; title: string }[] = [
  { step: 1, label: "Cars & Services", title: "Your Cars & Services" },
  { step: 2, label: "Booking Details", title: "Add Booking Details" },
  { step: 3, label: "Payment Plan", title: "Choose Payment Plan" },
  { step: 4, label: "Payment", title: "Pay & Confirm" },
];

type BookingStepperProps = {
  current: BookingStep;
  /** Highest step the user may jump back to. */
  onSelect: (step: BookingStep) => void;
};

export function BookingStepper({ current, onSelect }: BookingStepperProps) {
  const progress = ((current - 1) / (steps.length - 1)) * 100;
  const title = steps[current - 1].title;

  return (
    <section className="bg-ink text-white" aria-labelledby="booking-title">
      <Container className="flex flex-col items-center gap-6 pt-8 pb-10 md:gap-8 md:pt-12 md:pb-14">
        <div className="flex flex-col items-center gap-2 text-center">
          <Eyebrow tone="dark">Book GLIO Now</Eyebrow>
          <h1 id="booking-title" className="text-display font-display">
            {title}
          </h1>
        </div>
        <nav aria-label="Booking progress" className="w-full max-w-[64rem]">
          <div className="mb-5 h-2 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-lime transition-[width] duration-500 ease-(--ease-brand)"
              style={{ width: `${Math.max(progress, 12)}%` }}
            />
          </div>
          <ol className="flex items-start justify-between gap-2">
            {steps.map(({ step, label }) => {
              const done = step < current;
              const active = step === current;
              const content = (
                <>
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full text-base font-bold",
                      done || active ? "bg-lime text-ink" : "bg-line-soft text-ink",
                    )}
                  >
                    {done ? <Icon name="check" size={16} strokeWidth={2.4} /> : step}
                  </span>
                  <span
                    className={cn(
                      "text-center text-xs font-bold md:text-base",
                      done || active ? "text-lime" : "text-line-soft",
                    )}
                  >
                    {label}
                  </span>
                </>
              );
              return (
                <li
                  key={step}
                  className="flex flex-1 flex-col items-center first:items-start last:items-end"
                >
                  {done ? (
                    <button
                      type="button"
                      onClick={() => onSelect(step)}
                      className="flex flex-col items-center gap-2 rounded-lg hover:opacity-85"
                    >
                      {content}
                      <span className="sr-only">(completed, go back to this step)</span>
                    </button>
                  ) : (
                    <span
                      className="flex flex-col items-center gap-2"
                      aria-current={active ? "step" : undefined}
                    >
                      {content}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </Container>
    </section>
  );
}
