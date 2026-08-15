"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSite } from "@/lib/locale";
import { Container, SectionHeading } from "@/components/ui";
import { IconStar, IconPin, IconChevron } from "@/components/icons";
import type { Hotel } from "@/lib/content";
import type { Locale } from "@/lib/content";

// Fixed UI chrome for this section — not admin-editable content, same pattern
// Header.tsx uses for its language toggle labels.
const LABELS: Record<
  Locale,
  {
    tabs: { makkah: string; madinah: string };
    dayType: Record<"WD" | "WE" | "ALL", string>;
    room: { dbl: string; trp: string; quad: string };
    haramView: string;
    kaabaView: string;
    from: string;
    rates: string;
    showAll: string;
    showFeatured: string;
    unavailable: string;
  }
> = {
  en: {
    tabs: { makkah: "Makkah", madinah: "Madinah" },
    dayType: { WD: "Weekdays", WE: "Weekend", ALL: "Every night" },
    room: { dbl: "Double", trp: "Triple", quad: "Quad" },
    haramView: "Haram view",
    kaabaView: "Kaaba view",
    from: "From",
    rates: "Rates",
    showAll: "Show all hotels",
    showFeatured: "Show fewer",
    unavailable: "—",
  },
  am: {
    tabs: { makkah: "መካ", madinah: "መዲና" },
    dayType: { WD: "የሳምንት ቀናት", WE: "ቅዳሜና እሁድ", ALL: "በየለሊቱ" },
    room: { dbl: "ድብል", trp: "ትሪፕል", quad: "ኳድ" },
    haramView: "የሐረም እይታ",
    kaabaView: "የካዕባ እይታ",
    from: "ከ",
    rates: "ዋጋዎች",
    showAll: "ሁሉንም ሆቴሎች አሳይ",
    showFeatured: "ያነሱ አሳይ",
    unavailable: "—",
  },
};

function fromPrice(hotel: Hotel): number | null {
  const values = hotel.rates.map((r) => r.dbl).filter((n): n is number => typeof n === "number");
  return values.length ? Math.min(...values) : null;
}

function HotelCard({ hotel, locale }: { hotel: Hotel; locale: Locale }) {
  const l = LABELS[locale];
  const [open, setOpen] = useState(false);
  const from = fromPrice(hotel);

  return (
    <div className="group flex flex-col rounded-2xl border border-heading/12 bg-surface px-5 py-4 transition-colors hover:border-gold-500/40">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-medium text-heading">{hotel.name}</h3>
          {hotel.nameAr && (
            <p dir="rtl" className="font-arabic truncate text-xs text-body-soft/80">
              {hotel.nameAr}
            </p>
          )}
        </div>
        {!!hotel.stars && (
          <div className="flex shrink-0 items-center gap-0.5 text-gold-500">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <IconStar key={i} className="size-3" />
            ))}
          </div>
        )}
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        {from !== null && (
          <span className="rounded-full bg-emerald-900 px-2.5 py-1 text-[0.7rem] font-medium text-cream">
            {l.from} {from} {hotel.currency}
          </span>
        )}
        {hotel.haramView && (
          <span className="inline-flex items-center gap-1 rounded-full border border-gold-500/30 px-2 py-1 text-[0.65rem] text-gold-700">
            <IconPin className="size-2.5" />
            {l.haramView}
          </span>
        )}
        {hotel.kaabaView && (
          <span className="inline-flex items-center gap-1 rounded-full border border-gold-500/30 px-2 py-1 text-[0.65rem] text-gold-700">
            <IconPin className="size-2.5" />
            {l.kaabaView}
          </span>
        )}
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-3 flex items-center gap-1 text-xs font-medium text-body-soft transition-colors hover:text-heading"
      >
        {l.rates}
        <IconChevron className={`size-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <table className="mt-3 w-full border-collapse text-xs">
              <thead>
                <tr className="text-body-soft/70">
                  <th className="py-1 text-left font-medium" />
                  <th className="py-1 text-right font-medium">{l.room.dbl}</th>
                  <th className="py-1 text-right font-medium">{l.room.trp}</th>
                  <th className="py-1 text-right font-medium">{l.room.quad}</th>
                </tr>
              </thead>
              <tbody>
                {hotel.rates.map((rate, i) => (
                  <tr key={i} className="border-t border-heading/8">
                    <td className="py-1.5 text-left text-body-soft">{l.dayType[rate.dayType]}</td>
                    <td className="py-1.5 text-right text-heading tabular-nums">
                      {rate.dbl ?? l.unavailable}
                    </td>
                    <td className="py-1.5 text-right text-heading tabular-nums">
                      {rate.trp ?? l.unavailable}
                    </td>
                    <td className="py-1.5 text-right text-heading tabular-nums">
                      {rate.quad ?? l.unavailable}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Hotels() {
  const { t, hotels: allHotels, locale } = useSite();
  const { hotels: section } = t;
  const l = LABELS[locale];
  const [city, setCity] = useState<"makkah" | "madinah">("makkah");
  const [showAll, setShowAll] = useState(false);

  const cityHotels = useMemo(
    () => allHotels.filter((h) => h.city === city),
    [allHotels, city],
  );
  const featured = useMemo(() => {
    const f = cityHotels.filter((h) => h.featured);
    return f.length ? f : cityHotels.slice(0, 6);
  }, [cityHotels]);
  const items = showAll ? cityHotels : featured;
  const hasMore = cityHotels.length > featured.length;

  if (allHotels.length === 0) return null;

  return (
    <section id="hotels" className="grain relative overflow-hidden bg-surface-2 py-20 sm:py-24">
      <div className="arabesque pointer-events-none absolute inset-0 opacity-[0.03]" />
      <Container className="relative">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          subtitle={section.subtitle}
        />

        <div className="mx-auto mt-8 flex w-fit items-center gap-1 rounded-full border border-heading/15 bg-surface/60 p-1 backdrop-blur">
          {(["makkah", "madinah"] as const).map((key) => (
            <button
              key={key}
              onClick={() => {
                setCity(key);
                setShowAll(false);
              }}
              className="relative rounded-full px-7 py-2.5 text-sm font-medium transition-colors"
            >
              {city === key && (
                <motion.span
                  layoutId="hotel-city-tab"
                  className="absolute inset-0 rounded-full bg-gradient-to-b from-emerald-700 to-emerald-900"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className={`relative z-10 ${city === key ? "text-cream" : "text-heading/70"}`}>
                {l.tabs[key]}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} locale={locale} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-full border border-heading/15 px-6 py-2.5 text-sm font-medium text-heading transition-colors hover:border-gold-500/40"
            >
              {showAll ? l.showFeatured : `${l.showAll} (${cityHotels.length})`}
              <IconChevron className={`size-3.5 transition-transform ${showAll ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-xs italic text-body-soft/70">{section.note}</p>
      </Container>
    </section>
  );
}
