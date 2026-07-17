"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useSite } from "@/lib/locale";
import { Container } from "@/components/ui";
import { IconArrow, IconChevron, StarMark } from "@/components/icons";
import { MosqueFrame } from "@/components/MosqueFrame";
import { mediaUrl } from "@/lib/media";

const EASE = [0.22, 1, 0.36, 1] as const;

type Media = { type: "image" | "video"; src: string; poster?: string; alt: string };

function HeroMedia({ item }: { item: Media }) {
  return (
    <>
      {item.type === "video" ? (
        <video
          className="h-full w-full object-cover [transform:translateZ(0)] [backface-visibility:hidden]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={mediaUrl(item.poster)}
          aria-label={item.alt}
        >
          <source src={mediaUrl(item.src)} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={mediaUrl(item.src)} alt={item.alt} className="h-full w-full object-cover" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent" />
    </>
  );
}

export default function Hero() {
  const { t } = useSite();
  const { hero, brand } = t;

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-emerald-950 text-cream"
    >
      {/* atmosphere */}
      <div className="arabesque pointer-events-none absolute inset-0 opacity-[0.06]" />
      <div className="glow-gold pointer-events-none absolute -top-40 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-950/0 via-emerald-950/30 to-emerald-950" />

      <Container className="relative grid min-h-screen items-center gap-12 pb-24 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-28">
        {/* ---- copy ---- */}
        <div className="flex flex-col">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="font-arabic text-2xl text-gold-300/90 sm:text-3xl"
          >
            {brand.bismillah}
          </motion.p>

          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            className="eyebrow gold-text mt-6 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gold-500/60" />
            {hero.eyebrow}
          </motion.span>

          <h1 className="font-display mt-5 text-[3.1rem] leading-[0.98] tracking-tight sm:text-7xl lg:text-[5rem]">
            {hero.titleLines.map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35 + i * 0.15, ease: EASE }}
                className={`block ${i === hero.titleLines.length - 1 ? "gold-text italic" : "text-cream"}`}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-cream-soft sm:text-lg"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href={hero.primaryCta.href}
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-b from-gold-400 to-gold-700 px-8 py-4 text-sm font-medium text-emerald-950 shadow-[0_14px_40px_-12px_rgba(212,184,120,0.7)] transition-all duration-300 hover:-translate-y-0.5"
            >
              {hero.primaryCta.label}
              <IconArrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/40 px-8 py-4 text-sm font-medium text-cream transition-colors hover:border-gold-400 hover:bg-gold-500/10"
            >
              {hero.secondaryCta.label}
            </Link>
          </motion.div>
        </div>

        {/* ---- arched media: two staggered clips ---- */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[1/1.02] w-full">
            {/* back clip — top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: EASE }}
              className="absolute right-0 top-0 w-[54%]"
            >
              <MosqueFrame
                outline={false}
                className="aspect-[4/5] w-full [filter:drop-shadow(0_26px_44px_rgba(0,0,0,0.5))]"
              >
                <HeroMedia item={hero.media[1] ?? hero.media[0]} />
              </MosqueFrame>
            </motion.div>

            {/* front clip — bottom left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.62, ease: EASE }}
              className="absolute bottom-0 left-0 z-20 w-[60%]"
            >
              <MosqueFrame className="aspect-[4/5] w-full [filter:drop-shadow(0_36px_56px_rgba(0,0,0,0.6))]">
                <HeroMedia item={hero.media[0]} />
              </MosqueFrame>
            </motion.div>

            {/* floating verse badge */}
            <motion.figure
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
              className="absolute -bottom-3 right-0 z-30 max-w-[12.5rem] rounded-2xl border border-gold-500/25 bg-emerald-900/95 p-3.5 backdrop-blur-md"
            >
              <p className="font-arabic text-right text-base leading-relaxed text-gold-300">
                {hero.verse.arabic}
              </p>
              <figcaption className="mt-1.5 text-[0.7rem] leading-snug text-cream-soft">
                {hero.verse.translation}
                <span className="mt-0.5 block text-gold-400/80">
                  {hero.verse.reference}
                </span>
              </figcaption>
            </motion.figure>

            {/* rotating star accent */}
            <motion.div
              className="absolute left-1 top-4 text-gold-500/50"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 44, ease: "linear" }}
            >
              <StarMark className="size-8" />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
