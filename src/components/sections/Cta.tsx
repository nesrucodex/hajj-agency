"use client";

import Link from "next/link";
import { useSite } from "@/lib/locale";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { Ornament, IconArrow, IconPhone } from "@/components/icons";
import { mediaUrl } from "@/lib/media";

export default function Cta() {
  const { t } = useSite();
  const { cta } = t;

  return (
    <section className="relative overflow-hidden bg-emerald-950 py-24 text-cream sm:py-32">
      {/* faded backdrop */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={mediaUrl("/assets/image/23.jpg")}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-950 via-emerald-950/85 to-emerald-950" />
      <div className="glow-gold pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 opacity-30" />

      <Container className="relative flex flex-col items-center text-center">
        <Reveal>
          <span className="eyebrow gold-text">{cta.eyebrow}</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display mt-4 max-w-3xl text-balance text-4xl leading-[1.05] sm:text-6xl">
            {cta.title}
          </h2>
        </Reveal>
        <Ornament className="mt-7" />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-cream-soft sm:text-lg">
            {cta.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={cta.primary.href}
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-b from-gold-400 to-gold-700 px-8 py-4 text-sm font-medium text-emerald-950 transition-transform hover:-translate-y-0.5"
            >
              {cta.primary.label}
              <IconArrow className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={cta.secondary.href}
              className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/40 px-8 py-4 text-sm font-medium text-cream transition-colors hover:border-gold-400 hover:bg-gold-500/10"
            >
              <IconPhone className="size-4" />
              {cta.secondary.label}
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
