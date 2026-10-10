import { pageMetadata } from "@/lib/metadata";
import { BookingsList } from "@/components/account/BookingsList";

export const metadata = pageMetadata({
  title: "My Bookings",
  description: "Your upcoming and previous GLIO visits.",
  path: "/account/bookings",
  noIndex: true,
});

export default function AccountBookingsPage() {
  return <BookingsList />;
}
