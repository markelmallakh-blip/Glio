import { type VehicleType } from "@/types/booking";
import { type IconName } from "@/components/ui/Icon";

export const vehicleTypes: { id: VehicleType; label: string; icon: IconName }[] = [
  { id: "sedan", label: "Sedan", icon: "car" },
  { id: "hatchback", label: "Hatchback", icon: "car" },
  { id: "suv", label: "SUV / 4x4", icon: "car" },
  { id: "pickup", label: "Pickup", icon: "car" },
  { id: "van", label: "Van / Minibus", icon: "car" },
  { id: "motorcycle", label: "Motorcycle", icon: "scooter" },
  { id: "scooter", label: "Scooter", icon: "scooter" },
];

export function getVehicleType(id: VehicleType) {
  return vehicleTypes.find((type) => type.id === id) ?? vehicleTypes[0];
}
