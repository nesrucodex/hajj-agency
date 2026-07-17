"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useSite } from "@/lib/locale";
import { Container, SectionHeading } from "@/components/ui";
import { IconCheck, IconArrow } from "@/components/icons";

export default function Packages() {
  const { t } = useSite();
  const { packages } = t;
  const [active, setActive] = useState(packages.tabs[0]?.key ?? "hajj");

  const items = packages.items.filter((p) => p.category === active);

  return (
    <section id="packages" className="grain relative overflow-hidden bg-surface-2 py-24 sm:py-32">
      <div className="arabesque pointer-events-none absolute inset-0 opacity-[0.03]" />
      <Container className="relative">
        <SectionHeading
          eyebrow={packages.eyebrow}
          title={packages.title}
          subtitle={packages.subtitle}
        />

        {/* tabs */}
        <div className="mx-auto mt-10 flex w-fit items-center gap-1 rounded-full border border-heading/15 bg-surface/60 p-1 backdrop-blur">
          {packages.tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className="relative rounded-full px-7 py-2.5 text-sm font-medium transition-colors"
            >
              {active === tab.key && (
                <motion.span
                  layoutId="pkg-tab"
                  className="absolute inset-0 rounded-full bg-gradient-to-b from-emerald-700 to-emerald-900"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span
                className={`relative z-10 ${active === tab.key ? "text-cream" : "text-heading/70"}`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {items.map((pkg, i) => {
              const featured = pkg.featured;
              return (
                <motion.article
                  key={pkg.name}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative flex flex-col overflow-hidden rounded-3xl border p-8 ${
                    featured
                      ? "border-gold-500/40 bg-emerald-950 text-cream shadow-[0_40px_80px_-40px_rgba(11,58,43,0.6)]"
                      : "border-heading/12 bg-surface text-heading"
                  }`}
                >
                  {featured && (
                    <div className="arabesque pointer-events-none absolute inset-0 opacity-[0.05]" />
                  )}
                  <div className="relative flex items-center justify-between">
                    <span
                      className={`eyebrow ${featured ? "gold-text" : "text-gold-700"}`}
                    >
                      {pkg.tier}
                    </span>
                    <span
                      className={`text-xs ${featured ? "text-cream-soft" : "text-body-soft"}`}
                    >
                      {pkg.duration}
                    </span>
                  </div>

                  <h3 className="font-display relative mt-3 text-3xl">{pkg.name}</h3>
                  <p
                    className={`relative mt-2 text-sm leading-relaxed ${featured ? "text-cream-soft" : "text-body-soft"}`}
                  >
                    {pkg.summary}
                  </p>

                  <div className="relative mt-5 flex items-baseline gap-1">
                    <span
                      className={`font-display text-4xl ${featured ? "text-gold-400" : "text-heading"}`}
                    >
                      {pkg.price}
                    </span>
                  </div>

                  <ul className="relative mt-6 flex-1 space-y-3">
                    {pkg.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-3 text-sm">
                        <IconCheck
                          className={`mt-0.5 size-4 shrink-0 ${featured ? "text-gold-400" : "text-emerald-600"}`}
                        />
                        <span className={featured ? "text-cream-soft" : "text-body-soft"}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="#contact"
                    className={`relative mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-300 group-hover:gap-3 ${
                      featured
                        ? "bg-gradient-to-b from-gold-400 to-gold-700 text-emerald-950"
                        : "border border-heading/20 text-heading hover:border-heading/50 hover:bg-heading/[0.05]"
                    }`}
                  >
                    {t.cta.primary.label}
                    <IconArrow className="size-4" />
                  </Link>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
