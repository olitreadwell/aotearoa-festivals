"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false },
);
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});

type Fest = {
  id: string;
  name: string;
  slug: string;
  latitude: number;
  longitude: number;
  genre: string | null;
  region: string | null;
  status: string;
};

export default function HomeMap({ festivals }: { festivals: Fest[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    import("leaflet/dist/leaflet.css");
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-full w-full bg-muted animate-pulse" />;

  return (
    <MapContainer
      center={[-40.9, 174.9]}
      zoom={6}
      minZoom={5}
      maxZoom={12}
      className="h-full w-full"
      zoomControl={false}
      scrollWheelZoom={false}
      dragging={false}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      {festivals.map((f) => (
        <Marker key={f.id} position={[f.latitude, f.longitude]}>
          <Popup>
            <a href={`/festivals/${f.slug}`} className="text-sm font-medium">
              {f.name}
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
