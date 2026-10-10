import { pageMetadata } from "@/lib/metadata";
import { CarsManager } from "@/components/account/CarsManager";

export const metadata = pageMetadata({
  title: "My Cars",
  description: "Your saved cars for faster booking.",
  path: "/account/cars",
  noIndex: true,
});

export default function AccountCarsPage() {
  return <CarsManager />;
}
