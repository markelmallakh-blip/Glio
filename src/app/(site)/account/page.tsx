import { pageMetadata } from "@/lib/metadata";
import { ProfileView } from "@/components/account/ProfileView";

export const metadata = pageMetadata({
  title: "My Profile",
  description: "Manage your GLIO profile.",
  path: "/account",
  noIndex: true,
});

export default function AccountProfilePage() {
  return <ProfileView />;
}
