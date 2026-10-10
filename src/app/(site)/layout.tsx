import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="ribbon-clearance focus:outline-none">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
