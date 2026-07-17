"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSite } from "@/lib/locale";
import { Container, SectionHeading } from "@/components/ui";
import { IconChevron } from "@/components/icons";

export default function Faq() {
  const { t } = useSite();
  const { faq } = t;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="grain relative overflow-hidden bg-surface py-24 sm:py-32">
      <Container className="relative max-w-3xl">
        <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />

        <div className="mt-14 divide-y divide-gold-500/20 border-y border-gold-500/20">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-display text-xl transition-colors sm:text-2xl ${isOpen ? "text-gold-700" : "text-heading"}`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full border border-gold-500/40 text-gold-700 transition-transform duration-300 ${isOpen ? "rotate-180 bg-gold-500/10" : ""}`}
                  >
                    <IconChevron className="size-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 leading-relaxed text-body-soft">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
