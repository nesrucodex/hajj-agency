"use client";

import { useSite } from "@/lib/locale";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { StarMark } from "@/components/icons";
import { MosqueFrame } from "@/components/MosqueFrame";
import { mediaUrl } from "@/lib/media";

export default function About() {
  const { t } = useSite();
  const { about, brand } = t;

  return (
    <section id="about" className="grain relative overflow-hidden bg-surface py-24 sm:py-32">
      <Container className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* media */}
        <Reveal className="relative order-2 lg:order-1">
          <MosqueFrame className="aspect-[4/5] w-full max-w-md [filter:drop-shadow(0_35px_55px_rgba(11,58,43,0.45))]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mediaUrl("/assets/image/41.jpg")}
              alt="Gora Belu pilgrims"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent" />
          </MosqueFrame>
          {/* established badge */}
          <div className="absolute -right-3 -top-3 grid size-28 place-items-center rounded-full border border-gold-500/40 bg-emerald-900 text-center text-cream shadow-xl sm:-right-6">
            <div>
              <span className="font-display block text-3xl leading-none text-gold-400">
                {brand.establishedYear}
              </span>
              {brand.establishedLabel && (
                <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.2em] text-cream-soft">
                  {brand.establishedLabel}
                </span>
              )}
            </div>
          </div>
        </Reveal>

        {/* copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow text-gold-700">{about.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display mt-4 text-4xl leading-[1.05] text-heading sm:text-5xl md:text-[3.4rem]">
              {about.title}
            </h2>
          </Reveal>
          <div className="mt-6 space-y-4">
            {about.body.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.05}>
                <p className="text-pretty leading-relaxed text-body-soft sm:text-lg">{p}</p>
              </Reveal>
            ))}
          </div>

          <ul className="mt-9 space-y-5">
            {about.highlights.map((h, i) => (
              <Reveal key={i} delay={0.15 + i * 0.08} as="li">
                <div className="flex gap-4">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-gold-500/40 text-gold-700">
                    <StarMark className="size-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-heading">{h.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-body-soft">{h.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
