import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://aotearoa-festivals.nz";
  const [festivals, artists, promoters] = await Promise.all([
    prisma.festival.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.artist.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.promoter.findMany({ select: { slug: true, updatedAt: true } }),
  ]);
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: baseUrl + "/festivals",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: baseUrl + "/artists",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: baseUrl + "/promoters",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: baseUrl + "/regions",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: baseUrl + "/search",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...festivals.map((f) => ({
      url: baseUrl + "/festivals/" + f.slug,
      lastModified: f.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...artists.map((a) => ({
      url: baseUrl + "/artists/" + a.slug,
      lastModified: a.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...promoters.map((p) => ({
      url: baseUrl + "/promoters/" + p.slug,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
