# Changelog

All notable changes to Aotearoa Festivals are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased] — claude/feature-backlog-de73gs

### Festival season planning

- `/plan` — upcoming festivals grouped by NZ season (Summer/Autumn/Winter/Spring), with a "Dates TBC" section for unconfirmed dates
- Two-tier plan status — each festival can be marked **Interested** or **Planned**; "My plan" and "Interested" sections on `/plan` line them up by date
- **Build your season** tool — live non-overlapping itinerary; strategy shown as selectable cards (**most festivals** / **biggest crowds** by attendance / **small & intimate**), filters for region (North/South/all NZ), genre (festival tag or lineup artist genres), camping, minimum days, and max count; rows show camping, estimated attendance, duration, and ticket price where known; one-click "Add all to my plan"
- New `attendance` field (estimated crowd size) — powers the biggest/small-intimate strategies; 27 festivals seeded with estimates, null = unknown
- Plan status picker on the home dashboard, festival detail pages, and the plan page; nav shows a saved count badge
- `getSeasonForDate`/`groupFestivalsBySeason` helpers with NZ summer spanning the year boundary (e.g. "Summer 25/26")
- `buildFestivalItinerary`/`filterFestivalsForPlanner` weighted interval-scheduling helpers with unit tests
- `formatDateRange` helper for "28–30 Dec 2026" style date ranges

### Added

- New Festival fields: `vibe` (genre/atmosphere summary), `camping` (boolean), `ticketPrice` (price range text), `ticketUrl` (ticketing link)
- Festival detail page shows vibe, camping, and ticket info when populated
- Seed data validation tests for new optional fields
- Seed data: Bay of Islands Jazz & Blues and Rhythm and Vines populated with new fields
- Extract `FestivalStatusBadge` component — eliminates 4 DRY violations across home, festivals/[slug], promoters/[slug], regions/[region]
- Add `robots.ts` with sitemap reference
- Add root `error.tsx` error boundary with retry button
- Add `not-found.tsx` for artists/[slug] and promoters/[slug]
- Widen Node engine to `>=22.17.1` (unblocks v24 LTS)
- Expand BACKLOG.md with 18 code quality audit findings
- Add metadata (title + description) to 9 pages previously missing it
- Add OpenGraph images for home, artist detail, promoter detail, region detail
- Add JSON-LD Festival schema markup on festival detail pages
- Add `robots.ts` with sitemap reference
- Add root `error.tsx` error boundary with retry button
- Add `not-found.tsx` for artists/[slug] and promoters/[slug]
- Add breadcrumb navigation to all listing pages (festivals, artists, promoters, regions, search)
- Add `/about` page with project mission and contribution guide
- Add Regions + About links to site navigation
- Add `FestivalStatusBadge` to artist page festival history entries
- Deduplicate REGION_LABELS in home page (~30 lines removed)
- Enrich Twominds Festival seed data with real RA data (2024+2025 lineups, camping, cost)
- BACKLOG: queue poster-to-lineup AI tool, artist discovery improvements, AI/automation section
- Add interactive SVG map of New Zealand at `/map` — color-coded by festival count per region
- BACKLOG: queue Eventfinda API integration for NZ event data pipeline

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
