"use client";

import { useSite } from "@/lib/locale";
import { Container } from "@/components/ui";
import { Stagger, RevealItem } from "@/components/motion";

export default function Stats() {
  const { t } = useSite();
  return (
    <section className="relative border-y border-gold-500/15 bg-emerald-900 text-cream">
      <div className="arabesque pointer-events-none absolute inset-0 opacity-[0.04]" />
      <Container className="relative py-12 sm:py-14">
        <Stagger className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {t.stats.map((s, i) => (
            <RevealItem
              key={i}
              className={`flex flex-col items-center text-center lg:items-start lg:text-left ${
                i !== 0 ? "lg:border-l lg:border-gold-500/15 lg:pl-8" : ""
              }`}
            >
              <span className="font-display text-4xl text-gold-400 sm:text-5xl">
                {s.value}
              </span>
              <span className="mt-2 max-w-[12rem] text-sm leading-snug text-cream-soft">
                {s.label}
              </span>
            </RevealItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
