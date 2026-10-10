import { type SVGProps } from "react";
import { cn } from "@/lib/utils";

/** Stroke icons drawn on a 24px grid, matching the Hugeicons set used in the Figma file. */
const paths = {
  "arrow-up-right": <path d="M7 17 17 7M8.5 7H17v8.5" />,
  "arrow-right": <path d="M4 12h16m-6-6 6 6-6 6" />,
  "arrow-left": <path d="M20 12H4m6-6-6 6 6 6" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-right": <path d="m9 6 6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9.25" />
      <path d="m8 12.5 2.8 2.8L16 9.5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M8 3v4M16 3v4M3.5 10h17M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
    </>
  ),
  car: (
    <>
      <path d="M3.5 15.5V12l2-5.2A2 2 0 0 1 7.4 5.5h9.2a2 2 0 0 1 1.9 1.3l2 5.2v3.5a1 1 0 0 1-1 1h-1.2M5.7 16.5H4.5a1 1 0 0 1-1-1" />
      <path d="M3.5 12h17M8 16.5h8" />
      <circle cx="6.9" cy="16.5" r="1.6" />
      <circle cx="17.1" cy="16.5" r="1.6" />
    </>
  ),
  scooter: (
    <>
      <circle cx="5.5" cy="17" r="2.5" />
      <circle cx="18.5" cy="17" r="2.5" />
      <path d="M8 17h6.5l2-6.5H19M15 5h2l2.5 9.5M8 17l1.5-5.5H5" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5c.8-3.6 3.8-5.5 7.5-5.5s6.7 1.9 7.5 5.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M2.5 19.5c.6-3 3.2-4.8 6.5-4.8s5.9 1.8 6.5 4.8" />
      <path d="M15.5 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.9c2.1.5 3.6 2 4 4.6" />
    </>
  ),
  ticket: (
    <>
      <path d="M3.5 8.5V7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v1.5a3.5 3.5 0 0 0 0 7V17a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-1.5a3.5 3.5 0 0 0 0-7Z" />
      <path d="m12 9 .9 1.9 2.1.3-1.5 1.5.4 2.1-1.9-1-1.9 1 .4-2.1L9 11.2l2.1-.3L12 9Z" />
    </>
  ),
  logout: (
    <>
      <path d="M14 4.5h3.5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H14" />
      <path d="M10 8l-4 4 4 4M6 12h9" />
    </>
  ),
  edit: (
    <>
      <path d="m14.5 5.5 4 4L9 19H5v-4l9.5-9.5Z" />
      <path d="M13 20h7" />
    </>
  ),
  trash: (
    <>
      <path d="M4.5 6.5h15M9.5 6.5V4.8a1.3 1.3 0 0 1 1.3-1.3h2.4a1.3 1.3 0 0 1 1.3 1.3v1.7" />
      <path d="m6.5 6.5.8 12.2a2 2 0 0 0 2 1.8h5.4a2 2 0 0 0 2-1.8l.8-12.2M10 11v5M14 11v5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M12 16.5v-5M12 8h.01" />
    </>
  ),
  phone: (
    <path d="M8.6 3.5H6a2 2 0 0 0-2 2.2C4.6 13.4 10.6 19.4 18.3 20a2 2 0 0 0 2.2-2v-2.6a1 1 0 0 0-.8-1l-3-.7a1 1 0 0 0-1 .3l-1.4 1.5a12 12 0 0 1-6-6l1.5-1.4a1 1 0 0 0 .3-1l-.7-3a1 1 0 0 0-1-.8Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  crown: (
    <>
      <path d="m4 8 4 3.5L12 5l4 6.5L20 8l-1.5 9.5h-13L4 8Z" />
      <path d="M6 20.5h12" />
    </>
  ),
  hand: (
    <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-4.5a1.5 1.5 0 0 1 3 0V11m0-3a1.5 1.5 0 0 1 3 0v5.5a7 7 0 0 1-7 7h-.6a6 6 0 0 1-4.6-2.2L4 15.2a1.6 1.6 0 0 1 2.4-2.1L9 15.5V9.5" />
  ),
  star: (
    <>
      <circle cx="12" cy="12" r="9.25" />
      <path d="m12 7 1.5 3.1 3.4.5-2.5 2.4.6 3.4-3-1.6-3 1.6.6-3.4-2.5-2.4 3.4-.5L12 7Z" />
    </>
  ),
  sparkles: (
    <path d="M10 3c.6 4 2.5 6.4 7 7-4.5.6-6.4 3-7 7-.6-4-2.5-6.4-7-7 4.5-.6 6.4-3 7-7Zm8.5 10c.3 2 1.2 3.2 3.5 3.5-2.3.3-3.2 1.5-3.5 3.5-.3-2-1.2-3.2-3.5-3.5 2.3-.3 3.2-1.5 3.5-3.5Z" />
  ),
  "heart-user": (
    <>
      <circle cx="10" cy="7.5" r="3.5" />
      <path d="M3 19.5c.6-3.2 3.3-5 7-5 1 0 1.9.1 2.7.4" />
      <path d="M17.5 20.5s-3.5-2-3.5-4.4a1.8 1.8 0 0 1 3.5-.6 1.8 1.8 0 0 1 3.5.6c0 2.4-3.5 4.4-3.5 4.4Z" />
    </>
  ),
  wallet: (
    <>
      <path d="M18.5 8V6.5a2 2 0 0 0-2-2H6a2.5 2.5 0 0 0 0 5" />
      <path d="M3.5 7v10.5a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-13" />
      <path d="M16.5 14.5h.01" />
    </>
  ),
  "credit-card": (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="3" />
      <path d="M2.5 10h19M6.5 15h4" />
    </>
  ),
  copy: (
    <>
      <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" />
      <path d="M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5" />
    </>
  ),
  upload: (
    <path d="M12 15.5V4m0 0L7.5 8.5M12 4l4.5 4.5M4.5 14.5V18a2.5 2.5 0 0 0 2.5 2.5h10a2.5 2.5 0 0 0 2.5-2.5v-3.5" />
  ),
  file: (
    <>
      <path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8L14 3.5Z" />
      <path d="M14 3.5V8h4.5" />
    </>
  ),
  cash: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6 9.5v.01M18 14.5v.01" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 5.8v5.4c0 4.5 3 8.2 7 9.8 4-1.6 7-5.3 7-9.8V5.8L12 3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  facebook: (
    <path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a.5.5 0 0 1 .5-.5Z" />
  ),
  linkedin: (
    <>
      <path d="M7 10v8M7 6.5v.01M11 18v-4.5a2.5 2.5 0 0 1 5 0V18M11 10v8" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M17.2 6.8h.01" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.5 9.5 4 2.5-4 2.5v-5Z" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  size?: number;
  /** Provide a label only when the icon conveys meaning on its own. */
  label?: string;
};

export function Icon({
  name,
  size = 24,
  label,
  className,
  strokeWidth = 1.6,
  ...props
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      className={cn("shrink-0", className)}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
