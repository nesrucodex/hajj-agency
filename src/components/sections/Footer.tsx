"use client";

import Link from "next/link";
import { useSite } from "@/lib/locale";
import { Container } from "@/components/ui";
import { StarMark, socialIcons } from "@/components/icons";

export default function Footer() {
  const { t } = useSite();
  const { footer, brand } = t;

  return (
    <footer className="relative overflow-hidden border-t border-gold-500/15 bg-emerald-950 text-cream">
      <div className="arabesque pointer-events-none absolute inset-0 opacity-[0.04]" />
      <Container className="relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* brand */}
          <div>
            <Link href="#top" className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full border border-gold-500/40 text-gold-400">
                <StarMark className="size-5" />
              </span>
              <span className="logo-text text-xl text-cream">{brand.name}</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-soft">
              {footer.blurb}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {Object.entries(brand.social).map(([key, url]) => {
                const Icon = socialIcons[key];
                if (!Icon) return null;
                return (
                  <Link
                    key={key}
                    href={url}
                    aria-label={key}
                    className="grid size-9 place-items-center rounded-full border border-gold-500/25 text-cream-soft transition-colors hover:border-gold-400 hover:text-gold-300"
                  >
                    <Icon className="size-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* link columns */}
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow text-gold-400/80">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream-soft transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="gold-rule mt-12" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-cream-soft/70 sm:flex-row">
          <p>© {new Date().getFullYear()} {brand.fullName}.</p>
          <p className="max-w-xl text-center sm:text-right">{footer.legal}</p>
        </div>
      </Container>
    </footer>
  );
}
