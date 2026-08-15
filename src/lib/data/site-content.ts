import "server-only";
import { prisma } from "@/lib/prisma";
import type { Locale, SiteContent } from "@/lib/content";
import am from "@/content/am.json";
import en from "@/content/en.json";

// Static copy for the sections that don't change day-to-day (hero, about,
// journey, why-us, gallery header, cta, contact, footer, nav) — same shape
// the site originally read from these files. Edit them directly; no
// component or admin change needed.
const staticContent: Record<Locale, typeof am> = { am, en };

// Package category tabs are a code-level concept (the key must match the
// `PackageCategory` enum), so their labels live here too.
const PACKAGE_TABS: Record<Locale, { key: string; label: string }[]> = {
  en: [
    { key: "hajj", label: "Hajj" },
    { key: "umrah", label: "Umrah" },
  ],
  am: [
    { key: "hajj", label: "ሐጅ" },
    { key: "umrah", label: "ዑምራ" },
  ],
};

/**
 * Assembles one full `SiteContent` object for a locale: the admin-editable
 * parts (brand, promos, packages, hotels header, testimonials, faq) come
 * from the database; everything else comes from the static per-locale JSON.
 */
export async function getSiteContent(locale: Locale): Promise<SiteContent> {
  const s = staticContent[locale];

  const [settings, promos, pkgs, testimonials, faqs] = await Promise.all([
    prisma.siteSettings.findUniqueOrThrow({ where: { locale } }),
    prisma.promo.findMany({ where: { locale }, orderBy: { order: "asc" } }),
    prisma.package.findMany({
      where: { locale, active: true },
      orderBy: { order: "asc" },
    }),
    prisma.testimonial.findMany({
      where: { locale, active: true },
      orderBy: { order: "asc" },
    }),
    prisma.faq.findMany({ where: { locale, active: true }, orderBy: { order: "asc" } }),
  ]);

  return {
    brand: {
      name: settings.brandName,
      fullName: settings.brandFullName,
      tagline: settings.tagline,
      bismillah: settings.bismillah,
      bismillahTranslit: settings.bismillahTranslit,
      establishedYear: settings.establishedYear,
      establishedLabel: settings.establishedLabel ?? undefined,
      phone: settings.phone,
      phoneAlt: settings.phoneAlt ?? undefined,
      whatsapp: settings.whatsapp,
      email: settings.email,
      address: settings.address,
      accreditation: settings.accreditation,
      metaTitle: settings.metaTitle ?? undefined,
      metaDescription: settings.metaDescription ?? undefined,
      social: {
        ...(settings.socialFacebook ? { facebook: settings.socialFacebook } : {}),
        ...(settings.socialInstagram ? { instagram: settings.socialInstagram } : {}),
        ...(settings.socialTiktok ? { tiktok: settings.socialTiktok } : {}),
      },
    },
    promos: promos.map((p) => ({
      id: p.id,
      season: p.season,
      active: p.active,
      badge: p.badge,
      title: p.title,
      detail: p.detail,
      cta: { label: p.ctaLabel, href: p.ctaHref },
    })),
    nav: s.nav,
    hero: s.hero as SiteContent["hero"],
    stats: s.stats,
    about: s.about,
    journey: s.journey,
    packages: {
      eyebrow: settings.packagesEyebrow,
      title: settings.packagesTitle,
      subtitle: settings.packagesSubtitle,
      tabs: PACKAGE_TABS[locale],
      items: pkgs.map((p) => ({
        category: p.category,
        name: p.name,
        tier: p.tier,
        price: p.price,
        duration: p.duration,
        summary: p.summary,
        features: p.features as string[],
        featured: p.featured,
      })),
    },
    why: s.why,
    gallery: {
      eyebrow: s.gallery.eyebrow,
      title: s.gallery.title,
      subtitle: s.gallery.subtitle,
      note: s.gallery.note,
    },
    hotels: {
      eyebrow: settings.hotelsEyebrow,
      title: settings.hotelsTitle,
      subtitle: settings.hotelsSubtitle,
      note: settings.hotelsNote,
    },
    testimonials: {
      eyebrow: settings.testimonialsEyebrow,
      title: settings.testimonialsTitle,
      items: testimonials.map((t) => ({
        quote: t.quote,
        name: t.name,
        trip: t.trip,
        rating: t.rating,
      })),
    },
    faq: {
      eyebrow: settings.faqEyebrow,
      title: settings.faqTitle,
      items: faqs.map((f) => ({ q: f.q, a: f.a })),
    },
    cta: s.cta,
    contact: s.contact,
    footer: s.footer,
  };
}
