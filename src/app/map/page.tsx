import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Breadcrumbs from "@/components/Breadcrumbs";
import MapClient from "./_components/MapClient";

export const metadata: Metadata = {
  title: "Festival Map — Aotearoa Festivals",
  description:
    "Explore New Zealand music festivals on an interactive map.",
};

export const revalidate = 3600;

export default async function MapPage() {
  const festivals = await prisma.festival.findMany({
    where: {
      approved: true,
      latitude: { not: null },
      longitude: { not: null },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      latitude: true,
      longitude: true,
      genre: true,
      region: true,
      status: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-4 sm:pt-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Map" },
          ]}
        />
      </div>
      <MapClient
        festivals={festivals.map((f) => ({
          id: f.id,
          name: f.name,
          slug: f.slug,
          latitude: f.latitude!,
          longitude: f.longitude!,
          genre: f.genre,
          region: f.region,
          status: f.status,
        }))}
      />
    </>
  );
}
