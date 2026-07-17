"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSite } from "@/lib/locale";
import { Container, SectionHeading } from "@/components/ui";
import { IconChevron } from "@/components/icons";
import { mediaUrl } from "@/lib/media";
import galleryData from "@/content/gallery.json";

type MediaItem = { type: "image" | "video"; src: string; poster?: string };
const ITEMS = (galleryData as { items: MediaItem[] }).items;

function PlayBadge({ size = "md" }: { size?: "sm" | "md" }) {
  const s = size === "sm" ? "size-10" : "size-14";
  const i = size === "sm" ? "size-4" : "size-5";
  return (
    <span className="pointer-events-none absolute inset-0 grid place-items-center">
      <span
        className={`grid ${s} place-items-center rounded-full border border-gold-400/60 bg-emerald-950/45 backdrop-blur-sm`}
      >
        <svg viewBox="0 0 24 24" className={`${i} fill-gold-300`}>
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </span>
  );
}

/** One tile in the scrolling strip — always shows a still (poster for videos). */
function Tile({
  item,
  onOpen,
}: {
  item: MediaItem;
  onOpen: () => void;
}) {
  const still = mediaUrl(item.type === "video" ? item.poster : item.src);
  return (
    <button
      onClick={onOpen}
      className="group/tile relative h-64 shrink-0 overflow-hidden rounded-2xl border border-gold-500/30 bg-tile shadow-[0_18px_40px_-24px_rgba(11,58,43,0.5)] transition-shadow hover:shadow-[0_24px_50px_-20px_rgba(11,58,43,0.6)] sm:h-[26rem]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={still}
        alt=""
        loading="lazy"
        className="h-full w-auto max-w-none object-cover transition-transform duration-700 group-hover/tile:scale-[1.04]"
      />
      {item.type === "video" && <PlayBadge size="md" />}
    </button>
  );
}

function Row({
  items,
  direction,
  onOpen,
}: {
  items: { item: MediaItem; index: number }[];
  direction: "left" | "right";
  onOpen: (i: number) => void;
}) {
  // duplicate the set so the translateX(-50%) loop is seamless
  const doubled = [...items, ...items];
  const dur = `${Math.max(30, items.length * 3)}s`;
  return (
    <div
      className={`gb-row flex gap-4 ${direction === "left" ? "gb-row-left" : "gb-row-right"}`}
      style={{ "--gb-dur": dur } as React.CSSProperties}
    >
      {doubled.map(({ item, index }, i) => (
        <Tile key={i} item={item} onOpen={() => onOpen(index)} />
      ))}
    </div>
  );
}

function Lightbox({
  index,
  onClose,
  onNav,
}: {
  index: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const item = ITEMS[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNav]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-emerald-950/92 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
    >
      {/* close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-gold-500/40 text-cream transition-colors hover:bg-gold-500/15 sm:right-6 sm:top-6"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {/* prev / next */}
      {(["prev", "next"] as const).map((side) => (
        <button
          key={side}
          onClick={(e) => {
            e.stopPropagation();
            onNav(side === "next" ? 1 : -1);
          }}
          aria-label={side}
          className={`absolute top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-gold-500/40 text-cream transition-colors hover:bg-gold-500/15 ${
            side === "prev" ? "left-3 sm:left-6" : "right-3 sm:right-6"
          }`}
        >
          <IconChevron className={`size-6 ${side === "prev" ? "rotate-90" : "-rotate-90"}`} />
        </button>
      ))}

      {/* content */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex max-h-[85vh] w-auto max-w-[92vw] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "video" ? (
          <video
            key={item.src}
            className="max-h-[85vh] max-w-[92vw] rounded-2xl border border-gold-500/30"
            controls
            autoPlay
            loop
            playsInline
            poster={mediaUrl(item.poster)}
          >
            <source src={mediaUrl(item.src)} type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mediaUrl(item.src)}
            alt=""
            className="max-h-[85vh] max-w-[92vw] rounded-2xl border border-gold-500/30 object-contain"
          />
        )}
      </motion.div>

      {/* counter */}
      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-gold-500/30 bg-emerald-950/60 px-4 py-1.5 text-xs tracking-wider text-cream-soft">
        {index + 1} / {ITEMS.length}
      </span>
    </motion.div>
  );
}

export default function Gallery() {
  const { t } = useSite();
  const { gallery } = t;
  const [active, setActive] = useState<number | null>(null);

  const rowA = ITEMS.map((item, index) => ({ item, index })).filter((_, i) => i % 2 === 0);
  const rowB = ITEMS.map((item, index) => ({ item, index })).filter((_, i) => i % 2 === 1);

  const nav = useCallback(
    (dir: 1 | -1) =>
      setActive((cur) => (cur === null ? cur : (cur + dir + ITEMS.length) % ITEMS.length)),
    [],
  );

  return (
    <section id="gallery" className="grain relative overflow-hidden bg-surface py-24 text-body sm:py-32">
      <div className="arabesque pointer-events-none absolute inset-0 opacity-[0.03]" />
      <Container className="relative">
        <SectionHeading
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          subtitle={gallery.subtitle}
        />
      </Container>

      {/* full-bleed scrolling strip */}
      <div className="gb-marquee relative mt-14 flex flex-col gap-4 overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface to-transparent sm:w-24" />
        <Row items={rowA} direction="left" onOpen={setActive} />
        <Row items={rowB} direction="right" onOpen={setActive} />
      </div>

      <p className="mt-10 text-center text-xs italic text-body-soft/70">{gallery.note}</p>

      <AnimatePresence>
        {active !== null && (
          <Lightbox index={active} onClose={() => setActive(null)} onNav={nav} />
        )}
      </AnimatePresence>
    </section>
  );
}
