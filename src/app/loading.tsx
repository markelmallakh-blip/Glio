import { Logo } from "@/components/brand/Logo";

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[60vh] items-center justify-center bg-ink"
    >
      <Logo className="w-32 animate-pulse text-lime" title="" />
    </div>
  );
}
