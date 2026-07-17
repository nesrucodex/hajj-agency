import type { MetadataRoute } from "next";

const SITE_URL = "https://gorabelu.example"; // TODO: replace with the real domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
