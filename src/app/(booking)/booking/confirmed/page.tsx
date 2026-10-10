import { pageMetadata } from "@/lib/metadata";
import { ConfirmationView } from "@/components/booking/ConfirmationView";

export const metadata = pageMetadata({
  title: "Booking Confirmed",
  description: "Your GLIO booking is confirmed.",
  path: "/booking/confirmed",
  noIndex: true,
});

export default function BookingConfirmedPage() {
  return <ConfirmationView />;
}
