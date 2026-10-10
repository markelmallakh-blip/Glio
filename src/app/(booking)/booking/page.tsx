import { Suspense } from "react";
import { pageMetadata } from "@/lib/metadata";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { BookingSkeleton } from "@/components/booking/BookingSkeleton";

export const metadata = pageMetadata({
  title: "Book a Visit",
  description:
    "Book GLIO mobile car care in three steps: choose your cars and a package for each, pick a location and time, then pay securely.",
  path: "/booking",
});

export default function BookingPage() {
  return (
    // BookingFlow reads ?service= from the URL, so it renders on the client inside Suspense.
    <Suspense fallback={<BookingSkeleton />}>
      <BookingFlow />
    </Suspense>
  );
}
