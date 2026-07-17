"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useSite } from "@/lib/locale";
import { pickPromo } from "@/lib/promo";
import { StarMark, IconArrow } from "@/components/icons";

function LangToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useSite();
  return (
    <div
      className={`relative flex items-center rounded-full border border-gold-500/30 bg-emerald-950/30 p-0.5 text-xs font-medium backdrop-blur ${className}`}
    >
      {(["am", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className="relative rounded-full px-3 py-1.5 transition-colors"
          aria-pressed={locale === l}
        >
          {locale === l && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-gradient-to-b from-gold-400 to-gold-700"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          <span
            className={`relative z-10 ${locale === l ? "text-emerald-950" : "text-cream-soft"}`}
          >
            {l === "am" ? "አማ" : "EN"}
          </span>
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [promoOpen, setPromoOpen] = useState(true);
  // resolve the seasonal promo after mount (avoids SSR/CSR date mismatch)
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  const promo = now ? pickPromo(t.promos, now) : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold-500/15 bg-emerald-950/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      {/* promotional announcement bar (season-aware) */}
      {promo && promoOpen && (
        <div className="relative bg-gradient-to-r from-gold-700 via-gold-500 to-gold-700 text-emerald-950">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-x-3 gap-y-1 px-10 py-2 text-center text-xs font-medium sm:text-sm">
            <span className="hidden rounded-full bg-emerald-950/90 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-gold-300 sm:inline-block">
              {promo.badge}
            </span>
            <span className="font-semibold">{promo.title}</span>
            <span className="hidden opacity-80 md:inline">· {promo.detail}</span>
            <Link
              href={promo.cta.href}
              className="inline-flex items-center gap-1 rounded-full bg-emerald-950 px-3 py-1 text-[0.7rem] font-semibold text-gold-300 transition-transform hover:-translate-y-0.5"
            >
              {promo.cta.label}
              <IconArrow className="size-3" />
            </Link>
          </div>
          <button
            onClick={() => setPromoOpen(false)}
            aria-label="Dismiss"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-950/70 transition-colors hover:text-emerald-950"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}

      <div
        className={`mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 transition-all duration-500 sm:px-8 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        {/* logo */}
        <Link href="#top" className="group flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full border border-gold-500/40 text-gold-400 transition-transform duration-500 group-hover:rotate-45">
            <StarMark className="size-5" />
          </span>
          <span className="logo-text text-xl leading-none text-cream">
            {t.brand.name}
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {t.nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm text-cream-soft transition-colors hover:text-cream"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle className="hidden sm:flex" />
          <Link
            href={t.nav.cta.href}
            className="hidden items-center gap-2 rounded-full bg-gradient-to-b from-gold-400 to-gold-700 px-5 py-2.5 text-sm font-medium text-emerald-950 transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            {t.nav.cta.label}
            <IconArrow className="size-4" />
          </Link>

          {/* mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-gold-500/30 text-cream lg:hidden"
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-px w-5 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-5 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-gold-500/10 bg-emerald-950/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {t.nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-gold-500/10 py-3 text-cream-soft transition-colors hover:text-cream"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex items-center justify-between">
                <LangToggle />
                <Link
                  href={t.nav.cta.href}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-gold-400 to-gold-700 px-5 py-2.5 text-sm font-medium text-emerald-950"
                >
                  {t.nav.cta.label}
                  <IconArrow className="size-4" />
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
