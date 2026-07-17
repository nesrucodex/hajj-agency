"use client";

import { useSite } from "@/lib/locale";
import { Container, SectionHeading } from "@/components/ui";
import { Stagger, RevealItem } from "@/components/motion";
import { featureIcons, IconKaaba } from "@/components/icons";

export default function Why() {
  const { t } = useSite();
  const { why } = t;

  return (
    <section id="why" className="grain relative overflow-hidden bg-surface py-24 sm:py-32">
      <Container className="relative">
        <SectionHeading eyebrow={why.eyebrow} title={why.title} />

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.09}>
          {why.features.map((f, i) => {
            const Icon = featureIcons[f.icon] ?? IconKaaba;
            return (
              <RevealItem key={i}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-heading/10 bg-surface-2 p-7 transition-all duration-400 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_30px_60px_-35px_rgba(11,58,43,0.45)]">
                  <span className="grid size-12 place-items-center rounded-xl border border-gold-500/30 bg-surface text-gold-700 transition-colors duration-400 group-hover:bg-emerald-900 group-hover:text-gold-400">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="font-display mt-5 text-2xl text-heading">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body-soft">{f.text}</p>
                  <span className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full bg-gold-400/0 blur-2xl transition-colors duration-500 group-hover:bg-gold-400/20" />
                </div>
              </RevealItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
