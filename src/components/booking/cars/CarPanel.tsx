"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getService } from "@/content/services";
import { carSubtotal } from "@/lib/booking/pricing";
import { formatDurationRange } from "@/lib/booking/time";
import { Badge } from "@/components/ui/Choice";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn, formatEGP } from "@/lib/utils";
import { CarSpecs } from "@/components/vehicles/CarSpecs";
import { VehicleIcon } from "@/components/vehicles/VehicleIcon";
import { carTitle, type BookingAction, type CarDraft } from "../state";
import { ExtrasPicker, PackageList } from "./PackageOptions";

type CarPanelProps = {
  line: CarDraft;
  index: number;
  expanded: boolean;
  firstLine?: CarDraft;
  dispatch: (action: BookingAction) => void;
};

export function CarPanel({ line, index, expanded, firstLine, dispatch }: CarPanelProps) {
  const reduce = useReducedMotion();
  const service = line.serviceSlug ? getService(line.serviceSlug) : undefined;
  const title = carTitle(line.car);
  const canCopy = index > 0 && Boolean(firstLine?.serviceSlug);
  const status = service
    ? `${service.name} · ${formatDurationRange(service.durationMinutes)} · ${
        line.extraIds.length
          ? `${line.extraIds.length} extra${line.extraIds.length > 1 ? "s" : ""}`
          : "no extras"
      }`
    : "Choose a package";

  return (
    <motion.li
      layout={!reduce}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "rounded-[1.25rem] bg-white",
        expanded ? "border-2 border-lime-strong" : "border border-line",
      )}
    >
      <div className="flex items-center gap-3 p-4 md:gap-4 md:p-5">
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-full",
            expanded ? "bg-ink text-lime" : "bg-surface text-ink",
          )}
        >
          <VehicleIcon type={line.car.type} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Car {index + 1}</Badge>
            <h3 className="truncate text-xl font-display md:text-[1.375rem]">{title}</h3>
          </div>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-grey">
            {service && !expanded ? (
              <Icon name="check-circle" size={16} className="text-success" />
            ) : null}
            {expanded ? <CarSpecs car={line.car} /> : <span>{status}</span>}
          </p>
        </div>
        {!expanded && service ? (
          <p className="hidden font-bold whitespace-nowrap sm:block">
            {formatEGP(carSubtotal(line))}
          </p>
        ) : null}
        {expanded && canCopy ? (
          <Button
            size="sm"
            variant="outline-dark"
            icon={null}
            leadingIcon="plus"
            className="hidden sm:inline-flex"
            onClick={() => dispatch({ type: "copy-first-car", key: line.key })}
          >
            Same as Car 1
          </Button>
        ) : null}
        {!expanded ? (
          <button
            type="button"
            onClick={() => dispatch({ type: "expand", key: line.key })}
            className="text-sm font-semibold underline underline-offset-4"
          >
            {service ? "Change" : "Choose"}
            <span className="sr-only"> package for {title}</span>
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => dispatch({ type: "remove-car", key: line.key })}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-grey transition-colors hover:bg-danger-soft hover:text-danger"
        >
          <Icon name="trash" size={18} />
          <span className="sr-only">Remove {title} from this booking</span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-6 px-4 pb-5 md:px-5">
              {canCopy ? (
                <Button
                  size="sm"
                  variant="outline-dark"
                  icon={null}
                  leadingIcon="plus"
                  className="w-fit sm:hidden"
                  onClick={() => dispatch({ type: "copy-first-car", key: line.key })}
                >
                  Same as Car 1
                </Button>
              ) : null}
              <PackageList
                name={`package-${line.key}`}
                value={line.serviceSlug}
                onChange={(slug) =>
                  dispatch({ type: "set-service", key: line.key, serviceSlug: slug })
                }
              />
              <ExtrasPicker
                carLabel={title}
                value={line.extraIds}
                onToggle={(extraId) => dispatch({ type: "toggle-extra", key: line.key, extraId })}
              />
              <Button
                variant="dark"
                size="sm"
                icon="check"
                disabled={!service}
                className="w-fit"
                onClick={() => dispatch({ type: "expand", key: null })}
              >
                {service ? `Done with ${title}` : "Pick a package first"}
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.li>
  );
}
