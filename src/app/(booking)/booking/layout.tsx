import { BookingFooter } from "@/components/layout/BookingFooter";
import { BookingHeader } from "@/components/layout/BookingHeader";

export default function BookingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <BookingHeader />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <BookingFooter />
    </>
  );
}
