/**
 * Central content shape. Every string, price and label on the marketing page
 * is read from the database (see `src/lib/data/site-content.ts`, which
 * assembles a `SiteContent` object per locale from Prisma) and is editable
 * from `/admin`. The types below describe that shape so editors get
 * autocomplete and the build fails fast if the data drifts.
 *
 * `src/content/am.json` / `en.json` / `gallery.json` are kept on disk as the
 * historical reference the database was first seeded from — see
 * `prisma/seed-data.ts` — but are no longer imported at runtime.
 */

export const LOCALES = ["am", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "am";

export const LOCALE_LABELS: Record<Locale, string> = {
  am: "አማርኛ",
  en: "English",
};

export type Cta = { label: string; href: string };

export interface SiteContent {
  brand: {
    name: string;
    fullName: string;
    tagline: string;
    bismillah: string;
    bismillahTranslit: string;
    establishedYear: string;
    establishedLabel?: string;
    phone: string;
    phoneAlt?: string;
    whatsapp: string;
    email: string;
    address: string;
    accreditation: string;
    social: Record<string, string>;
    metaTitle?: string;
    metaDescription?: string;
  };
  promos: {
    id: string;
    season: "hajj" | "ramadan" | "default";
    active: boolean;
    badge: string;
    title: string;
    detail: string;
    cta: Cta;
  }[];
  nav: { links: Cta[]; cta: Cta };
  hero: {
    eyebrow: string;
    titleLines: string[];
    subtitle: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    media: { type: "image" | "video"; src: string; poster?: string; alt: string }[];
    verse: { arabic: string; translation: string; reference: string };
  };
  stats: { value: string; label: string }[];
  about: {
    eyebrow: string;
    title: string;
    body: string[];
    highlights: { title: string; text: string }[];
  };
  journey: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: { number: string; title: string; text: string }[];
  };
  packages: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tabs: { key: string; label: string }[];
    items: {
      category: string;
      name: string;
      tier: string;
      price: string;
      duration: string;
      summary: string;
      features: string[];
      featured: boolean;
    }[];
  };
  why: {
    eyebrow: string;
    title: string;
    features: { icon: string; title: string; text: string }[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    note: string;
  };
  hotels: {
    eyebrow: string;
    title: string;
    subtitle: string;
    note: string;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: { quote: string; name: string; trip: string; rating: number }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  cta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primary: Cta;
    secondary: Cta;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    form: {
      fields: {
        name: string;
        label: string;
        type: string;
        placeholder?: string;
        options?: string[];
      }[];
      submitLabel: string;
    };
  };
  footer: {
    blurb: string;
    columns: { title: string; links: Cta[] }[];
    legal: string;
  };
}

/** Shared (non-localized) gallery item — see `src/lib/data/gallery.ts`. */
export interface GalleryItem {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  alt?: string;
  caption?: string;
  span?: string;
}

/** Published hotel with its rates — see `src/lib/data/hotels.ts`. */
export interface HotelRate {
  dayType: "WD" | "WE" | "ALL";
  dbl?: number;
  trp?: number;
  quad?: number;
}

export interface Hotel {
  id: string;
  city: "makkah" | "madinah";
  name: string;
  nameAr?: string;
  stars?: number;
  featured: boolean;
  periodFrom?: string;
  periodTo?: string;
  breakfast?: string;
  lunch?: string;
  haramView?: string;
  kaabaView?: string;
  currency: string;
  rates: HotelRate[];
}
