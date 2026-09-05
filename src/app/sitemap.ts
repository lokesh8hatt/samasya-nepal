import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [problems, categoryRows] = await Promise.all([
    prisma.problem.findMany({
      where: { approved: true },
      select: { id: true, createdAt: true },
    }),
    prisma.problem.findMany({
      where: { approved: true },
      distinct: ["category"],
      select: { category: true },
    }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/problems`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/submit`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categoryRows.map((c) => ({
    url: `${SITE_URL}/category/${encodeURIComponent(c.category)}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const problemRoutes: MetadataRoute.Sitemap = problems.map((p) => ({
    url: `${SITE_URL}/problems/${p.id}`,
    lastModified: p.createdAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...problemRoutes];
}
