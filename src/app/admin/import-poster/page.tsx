"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface ArtistResult {
  name: string;
  exists: boolean;
  slug?: string;
}

interface ExtractionResult {
  artists: ArtistResult[];
  rawText: string;
}

export default function ImportPosterPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [festivalName, setFestivalName] = useState("");
  const [festivalYear, setFestivalYear] = useState(
    new Date().getFullYear().toString(),
  );
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleExtract() {
    setError("");
    setResult(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/import-poster", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageUrl: url,
            festival: festivalName,
            year: parseInt(festivalYear),
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Extraction failed");
        setResult(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      }
    });
  }

  async function handleSave() {
    if (!result) return;
    setError("");
    startTransition(async () => {
      try {
        const res = await fetch("/api/import-poster", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            festival: festivalName,
            year: parseInt(festivalYear),
            artists: result.artists.map((a) => a.name),
          }),
        });
        if (!res.ok) throw new Error("Save failed");
        router.push("/festivals");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Save error");
      }
    });
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Import Poster</h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Paste a festival poster image URL. AI extracts the lineup.
      </p>

      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium">Poster Image URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/poster.jpg"
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-[#111]"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">Festival Name</label>
            <input
              type="text"
              value={festivalName}
              onChange={(e) => setFestivalName(e.target.value)}
              placeholder="e.g. Twominds Festival"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-[#111]"
            />
          </div>
          <div className="w-32">
            <label className="block text-sm font-medium">Year</label>
            <input
              type="number"
              value={festivalYear}
              onChange={(e) => setFestivalYear(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-[#111]"
            />
          </div>
        </div>

        {url && (
          <div className="rounded-lg border p-2 dark:border-gray-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt="Poster preview"
              className="max-h-64 w-full rounded object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}

        <button
          onClick={handleExtract}
          disabled={isPending || !url || !festivalName}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Extracting..." : "Extract Lineup"}
        </button>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold">
              Extracted {result.artists.length} Artists
            </h2>
            <ul className="space-y-1">
              {result.artists.map((a, i) => (
                <li
                  key={i}
                  className={`rounded-lg border px-4 py-2 text-sm ${
                    a.exists
                      ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                      : "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20"
                  }`}
                >
                  <span className="font-medium">{a.name}</span>
                  <span className="ml-2 text-xs">
                    {a.exists ? "✓ In database" : "+ New artist"}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleSave}
              disabled={isPending}
              className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {isPending
                ? "Saving..."
                : `Save ${result.artists.length} Lineup Entries`}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
