import type { MetadataRoute } from "next";

const SITE_URL = "https://gorabelu.example"; // TODO: replace with the real domain

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
