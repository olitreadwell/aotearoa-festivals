# Changelog

All notable changes to Aotearoa Festivals are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased] — claude/dev

### Iteration 3 additions:

- ISR: festival, artist, promoter, and region detail pages now use `generateStaticParams` + `revalidate = 3600` instead of `force-dynamic`
- Pagination (24/page) on `/festivals`, `/artists`, `/promoters` listing pages, preserving existing filters
- Breadcrumb navigation (`src/components/Breadcrumbs.tsx`) on all detail pages
- iCal export (`/festivals/[slug]/calendar.ics`) — RFC 5545 event, 404s until a festival has a real `startDate`
- Open Graph image per festival (`/festivals/[slug]/opengraph-image`) via `next/og`
- Manual dark mode toggle (`src/components/ThemeToggle.tsx`), layered on top of existing OS-preference dark styling
- Vitest unit tests for `formatRegion`, `formatStatus`, `slugify`, and a `festivals-seed.json` data validator (233 tests)
- 7 verified festival websites added to seed data (Bay of Islands Jazz & Blues, Rhythm and Vines, Marton Country Music Festival, Electric Avenue, Tora Bombora, Southern Sounds, Parklands)

### Added

- `BACKLOG.md` — living feature backlog, updated each loop iteration
- `CHANGELOG.md` — this file
- Festival listing page (`/festivals`) with region and status filter controls
- Festival detail page (`/festivals/[slug]`) displaying lineup and promoter information
- Artist listing page (`/artists`) with genre filter
- Artist detail page (`/artists/[slug]`) showing bio and festival history
- Promoter listing page (`/promoters`)
- Promoter detail page (`/promoters/[slug]`) listing associated festivals
- Site-wide navigation bar added to root layout
- Festival seed data enriched with website URLs and new festival entries
- `README.md` updated with full routes documentation

### Iteration 2 additions:

- Region pages (`/regions`, `/regions/[region]`) with festival listings and subscribe CTA
- Fuzzy search page (`/search`) powered by Fuse.js, client-side instant results
- RSS feed (`/feed.xml`) for upcoming ACTIVE/TBC festivals
- Email subscription API (`/api/subscribe`, `/api/unsubscribe`) with token-based unsubscribe
- Sitemap (`/sitemap.xml`) covering all festivals, artists, and promoters
- Improved home page: upcoming festivals grid, stats, region browsing
- Nav updated with Regions and Search links; site footer added
- Shared format helpers (`src/lib/format.ts`) extracted from duplicate inline code

---

## [0.1.0] — Initial scaffold

### Added

- Next.js 16 App Router project with TypeScript, Tailwind 4, React 19
- Prisma 6 schema: `Festival`, `Artist`, `Promoter`, `LineupEntry`, `User`, `EmailSubscription`
- 61 NZ festival seed records in `prisma/data/festivals-seed.json`
- Home page showing festival/promoter/artist counts
- Vitest + Playwright + axe accessibility testing setup
- Husky pre-push hooks (lint, typecheck, format, test)
- Renovate dependency management
