import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="bg-ink text-white">
        <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
          <p className="text-[clamp(6rem,20vw,14rem)] leading-none font-display text-lime">404</p>
          <h1 className="text-h2 font-display">This page took a wrong turn</h1>
          <p className="max-w-md text-white/80">
            The page you’re looking for doesn’t exist or has moved. Let’s get you back on the road.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/" variant="outline-light" icon={null} leadingIcon="arrow-left">
              Back to Home
            </Button>
            <Button href="/booking">Book Now</Button>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
