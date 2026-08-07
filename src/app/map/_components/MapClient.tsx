"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Region } from "@/generated/prisma";
import { formatRegion } from "@/lib/format";

// Dynamically import Leaflet to avoid SSR window errors
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false },
);
const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false },
);

interface FestivalMarker {
  id: string;
  name: string;
  slug: string;
  latitude: number;
  longitude: number;
  genre: string | null;
  region: Region | null;
  status: string;
}

// NZ center: roughly Waikato
const NZ_CENTER: [number, number] = [-40.9, 174.9];
const NZ_ZOOM = 6;
const NZ_BOUNDS: [[number, number], [number, number]] = [
  [-47.5, 166.0],
  [-34.0, 179.0],
];

export default function MapPage({
  festivals,
}: {
  festivals: FestivalMarker[];
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Import Leaflet CSS only on client
    import("leaflet/dist/leaflet.css");
  }, []);

  if (!mounted) {
    return (
      <main className="mx-auto min-h-screen max-w-6xl px-4 py-8" role="main" aria-label="Festival map loading">
        <h1 className="text-3xl font-bold">Festival Map</h1>
        <div className="mt-8 h-96 animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-800" aria-busy="true" />
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-full px-0 py-0 sm:px-4 sm:py-8" role="main" aria-label="Interactive festival map of New Zealand">
      <div className="sm:mb-6 sm:px-0 px-4 py-4">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Festival Map
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {festivals.length} festival{festivals.length !== 1 ? "s" : ""} mapped
        </p>
      </div>

      <div
        className="relative overflow-hidden rounded-none sm:rounded-xl border-0 sm:border border-neutral-200 dark:border-neutral-700"
        style={{ height: "calc(100dvh - 8rem)" }}
        role="application"
        aria-label="Map showing New Zealand festival locations"
      >
        <MapContainer
          center={NZ_CENTER}
          zoom={NZ_ZOOM}
          maxBounds={NZ_BOUNDS}
          minZoom={5}
          maxZoom={14}
          className="h-full w-full"
          zoomControl={true}
          scrollWheelZoom={true}
          aria-label="Interactive map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {festivals.map((f) => (
            <Marker
              key={f.id}
              position={[f.latitude, f.longitude]}
              title={f.name}
              alt={`${f.name} festival marker`}
              keyboard={true}
            >
              <Popup>
                <div className="min-w-[180px] text-sm" role="dialog" aria-label={f.name}>
                  <strong className="block text-base">{f.name}</strong>
                  {f.genre && (
                    <span className="block text-neutral-500">{f.genre}</span>
                  )}
                  {f.region && (
                    <span className="block text-neutral-400 text-xs">
                      {formatRegion(f.region)}
                    </span>
                  )}
                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      f.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : f.status === "TBC"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    {f.status}
                  </span>
                  <Link
                    href={`/festivals/${f.slug}`}
                    className="mt-2 block text-blue-600 hover:underline font-medium"
                  >
                    View festival →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Accessible text fallback — festival list below map */}
      <section className="mt-8 px-4 sm:px-0" aria-label="Festival list">
        <h2 className="text-lg font-semibold">All festivals</h2>
        <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {festivals.map((f) => (
            <li key={f.id}>
              <Link
                href={`/festivals/${f.slug}`}
                className="flex items-center justify-between rounded-lg border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800/50"
              >
                <span>{f.name}</span>
                {f.region && (
                  <span className="text-xs text-neutral-400">{formatRegion(f.region)}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
