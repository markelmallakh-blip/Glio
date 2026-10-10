import Link from "next/link";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

const variants = {
  lime: "bg-lime text-ink hover:bg-lime-strong",
  dark: "bg-ink text-white hover:bg-ink-soft",
  white: "bg-white text-ink hover:bg-lime-tint",
  "outline-dark": "border border-ink text-ink hover:bg-ink hover:text-white",
  "outline-light": "border border-white/80 text-white hover:bg-white hover:text-ink",
  ghost: "text-ink hover:bg-ink/5",
};

const sizes = {
  sm: "h-9 gap-2 px-4 text-sm",
  md: "h-12 gap-2.5 px-6 text-base",
  lg: "h-[3.625rem] gap-2.5 px-7 text-lg md:text-xl",
};

type BaseProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Trailing icon. Defaults to the brand arrow; pass `null` for none. */
  icon?: IconName | null;
  leadingIcon?: IconName;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps> & { href?: undefined };
type ButtonAsLink = BaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof BaseProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function buttonClasses({
  variant = "lime",
  size = "md",
  fullWidth,
  className,
}: Pick<BaseProps, "variant" | "size" | "fullWidth" | "className">) {
  return cn(
    "group inline-flex shrink-0 items-center justify-center rounded-full font-bold whitespace-nowrap",
    "transition-[background-color,color,box-shadow,transform] duration-200 ease-(--ease-brand)",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );
}

function Content({ icon, leadingIcon, children, size }: BaseProps) {
  const iconSize = size === "sm" ? 16 : 22;
  return (
    <>
      {leadingIcon ? <Icon name={leadingIcon} size={iconSize} /> : null}
      <span>{children}</span>
      {icon ? (
        <Icon
          name={icon}
          size={iconSize}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      ) : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const {
    variant,
    size,
    icon = "arrow-up-right",
    leadingIcon,
    fullWidth,
    className,
    children,
    ...rest
  } = props;
  const classes = buttonClasses({ variant, size, fullWidth, className });
  const content = (
    <Content icon={icon} leadingIcon={leadingIcon} size={size}>
      {children}
    </Content>
  );

  if (typeof rest.href === "string") {
    return (
      <Link className={classes} {...(rest as Omit<ButtonAsLink, keyof BaseProps>)}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest as Omit<ButtonAsButton, keyof BaseProps>;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
