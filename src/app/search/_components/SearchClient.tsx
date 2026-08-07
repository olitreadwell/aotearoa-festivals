"use client";
import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import Link from "next/link";

export type SearchItem = {
  type: "festival" | "artist" | "promoter";
  name: string;
  slug: string;
  subtitle: string;
  status?: string; // FestivalStatus string for festival items
};

const TYPE_BADGE_STYLES: Record<SearchItem["type"], string> = {
  festival: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  artist:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  promoter:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
};

export function SearchClient({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["name", "subtitle"],
        threshold: 0.3,
        includeScore: true,
      }),
    [items],
  );

  const results =
    query.length > 0
      ? fuse.search(query).map((r) => r.item)
      : items.slice(0, 20);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Search input */}
      <div className="relative mb-4">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search festivals, artists, promoters..."
          autoFocus
          className="w-full rounded-xl border border-gray-300 bg-white py-3 pr-4 pl-11 text-base shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#111] dark:text-[#ededed] dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
        />
      </div>

      {/* Result count */}
      <p
        className="mb-5 text-sm text-[#555] dark:text-[#aaa]"
        role="status"
        aria-live="polite"
      >
        {query
          ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
          : `${items.length} total — showing first 20`}
      </p>

      {/* Results list */}
      {results.length > 0 ? (
        <ul role="list" className="flex flex-col gap-2">
          {results.map((item) => (
            <li key={`${item.type}-${item.slug}`}>
              <Link
                href={`/${item.type}s/${item.slug}`}
                className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-150 hover:border-blue-400 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:border-gray-700 dark:bg-[#111] dark:hover:border-blue-500"
              >
                {/* Type badge */}
                <span
                  className={`mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${TYPE_BADGE_STYLES[item.type]}`}
                >
                  {item.type}
                </span>

                {/* Festival status badge */}
                {item.status && (
                  <span
                    className={`mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      item.status === "ACTIVE"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : item.status === "Dates TBC"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                          : item.status === "HIATUS"
                            ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                            : item.status === "DEFUNCT"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                    }`}
                  >
                    {item.status.charAt(0) + item.status.slice(1).toLowerCase()}
                  </span>
                )}

                {/* Name + subtitle */}
                <div className="min-w-0 flex-1">
                  <strong className="block leading-snug font-semibold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {item.name}
                  </strong>
                  {item.subtitle && (
                    <span className="mt-0.5 block text-sm text-[#555] dark:text-[#aaa]">
                      {item.subtitle}
                    </span>
                  )}
                </div>

                {/* Arrow */}
                <svg
                  aria-hidden="true"
                  className="mt-1 h-4 w-4 shrink-0 text-gray-400 transition-colors group-hover:text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center text-[#555] dark:border-gray-600 dark:text-[#aaa]">
          <p className="text-sm">
            No results for &ldquo;{query}&rdquo;. Try a different search term.
          </p>
        </div>
      )}
    </div>
  );
}
