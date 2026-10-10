import { pageMetadata } from "@/lib/metadata";
import { WalletView } from "@/components/account/WalletView";

export const metadata = pageMetadata({
  title: "My Wallet",
  description: "Your GLIO wallet balance for future bookings.",
  path: "/account/wallet",
  noIndex: true,
});

export default function AccountWalletPage() {
  return <WalletView />;
}
