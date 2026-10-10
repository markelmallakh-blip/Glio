import { pageMetadata } from "@/lib/metadata";
import { AddressesManager } from "@/components/account/AddressesManager";

export const metadata = pageMetadata({
  title: "My Addresses",
  description: "Your saved service addresses.",
  path: "/account/addresses",
  noIndex: true,
});

export default function AccountAddressesPage() {
  return <AddressesManager />;
}
