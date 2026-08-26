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
  festival:
    "bg-tangaroa-300/30 text-tangaroa-0 dark:bg-tangaroa-100/70 dark:text-tangaroa-300",
  artist:
    "bg-pohutukawa-300/40 text-pohutukawa-0 dark:bg-pohutukawa-200/20 dark:text-pohutukawa-300",
  promoter:
    "bg-kowhai-300/40 text-kowhai-0 dark:bg-kowhai-100/70 dark:text-kowhai-300",
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
          className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-muted-foreground dark:text-muted-foreground"
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
          className="w-full rounded-xl border border-border bg-card py-3 pr-4 pl-11 text-base shadow-[0_1px_2px_rgba(28,25,23,0.04)] focus:border-primary/50 focus:ring-2 focus:ring-primary/25 focus:outline-none dark:border-border dark:bg-card dark:text-foreground dark:placeholder:text-muted-foreground dark:focus:border-primary/40 dark:focus:ring-primary/30"
        />
      </div>

      {/* Result count */}
      <p
        className="mb-5 text-sm text-muted-foreground dark:text-muted-foreground"
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
                className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-[0_1px_2px_rgba(28,25,23,0.04)] transition-all duration-300 ease-out-expo hover:border-primary/40 hover:shadow-[0_12px_28px_-16px_rgba(28,25,23,0.25)] focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:outline-none dark:border-border dark:bg-card dark:hover:border-primary/40"
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
                        ? "bg-wao-300/30 text-wao-0 dark:bg-wao-100/70 dark:text-wao-400"
                        : item.status === "Dates TBC"
                          ? "bg-kowhai-300/40 text-kowhai-0 dark:bg-kowhai-100/70 dark:text-kowhai-300"
                          : item.status === "HIATUS"
                            ? "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground"
                            : item.status === "DEFUNCT"
                              ? "bg-pohutukawa-300/40 text-pohutukawa-0 dark:bg-pohutukawa-200/20 dark:text-pohutukawa-300"
                              : "bg-tangaroa-300/30 text-tangaroa-0 dark:bg-tangaroa-100/70 dark:text-tangaroa-300"
                    }`}
                  >
                    {item.status.charAt(0) + item.status.slice(1).toLowerCase()}
                  </span>
                )}

                {/* Name + subtitle */}
                <div className="min-w-0 flex-1">
                  <strong className="block leading-snug font-semibold transition-colors group-hover:text-primary dark:group-hover:text-primary">
                    {item.name}
                  </strong>
                  {item.subtitle && (
                    <span className="mt-0.5 block text-sm text-muted-foreground dark:text-muted-foreground">
                      {item.subtitle}
                    </span>
                  )}
                </div>

                {/* Arrow */}
                <svg
                  aria-hidden="true"
                  className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
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
        <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground dark:border-border dark:text-muted-foreground">
          <p className="text-sm">
            No results for &ldquo;{query}&rdquo;. Try a different search term.
          </p>
        </div>
      )}
    </div>
  );
}
