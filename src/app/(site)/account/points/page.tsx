import { pageMetadata } from "@/lib/metadata";
import { PointsView } from "@/components/account/PointsView";

export const metadata = pageMetadata({
  title: "My Points",
  description: "Your GLIO loyalty points and redemptions.",
  path: "/account/points",
  noIndex: true,
});

export default function AccountPointsPage() {
  return <PointsView />;
}
