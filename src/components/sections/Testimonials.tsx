"use client";

import { useSite } from "@/lib/locale";
import { Container, SectionHeading } from "@/components/ui";
import { Stagger, RevealItem } from "@/components/motion";
import { IconQuote, IconStar } from "@/components/icons";

export default function Testimonials() {
  const { t } = useSite();
  const { testimonials } = t;

  return (
    <section id="testimonials" className="grain relative overflow-hidden bg-surface-2 py-24 sm:py-32">
      <Container className="relative">
        <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} />

        <Stagger className="mt-16 grid gap-6 lg:grid-cols-3" gap={0.12}>
          {testimonials.items.map((item, i) => (
            <RevealItem key={i}>
              <figure className="relative flex h-full flex-col rounded-2xl border border-heading/10 bg-surface p-8 shadow-[0_30px_60px_-45px_rgba(11,58,43,0.4)]">
                <IconQuote className="size-9 text-gold-500/40" />
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: item.rating }).map((_, s) => (
                    <IconStar key={s} className="size-4 text-gold-500" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-body">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-gold-500/20 pt-4">
                  <span className="font-display block text-lg text-heading">
                    {item.name}
                  </span>
                  <span className="text-xs text-gold-700">{item.trip}</span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
