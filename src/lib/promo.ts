import type { SiteContent } from "./content";

export type Promo = SiteContent["promos"][number];

/**
 * Current month in the Islamic (Umm al-Qura) calendar, 1–12.
 * 9 = Ramadan, 12 = Dhul-Hijjah (Hajj). Returns 0 if unavailable.
 */
export function currentHijriMonth(date: Date): number {
  try {
    const parts = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
      month: "numeric",
    }).formatToParts(date);
    const m = parts.find((p) => p.type === "month")?.value;
    return m ? parseInt(m, 10) : 0;
  } catch {
    return 0;
  }
}

/**
 * Choose the banner that fits the season so we never advertise Hajj in the
 * wrong months. Windows:
 *   - Hajj:    Shawwal → Dhul-Hijjah (Hijri months 10–12), the booking season
 *   - Ramadan: Sha'ban → Ramadan (Hijri months 8–9), Ramadan Umrah
 *   - Otherwise: the year-round Umrah offer ("default")
 * Each promo can be turned off with `active: false`.
 */
export function pickPromo(promos: Promo[], date: Date): Promo | null {
  if (!promos?.length) return null;
  const m = currentHijriMonth(date);
  const active = promos.filter((p) => p.active);
  const bySeason = (s: string) => active.find((p) => p.season === s) ?? null;
  const fallback = bySeason("default");

  if (m >= 10 && m <= 12) return bySeason("hajj") ?? fallback;
  if (m === 8 || m === 9) return bySeason("ramadan") ?? fallback;
  return fallback;
}
