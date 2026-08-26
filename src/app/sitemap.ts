import type { MetadataRoute } from "next";

import { NAV, SITE } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE.domain,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...NAV.map((item) => ({
      url: `${SITE.domain}${item.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE.domain}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
