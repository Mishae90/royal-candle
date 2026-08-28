/* Hand-drawn SVG ornament system — the brand's visual grammar:
   candle, Orthodox cross, dove, blossoms, pearls, ribbons. */

interface IconProps {
  className?: string;
}

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ------- Logo mark: candle + cross + dove + blossoms + pearls ------- */
export function LogoMark({ className = "h-11 w-11" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {/* arch */}
      <path d="M12 56 V30 C12 16 21 8 32 8 C43 8 52 16 52 30 V56" {...base} strokeWidth={1} opacity={0.5} />
      {/* flame */}
      <path d="M32 15 C35 19 36 22 32 26 C28 22 29 19 32 15 Z" fill="currentColor" opacity={0.9} stroke="none" />
      {/* orthodox cross behind flame */}
      <g {...base} strokeWidth={1.1}>
        <path d="M32 11 V29 M27.5 16.5 H36.5 M28.5 21.5 H35.5 M28.8 27.6 L35.2 25.2" />
      </g>
      {/* candle body */}
      <rect x="26.5" y="30" width="11" height="20" rx="3" {...base} strokeWidth={1.2} />
      {/* ribbon band */}
      <path d="M26.5 38.5 H37.5" {...base} strokeWidth={2.4} opacity={0.75} />
      {/* blossoms */}
      <g {...base} strokeWidth={1}>
        <circle cx="20" cy="46" r="2.4" />
        <circle cx="16.6" cy="49.4" r="1.6" />
        <circle cx="44" cy="46" r="2.4" />
        <circle cx="47.4" cy="49.4" r="1.6" />
        <path d="M22.5 49.5 C24 48.5 25.5 48 26.5 48 M41.5 49.5 C40 48.5 38.5 48 37.5 48" />
      </g>
      {/* pearls */}
      <g fill="currentColor" stroke="none" opacity={0.8}>
        <circle cx="22" cy="56" r="1.1" />
        <circle cx="27" cy="57.4" r="1.1" />
        <circle cx="32" cy="57.9" r="1.1" />
        <circle cx="37" cy="57.4" r="1.1" />
        <circle cx="42" cy="56" r="1.1" />
      </g>
    </svg>
  );
}

/* ------- Wordmark ------- */
export function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex flex-col leading-none">
      <span className={`font-display text-[1.35rem] font-semibold tracking-[0.18em] ${dark ? "text-ivory" : "text-ink"}`}>
        ROYAL CANDLE
      </span>
      <span className={`mt-1 text-[0.52rem] font-semibold tracking-[0.42em] ${dark ? "text-gold-soft" : "text-gold"}`}>
        BAPTISM CANDLES
      </span>
    </span>
  );
}

/* ------- Line icons ------- */
export const CrossIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M12 3v18M8 7h8M9 17.5l6-2.4" />
  </svg>
);

export const FlameIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M12 3c3.2 3.6 4.8 6.6 4.8 9.4A4.8 4.8 0 0 1 12 17a4.8 4.8 0 0 1-4.8-4.6C7.2 9.6 8.8 6.6 12 3Z" />
    <path d="M12 21c-2.6 0-4.4-1-5.4-2.4M12 21c2.6 0 4.4-1 5.4-2.4" opacity={0.5} />
  </svg>
);

export const DoveIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M3.5 13.5c3.8.6 6.4-.4 8-2.4 1.3-1.6 2.8-2.6 5-2.6-.9 1-1.2 1.9-1.1 3 2 .2 3.6-.4 4.6-1.5-.5 2.9-2.6 4.8-5.6 5.2-1.2 1.9-3 3-5.4 3.3.9-1 1.3-1.9 1.4-2.9-2.6.4-5.1-.4-6.9-2.1Z" />
    <path d="M9 17.5c-.8 1.2-2 2-3.5 2.4" opacity={0.5} />
  </svg>
);

export const RibbonIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M12 10.5c-2.4-3-6-3.4-6-.6 0 2.2 3.2 2.8 6 .6Zm0 0c2.4-3 6-3.4 6-.6 0 2.2-3.2 2.8-6 .6Z" />
    <circle cx="12" cy="10.7" r="1.2" />
    <path d="M10.6 12.6 8.6 19l3.4-1.8L15.4 19l-2-6.4" />
  </svg>
);

export const BlossomIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <circle cx="12" cy="12" r="1.6" />
    <path d="M12 10.4c-1.6-2.4-1-4.9.9-4.9 1.4 0 1.9 1.6 1.4 3M13.6 12c2.8-.6 4.9.9 4 2.5-.7 1.2-2.3 1-3.4-.2M12 13.6c1.6 2.4 1 4.9-.9 4.9-1.4 0-1.9-1.6-1.4-3M10.4 12c-2.8.6-4.9-.9-4-2.5.7-1.2 2.3-1 3.4.2" />
  </svg>
);

