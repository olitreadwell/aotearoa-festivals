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
  const [icons, setIcons] = useState<Record<string, unknown>>({});

  useEffect(() => {
    import("leaflet/dist/leaflet.css");
    import("leaflet").then((L) => {
      setMounted(true);
      const colors: Record<string, string> = {
        "Drum & Bass": "#a3172e",
        House: "#6b0f1e",
        Electronic: "#a37710",
        NYE: "#0a4a54",
        Reggae: "#287028",
        Dub: "#287028",
      };
      const ics: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(colors)) {
        ics[k] = L.divIcon({
          className: "",
          html: `<div style="background:${v};width:10px;height:10px;border-radius:50%;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,.3)"></div>`,
          iconSize: [10, 10],
          iconAnchor: [5, 5],
        });
      }
      setIcons(ics);
    });
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
      <TileLayer
        attribution=""
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {festivals.map((f) => (
        <Marker
          key={f.id}
          position={[f.latitude, f.longitude]}
          icon={(icons[f.genre ?? ""] ?? Object.values(icons)[0]) as any}
        >
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
