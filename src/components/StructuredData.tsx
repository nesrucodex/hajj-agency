import en from "@/content/en.json";
import { mediaUrl } from "@/lib/media";

const SITE_URL = "https://gorabelu.example"; // TODO: replace with the real domain
const LOGO = mediaUrl("/assets/image/26.jpg");

/**
 * TravelAgency structured data (JSON-LD) so Google can show rich results:
 * business name, location, rating, languages, social profiles, and offers.
 */
export default function StructuredData() {
  const b = en.brand;
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#organization`,
    name: b.fullName,
    alternateName: "ጎራ በሉ ትራቨል",
    description: en.hero.subtitle,
    url: SITE_URL,
    logo: LOGO,
    image: LOGO,
    telephone: b.phone.replace(/\s/g, ""),
    email: b.email,
    priceRange: "$$",
    foundingDate: "2011",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bole Michael, in front of Zebra Crossing, Jemo 1",
      addressLocality: "Addis Ababa",
      addressCountry: "ET",
    },
    areaServed: ["Ethiopia", "Saudi Arabia", "Makkah", "Madinah"],
    knowsLanguage: ["am", "en", "ar"],
    sameAs: Object.values(b.social),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "128",
    },
    makesOffer: en.packages.items.map((p) => ({
      "@type": "Offer",
      name: p.name,
      category: p.category === "hajj" ? "Hajj" : "Umrah",
      description: p.summary,
      price: p.price.replace(/[^0-9]/g, ""),
      priceCurrency: "USD",
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
