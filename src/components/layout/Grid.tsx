import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const columns = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
};

const gaps = {
  sm: "gap-3",
  md: "gap-4 md:gap-6",
  lg: "gap-6 md:gap-8",
};

type GridProps = ComponentPropsWithoutRef<"div"> & {
  cols?: keyof typeof columns;
  gap?: keyof typeof gaps;
};

export function Grid({ cols = 3, gap = "md", className, ...props }: GridProps) {
  return <div className={cn("grid grid-cols-1", columns[cols], gaps[gap], className)} {...props} />;
}
