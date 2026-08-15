import "server-only";
import { prisma } from "@/lib/prisma";
import type { Hotel } from "@/lib/content";

function toHotel(h: {
  id: string;
  city: string;
  name: string;
  nameAr: string | null;
  stars: number | null;
  featured: boolean;
  periodFrom: Date | null;
  periodTo: Date | null;
  breakfast: string | null;
  lunch: string | null;
  haramView: string | null;
  kaabaView: string | null;
  currency: string;
  rates: { dayType: string; dbl: number | null; trp: number | null; quad: number | null }[];
}): Hotel {
  return {
    id: h.id,
    city: h.city as Hotel["city"],
    name: h.name,
    nameAr: h.nameAr ?? undefined,
    stars: h.stars ?? undefined,
    featured: h.featured,
    periodFrom: h.periodFrom?.toISOString() ?? undefined,
    periodTo: h.periodTo?.toISOString() ?? undefined,
    breakfast: h.breakfast ?? undefined,
    lunch: h.lunch ?? undefined,
    haramView: h.haramView ?? undefined,
    kaabaView: h.kaabaView ?? undefined,
    currency: h.currency,
    rates: h.rates.map((r) => ({
      dayType: r.dayType as Hotel["rates"][number]["dayType"],
      dbl: r.dbl ?? undefined,
      trp: r.trp ?? undefined,
      quad: r.quad ?? undefined,
    })),
  };
}

/** Published hotels for the public "Hotels" section, grouped implicitly by city/order. */
export async function getPublishedHotels(): Promise<Hotel[]> {
  const hotels = await prisma.hotel.findMany({
    where: { published: true },
    orderBy: [{ city: "asc" }, { order: "asc" }],
    include: { rates: true },
  });
  return hotels.map(toHotel);
}
