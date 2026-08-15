import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/fields";
import { Card, CardContent } from "@/components/ui/card";

export default async function AdminOverviewPage() {
  const [packages, hotels, featuredHotels, testimonials, faqs, promos] = await Promise.all([
    prisma.package.count(),
    prisma.hotel.count(),
    prisma.hotel.count({ where: { featured: true, published: true } }),
    prisma.testimonial.count(),
    prisma.faq.count(),
    prisma.promo.count({ where: { active: true } }),
  ]);

  const tiles = [
    { label: "Packages", value: packages, href: "/admin/packages" },
    { label: "Hotels (featured / total)", value: `${featuredHotels} / ${hotels}`, href: "/admin/hotels" },
    { label: "Testimonials", value: testimonials, href: "/admin/testimonials" },
    { label: "FAQs", value: faqs, href: "/admin/faq" },
    { label: "Active promos", value: promos, href: "/admin/promos" },
  ];

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Packages, hotel rates, the promo banner, testimonials and FAQ are edited here and appear on the live site immediately. Everything else on the page (hero, about, journey, why-us, gallery, footer) is fixed copy — edit it in src/content/am.json and en.json."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <Link key={tile.href} href={tile.href}>
            <Card className="transition-colors hover:bg-accent">
              <CardContent>
                <p className="text-sm text-muted-foreground">{tile.label}</p>
                <p className="mt-1 text-3xl font-semibold text-foreground">{tile.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
