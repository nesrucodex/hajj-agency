"use client";

import { useSite } from "@/lib/locale";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";

export default function Journey() {
  const { t } = useSite();
  const { journey } = t;

  return (
    <section id="journey" className="relative overflow-hidden bg-emerald-950 py-24 text-cream sm:py-32">
      <div className="arabesque pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="glow-gold pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 opacity-25" />

      <Container className="relative">
        <SectionHeading
          eyebrow={journey.eyebrow}
          title={journey.title}
          subtitle={journey.subtitle}
          tone="light"
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* vertical gold line */}
          <span className="absolute left-[1.65rem] top-2 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-gold-500/0 via-gold-500/50 to-gold-500/0 sm:block" />

          <ol className="space-y-10">
            {journey.steps.map((step, i) => (
              <Reveal key={i} delay={i * 0.08} as="li">
                <div className="flex gap-5 sm:gap-8">
                  <div className="relative shrink-0">
                    <span className="grid size-14 place-items-center rounded-full border border-gold-500/40 bg-emerald-900 font-display text-xl text-gold-400">
                      {step.number}
                    </span>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-display text-2xl text-cream sm:text-[1.7rem]">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-xl leading-relaxed text-cream-soft">
                      {step.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
