import { type VehicleType } from "@/types/booking";
import { getVehicleType } from "@/content/vehicles";
import { Icon } from "@/components/ui/Icon";

export function VehicleIcon({
  type,
  size = 24,
  className,
}: {
  type: VehicleType;
  size?: number;
  className?: string;
}) {
  return <Icon name={getVehicleType(type).icon} size={size} className={className} />;
}
