"use client";

import { useState } from "react";
import Link from "next/link";
import { useSite } from "@/lib/locale";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import {
  IconPhone,
  IconMail,
  IconPin,
  IconWhatsapp,
  IconCheck,
  IconArrow,
  socialIcons,
  StarMark,
} from "@/components/icons";

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full border border-gold-500/30 text-gold-300">
        {icon}
      </span>
      <div>
        <span className="block text-xs uppercase tracking-wider text-cream-soft/70">
          {label}
        </span>
        <span className="text-cream">{value}</span>
      </div>
    </div>
  );
  return href ? (
    <Link href={href} className="transition-opacity hover:opacity-80">
      {body}
    </Link>
  ) : (
    body
  );
}

export default function Contact() {
  const { t } = useSite();
  const { contact, brand } = t;
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden bg-emerald-950 py-24 text-cream sm:py-32">
      <div className="arabesque pointer-events-none absolute inset-0 opacity-[0.05]" />
      <Container className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* info */}
        <div>
          <span className="eyebrow gold-text">{contact.eyebrow}</span>
          <h2 className="font-display mt-4 text-4xl leading-[1.05] sm:text-5xl">
            {contact.title}
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-cream-soft">
            {contact.subtitle}
          </p>

          <div className="mt-10 space-y-6">
            <ContactRow
              icon={<IconPhone className="size-5" />}
              label={brand.phoneAlt ? "Tel" : "Phone"}
              value={brand.phone + (brand.phoneAlt ? ` · ${brand.phoneAlt}` : "")}
              href={`tel:${brand.phone.replace(/\s/g, "")}`}
            />
            <ContactRow
              icon={<IconMail className="size-5" />}
              label="Email"
              value={brand.email}
              href={`mailto:${brand.email}`}
            />
            <ContactRow
              icon={<IconPin className="size-5" />}
              label="Address"
              value={brand.address}
            />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, "")}`}
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-b from-gold-400 to-gold-700 px-6 py-3 text-sm font-medium text-emerald-950 transition-transform hover:-translate-y-0.5"
            >
              <IconWhatsapp className="size-5" />
              WhatsApp
            </Link>
            <div className="flex items-center gap-2">
              {Object.entries(brand.social).map(([key, url]) => {
                const Icon = socialIcons[key];
                if (!Icon) return null;
                return (
                  <Link
                    key={key}
                    href={url}
                    aria-label={key}
                    className="grid size-10 place-items-center rounded-full border border-gold-500/30 text-cream-soft transition-colors hover:border-gold-400 hover:text-gold-300"
                  >
                    <Icon className="size-4" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* form */}
        <Reveal>
          <div className="relative rounded-3xl border border-gold-500/25 bg-emerald-900/60 p-7 backdrop-blur-sm sm:p-9">
            {sent ? (
              <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                <span className="grid size-16 place-items-center rounded-full border border-gold-400/50 text-gold-300">
                  <IconCheck className="size-7" />
                </span>
                <StarMark className="mt-6 size-5 text-gold-500/60" />
                <p className="font-display mt-4 text-2xl text-cream">
                  {brand.bismillah}
                </p>
                <p className="mt-3 max-w-xs text-cream-soft">{contact.subtitle}</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-5"
              >
                {contact.form.fields.map((field) => (
                  <div key={field.name} className="flex flex-col gap-2">
                    <label
                      htmlFor={field.name}
                      className="text-xs uppercase tracking-wider text-cream-soft/80"
                    >
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        rows={4}
                        placeholder={field.placeholder}
                        className="resize-none rounded-xl border border-gold-500/25 bg-emerald-950/50 px-4 py-3 text-cream placeholder:text-cream-soft/40 outline-none transition-colors focus:border-gold-400"
                      />
                    ) : field.type === "select" ? (
                      <select
                        id={field.name}
                        name={field.name}
                        className="rounded-xl border border-gold-500/25 bg-emerald-950/50 px-4 py-3 text-cream outline-none transition-colors focus:border-gold-400"
                      >
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt} className="bg-emerald-950">
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="rounded-xl border border-gold-500/25 bg-emerald-950/50 px-4 py-3 text-cream placeholder:text-cream-soft/40 outline-none transition-colors focus:border-gold-400"
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-gold-400 to-gold-700 px-8 py-4 text-sm font-medium text-emerald-950 transition-transform hover:-translate-y-0.5"
                >
                  {contact.form.submitLabel}
                  <IconArrow className="size-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
