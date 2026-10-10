import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const gaps = {
  xs: "gap-2",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12",
};

type StackProps = ComponentPropsWithoutRef<"div"> & {
  gap?: keyof typeof gaps;
  direction?: "col" | "row";
  align?: "start" | "center" | "end" | "stretch";
};

const aligns = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export function Stack({
  gap = "md",
  direction = "col",
  align = "stretch",
  className,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "col" ? "flex-col" : "flex-row flex-wrap",
        gaps[gap],
        aligns[align],
        className,
      )}
      {...props}
    />
  );
}
