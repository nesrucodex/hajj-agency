"use client";

import Link from "next/link";
import { Reveal } from "./motion";
import { Ornament } from "./icons";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  const isCenter = align === "center";
  const titleColor = tone === "light" ? "text-cream" : "text-heading";
  const subColor = tone === "light" ? "text-cream-soft" : "text-body-soft";
  return (
    <div
      className={`flex flex-col ${isCenter ? "items-center text-center" : "items-start text-left"}`}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={`eyebrow ${tone === "light" ? "gold-text" : "text-gold-700"}`}
          >
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={`font-display mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl md:text-[3.4rem] ${titleColor}`}
        >
          {title}
        </h2>
      </Reveal>
      {isCenter && <Ornament className="mt-6" />}
      {subtitle && (
        <Reveal delay={0.1}>
          <p
            className={`mt-5 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg ${subColor} ${isCenter ? "mx-auto" : ""}`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

type BtnProps = {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "outline" | "ghost";
  className?: string;
};

export function Button({ href, children, variant = "gold", className = "" }: BtnProps) {
  const variants: Record<string, string> = {
    gold: "bg-gradient-to-b from-gold-400 to-gold-700 text-emerald-950 shadow-[0_10px_30px_-12px_rgba(156,122,54,0.8)] hover:shadow-[0_14px_40px_-10px_rgba(156,122,54,0.9)] hover:-translate-y-0.5",
    outline:
      "border border-gold-500/50 text-cream hover:border-gold-400 hover:bg-gold-500/10",
    ghost:
      "border border-heading/15 text-heading hover:border-heading/40 hover:bg-heading/[0.05]",
  };
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
