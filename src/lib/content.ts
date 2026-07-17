import am from "@/content/am.json";
import en from "@/content/en.json";

/**
 * Central content source. Every string, price and label on the marketing page
 * is read from the per-locale JSON files in `src/content/`:
 *   - `am.json` → Amharic (default)
 *   - `en.json` → English
 *
 * Edit those files (or swap them out) and the UI reflects the new values — no
 * component changes required. The types below describe the shape so editors get
 * autocomplete and the build fails fast if the JSON drifts.
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
    items: {
      type: "image" | "video";
      src: string;
      poster?: string;
      alt: string;
      caption: string;
      span?: string;
    }[];
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

export const dictionaries: Record<Locale, SiteContent> = {
  am: am as SiteContent,
  en: en as SiteContent,
};

export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export default dictionaries;
