import type { MetadataRoute } from "next";
import { vehicles, destinations } from "@/data/vehicles";
export default function sitemap(): MetadataRoute.Sitemap{
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/vehicles`, lastModified: now },
    ...vehicles.map(v=> ({ url: `${base}/vehicles/${v.slug}`, lastModified: now })),
    { url: `${base}/services`, lastModified: now },
    { url: `${base}/destinations`, lastModified: now },
    ...destinations.map(d=> ({ url: `${base}/destinations/${d.slug}`, lastModified: now })),
    { url: `${base}/about`, lastModified: now },
    { url: `${base}/contact`, lastModified: now },
    { url: `${base}/faq`, lastModified: now },
    { url: `${base}/manage`, lastModified: now },
    { url: `${base}/booking`, lastModified: now },
  ];
}
