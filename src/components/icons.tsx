import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

/* ---- feature icons (line style) ---- */

export function IconKaaba(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3 4 6.5v11L12 21l8-3.5v-11L12 3Z" />
      <path d="M4 6.5 12 10l8-3.5M12 10v11" />
      <path d="M8 8.2v3.1M16 8.2v3.1" />
    </svg>
  );
}
export function IconGuide(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M5 20c0-3.3 3.1-5 7-5s7 1.7 7 5" />
      <path d="M12 3v1.2" />
    </svg>
  );
}
export function IconShield(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3 5 6v5c0 4.5 3 7.6 7 9 4-1.4 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 11.5 2 2 4-4.2" />
    </svg>
  );
}
export function IconHeart(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M12 20s-7-4.3-9-9c-1.3-3.1.7-6 3.6-6 2 0 3.4 1.3 4.4 2.8C16 5.3 17.4 5 19.4 5c2.9 0 4.9 2.9 3.6 6" />
    </svg>
  );
}
export function IconMoon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M20 14.5A8 8 0 1 1 10.2 4.3a6.3 6.3 0 0 0 9.8 10.2Z" />
      <path d="m17.5 4 .6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6.6-1.7Z" />
    </svg>
  );
}
export function IconClock(p: P) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  );
}

export const featureIcons: Record<string, (p: P) => React.ReactElement> = {
  kaaba: IconKaaba,
  guide: IconGuide,
  shield: IconShield,
  heart: IconHeart,
  moon: IconMoon,
  clock: IconClock,
};

/* ---- utility icons ---- */

export function IconArrow(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
export function IconChevron(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
export function IconCheck(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="m5 12.5 4.2 4.2L19 7" />
    </svg>
  );
}
export function IconPhone(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M6.5 4h3l1.3 3.3-1.8 1.4a11 11 0 0 0 5.3 5.3l1.4-1.8L19 16.5v3a1.5 1.5 0 0 1-1.6 1.5A14 14 0 0 1 4 6.6 1.5 1.5 0 0 1 5.5 5h1Z" />
    </svg>
  );
}
export function IconMail(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
export function IconPin(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M12 21s7-5.3 7-11a7 7 0 0 0-14 0c0 5.7 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}
export function IconStar(p: P) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...p}>
      <path d="M12 3.5 14 9l5.8.3-4.5 3.7 1.5 5.6L12 15.7 7.2 18.6l1.5-5.6L4.2 9.3 10 9l2-5.5Z" />
    </svg>
  );
}
export function IconQuote(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M9.4 6C6.4 7.3 4.6 9.9 4.6 13c0 3 1.7 5 4 5 1.9 0 3.3-1.4 3.3-3.3 0-1.8-1.3-3.1-3-3.1-.3 0-.6 0-.8.1.4-1.4 1.6-2.6 3.4-3.4L9.4 6Zm8.6 0c-3 1.3-4.8 3.9-4.8 7 0 3 1.7 5 4 5 1.9 0 3.3-1.4 3.3-3.3 0-1.8-1.3-3.1-3-3.1-.3 0-.6 0-.8.1.4-1.4 1.6-2.6 3.4-3.4L18 6Z" />
    </svg>
  );
}

/* ---- social ---- */
export function IconFacebook(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.4 1.4-1.4h1.4V5.6c-.7-.1-1.5-.2-2.3-.2-2.3 0-3.8 1.4-3.8 3.9v2H8v2.8h2.4V21h3.1Z" />
    </svg>
  );
}
export function IconInstagram(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="16.5" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function IconTiktok(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M16.5 3c.3 2 1.5 3.4 3.5 3.7V9c-1.3 0-2.5-.4-3.5-1v6.1c0 3-2.2 5.4-5.2 5.4S6 17.1 6 14.4c0-2.7 2.1-4.9 4.9-4.9.3 0 .6 0 .9.1v2.5c-.3-.1-.6-.2-.9-.2-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.6 2.5c1.5 0 2.6-1.1 2.6-2.8V3h2.9Z" />
    </svg>
  );
}
export function IconWhatsapp(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.4-1.1A8.5 8.5 0 1 0 12 3.5Zm0 1.6a6.9 6.9 0 0 1 5.8 10.6l-.2.3.6 2.2-2.3-.6-.3.2A6.9 6.9 0 1 1 12 5.1Zm-2.5 3c-.2 0-.5 0-.7.4-.2.3-.8.8-.8 2s.9 2.3 1 2.5c.1.2 1.7 2.7 4.2 3.6 2 .7 2.4.6 2.9.5.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.7-.4c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.6.8c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5l-.1-.5-.7-1.6c-.2-.4-.4-.4-.6-.4h-.5Z" />
    </svg>
  );
}

export const socialIcons: Record<string, (p: P) => React.ReactElement> = {
  facebook: IconFacebook,
  instagram: IconInstagram,
  tiktok: IconTiktok,
  youtube: IconFacebook,
};

/* ---- decorative ornaments ---- */

/** Eight-point Islamic star (khatam) used as a section divider mark. */
export function StarMark(p: P) {
  return (
    <svg viewBox="0 0 48 48" {...p}>
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M24 4 30 18 44 24 30 30 24 44 18 30 4 24 18 18 24 4Z" />
        <rect x="13" y="13" width="22" height="22" transform="rotate(45 24 24)" />
        <circle cx="24" cy="24" r="3.4" />
      </g>
    </svg>
  );
}

/** Slim ornamental divider: rule — star — rule. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className ?? ""}`}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/70" />
      <StarMark className="size-4 text-gold-500" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/70" />
    </div>
  );
}
