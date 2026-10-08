import type { ReactNode } from "react";

export type IconName =
  | "software"
  | "customers"
  | "commerce"
  | "subscriptions"
  | "finance"
  | "marketing";

type CoverIconProps = {
  name: IconName;
  className?: string;
  title?: string;
};

/*
 * Original COVER service glyphs: the publication sheet is the shared unit.
 * The detail group can move independently, but no information relies on motion.
 */
const glyphs: Record<IconName, ReactNode> = {
  software: (
    <>
      <path d="M6 11h11l5 5v23H6V11Z" />
      <path d="M17 11v5h5M11 23h6M11 29h6" />
      <path d="M22 25h5M27 14v22" />
      <g className="icon-detail">
        <rect x="30" y="7" width="12" height="14" rx="2" />
        <rect x="30" y="29" width="12" height="14" rx="2" />
        <path d="M27 14h3M27 36h3M34 12h4M34 17h2M34 34h4M34 39h2" />
      </g>
    </>
  ),
  customers: (
    <>
      <path d="M6 8h15l5 5v27H6V8Z" />
      <path d="M21 8v5h5M11 17h8M11 23h6M11 29h8M11 35h5" />
      <path d="M26 23h5M31 23v-4M31 23v8" />
      <g className="icon-detail">
        <circle cx="37" cy="13" r="4" />
        <path d="M31 24v-1a6 6 0 0 1 12 0v1H31Z" />
        <rect x="32" y="30" width="10" height="10" rx="2" />
        <path d="M35 35h4" />
      </g>
    </>
  ),
  commerce: (
    <>
      <path d="M5 8h14l5 5v25H5V8Z" />
      <path d="M19 8v5h5M10 19h9M10 25h9M10 31h5" />
      <path d="M5 38h19" />
      <g className="icon-detail">
        <path d="M27 18h14M36 13l5 5-5 5" />
        <path d="M29 28h14v12H29V28ZM29 32h14" />
        <path d="m33 36 2 2 4-4" />
      </g>
    </>
  ),
  subscriptions: (
    <>
      <path d="M15 13h13l5 5v21H15V13Z" />
      <path d="M28 13v5h5M20 24h8M20 30h8M20 35h4" />
      <g className="icon-detail">
        <path d="M8 22a17 17 0 0 1 29-11M37 6v5h-5" />
        <path d="M40 26a17 17 0 0 1-29 11M11 42v-5h5" />
      </g>
    </>
  ),
  finance: (
    <>
      <path d="M6 7h18l5 5v29H6V7Z" />
      <path d="M24 7v5h5M11 16h12M11 22h6M11 29h6M11 36h6" />
      <path d="M20 22h4M20 29h4M20 36h4" />
      <g className="icon-detail">
        <path d="M29 22h7M29 36h7M36 17v24" />
        <circle cx="39" cy="13" r="3" />
        <path d="M36 24h7M36 31h5M36 38h7" />
      </g>
    </>
  ),
  marketing: (
    <>
      <path d="M9 21v14h11M32 35h7V21" />
      <path d="m17 32 3 3-3 3M36 24l3-3 3 3" />
      <g className="icon-detail">
        <path d="M3 7h9l3 3v11H3V7ZM12 7v3h3" />
        <circle cx="8" cy="12" r="1.5" />
        <path d="M6 17h5" />
        <path d="M20 23h9l3 3v15H20V23ZM29 23v3h3" />
        <circle cx="25" cy="28" r="1.5" />
        <path d="M23 33h5M23 37h5" />
        <path d="M33 7h9l3 3v11H33V7ZM42 7v3h3" />
        <circle cx="38" cy="12" r="1.5" />
        <path d="M36 17h5" />
      </g>
    </>
  ),
};

export function CoverIcon({ name, className, title }: CoverIconProps) {
  return (
    <svg
      className={`cover-icon cover-icon--${name}${className ? ` ${className}` : ""}`}
      viewBox="0 0 48 48"
      width="48"
      height="48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      aria-label={title}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {glyphs[name]}
    </svg>
  );
}

export function ArrowIcon({ className, direction = "right" }: {
  className?: string;
  direction?: "right" | "up-right" | "down";
}) {
  const rotations = { right: 0, "up-right": -45, down: 90 };

  return (
    <svg
      className={`cover-arrow${className ? ` ${className}` : ""}`}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <g transform={`rotate(${rotations[direction]} 12 12)`}>
        <path d="M4 12h15M13 6l6 6-6 6" />
      </g>
    </svg>
  );
}
