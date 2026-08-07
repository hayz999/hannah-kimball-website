import type { MetadataRoute } from "next";
import { getCompositions, getArrangements } from "@/lib/data";

const siteUrl = "https://hannahkimballmusic.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [compositions, arrangements] = await Promise.all([
    getCompositions(),
    getArrangements(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "yearly", priority: 0.6 },
    {
      url: `${siteUrl}/choral-directing`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${siteUrl}/vocalist`, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${siteUrl}/compositions`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/arrangements`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const compositionRoutes: MetadataRoute.Sitemap = compositions.map(
    (song) => ({
      url: `${siteUrl}/compositions/${song.id}`,
      changeFrequency: "yearly",
      priority: 0.6,
    }),
  );

  const arrangementRoutes: MetadataRoute.Sitemap = arrangements.map(
    (song) => ({
      url: `${siteUrl}/arrangements/${song.id}`,
      changeFrequency: "yearly",
      priority: 0.6,
    }),
  );

  return [...staticRoutes, ...compositionRoutes, ...arrangementRoutes];
}
