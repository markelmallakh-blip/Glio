import { Container } from "@/components/layout/Container";

export function BookingSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading booking">
      <div className="bg-ink py-12 md:py-16">
        <Container className="flex flex-col items-center gap-6">
          <div className="h-6 w-40 animate-pulse rounded-full bg-white/10" />
          <div className="h-14 w-full max-w-xl animate-pulse rounded-2xl bg-white/10" />
          <div className="h-2 w-full max-w-[64rem] rounded-full bg-white/20" />
        </Container>
      </div>
      <div className="bg-surface py-10">
        <Container className="grid gap-6 lg:grid-cols-[1fr_25rem]">
          <div className="h-[32rem] animate-pulse rounded-[1.25rem] bg-white" />
          <div className="h-64 animate-pulse rounded-[1.25rem] bg-white" />
        </Container>
      </div>
    </div>
  );
}