export const PearlIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <circle cx="5" cy="13.5" r="1.7" />
    <circle cx="9.7" cy="15.5" r="1.7" />
    <circle cx="14.6" cy="15.2" r="1.7" />
    <circle cx="19" cy="12.8" r="1.7" />
    <path d="M4 9.5c4.5-3.6 11.5-3.6 16 0" opacity={0.45} />
  </svg>
);

export const BearIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <circle cx="8" cy="6.5" r="2" />
    <circle cx="16" cy="6.5" r="2" />
    <circle cx="12" cy="10" r="4.4" />
    <path d="M7.6 13.6c-1.7 1.5-2.6 3.4-2.6 5.4h14c0-2-.9-3.9-2.6-5.4" />
    <path d="M10.8 10.6h2.4M12 10.6v1.6" opacity={0.7} />
  </svg>
);

export const WaxIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M9 8.5h6V19a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V8.5Z" />
    <path d="M9 10.5c1 1.2 2 1.2 3 0s2-1.2 3 0M12 3.5c1.3 1.5 2 2.7 2 3.7a2 2 0 1 1-4 0c0-1 .7-2.2 2-3.7Z" />
  </svg>
);

export const BoxIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M4 9h16v10a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19V9Z" />
    <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5V9H3V6.5ZM12 5v15.5" />
    <path d="M9.5 13.5c1-1.6 3-1.7 2.5 0-.4 1.3-2.5 1.6-2.5 0Zm5 0c-1-1.6-3-1.7-2.5 0 .4 1.3 2.5 1.6 2.5 0Z" opacity={0.8} />
  </svg>
);

export const LeafIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14Z" />
    <path d="M5 19c3-5 6-8 10-10" opacity={0.55} />
  </svg>
);

export const DropIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M12 3.5c3.5 4.4 5.5 7.8 5.5 10.5a5.5 5.5 0 1 1-11 0C6.5 11.3 8.5 7.9 12 3.5Z" />
    <path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" opacity={0.55} />
  </svg>
);

export const FamilyIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <circle cx="8.5" cy="7" r="2.3" />
    <circle cx="15.5" cy="7" r="2.3" />
    <path d="M4.5 19v-3a4 4 0 0 1 4-4h.6M19.5 19v-3a4 4 0 0 0-4-4h-.6M12 11.5a3.6 3.6 0 0 1 3.6 3.6V19H8.4v-3.9A3.6 3.6 0 0 1 12 11.5Z" />
  </svg>
);

export const SearchIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </svg>
);

export const BookmarkIcon = ({ className = "h-5 w-5", filled = false }: IconProps & { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} fill={filled ? "currentColor" : "none"}>
    <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.6L6 20V5.5a1 1 0 0 1 1-1Z" />
  </svg>
);

export const BagIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M5.5 8h13l-.9 11a2 2 0 0 1-2 1.9H8.4a2 2 0 0 1-2-1.9L5.5 8Z" />
    <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
  </svg>
);

export const ArrowIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M4 12h15M14 6.5 19.5 12 14 17.5" />
  </svg>
);

export const CheckIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const InstagramIcon = ({ className = "h-4.5 w-4.5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <rect x="4" y="4" width="16" height="16" rx="5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="16.8" cy="7.2" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const PinterestIcon = ({ className = "h-4.5 w-4.5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M10.2 20 12 13m-1.6-3.4C10.5 7.6 12.3 6.6 14 7.2c1.9.7 2 2.9.7 4.6-1 1.3-2.7 1.6-3.9.8" />
  </svg>
);

export const FacebookIcon = ({ className = "h-4.5 w-4.5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M14.5 8H16V5h-1.8c-2 0-3.4 1.3-3.4 3.6V11H9v3h1.8v7h3v-7h2.4l.5-3h-2.9V8.9c0-.6.3-.9.7-.9Z" />
  </svg>
);

/* ------- Decorative divider: ——— ✦ ——— ------- */
export function OrnamentDivider({ className = "" }: IconProps) {
  return (
    <div className={`ornament-rule ${className}`} aria-hidden="true">
      <svg viewBox="0 0 26 26" className="h-4 w-4 shrink-0">
        <path d="M13 4v18M8.5 8.5h9M9.5 17.8l7-2.6" {...base} strokeWidth={1.1} />
        <circle cx="4" cy="13" r="1" fill="currentColor" stroke="none" />
        <circle cx="22" cy="13" r="1" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
}

/* Small corner sprig for cards */
export function CornerSprig({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...base} strokeWidth={1}>
      <path d="M6 42C6 24 24 6 42 6" opacity={0.5} />
      <circle cx="14" cy="16" r="2.6" />
      <circle cx="9.5" cy="24" r="1.8" />
      <circle cx="16" cy="9.5" r="1.8" />
      <path d="M16.5 18.5c2.5-2 5.5-3.5 9-4.2M12 26.5c2.4-1 5-1.5 8-1.5" opacity={0.6} />
    </svg>
  );
}
