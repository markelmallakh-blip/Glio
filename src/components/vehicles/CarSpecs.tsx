import { type Car } from "@/types/booking";
import { getVehicleType } from "@/content/vehicles";
import { formatPlate } from "@/lib/vehicles/plate";
import { cn } from "@/lib/utils";

/** "Sedan • 2023 • Black • ك ا ي 239" with the plate isolated for correct bidi rendering. */
export function CarSpecs({
  car,
  className,
  extra,
}: {
  car: Car;
  className?: string;
  extra?: string;
}) {
  const plate = formatPlate(car.plate);
  const parts = [getVehicleType(car.type).label, car.year, car.color].filter(Boolean);
  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-1.5", className)}>
      {parts.map((part, index) => (
        <span key={part}>
          {index > 0 ? "• " : ""}
          {part}
        </span>
      ))}
      {plate ? (
        <span>
          •{" "}
          <bdi dir="rtl" lang="ar" className="font-semibold">
            {plate}
          </bdi>
        </span>
      ) : null}
      {extra ? <span>• {extra}</span> : null}
    </span>
  );
}
