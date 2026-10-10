import { type ComponentPropsWithoutRef, type ElementType } from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: "site" | "narrow" | "prose";
} & Omit<ComponentPropsWithoutRef<T>, "as">;

const sizes = {
  site: "max-w-(--container-site)",
  narrow: "max-w-5xl",
  prose: "max-w-3xl",
};

export function Container<T extends ElementType = "div">({
  as,
  size = "site",
  className,
  ...props
}: ContainerProps<T>) {
  const Component: ElementType = as ?? "div";
  return (
    <Component
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-10 xl:px-15", sizes[size], className)}
      {...props}
    />
  );
}
