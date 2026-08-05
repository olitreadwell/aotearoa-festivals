# Aotearoa Festivals — Backlog

_Updated automatically each loop iteration. Items move from Queued → In Progress → Done._

---

## Done (Iteration 1)

- [x] Festival listing page (`/festivals`) — browse all festivals with region/genre/status filters
- [x] Festival detail page (`/festivals/[slug]`) — full festival info, lineup, links
- [x] Artist listing + detail pages (`/artists`, `/artists/[slug]`)
- [x] Promoter listing + detail pages (`/promoters`, `/promoters/[slug]`)
- [x] Shared nav bar + improved root layout
- [x] Enrich seed data — websites added (Twisted Frequency, Soundsplash, Bay Dreams, Splore…); Ultra NZ added
- [x] CHANGELOG.md and BACKLOG.md created
- [x] README updated with routes

---

## Done (Iteration 2)

- [x] Region pages (`/regions/[region]`) — browse all festivals in a NZ region, with email subscribe CTA
- [x] Search page (`/search`) — fuzzy search across festivals, artists, promoters (Fuse.js already installed)
- [x] RSS feed route (`/feed.xml`) — upcoming festivals atom feed (`feed` package already installed)
- [x] Email subscribe/unsubscribe pages and API routes — token-based unsubscribe flow
- [x] Home page improved — upcoming festivals grid, stats, region browsing links
- [x] Nav updated — Regions and Search links added; site footer added
- [x] Sitemap (`/sitemap.xml`) — dynamic sitemap covering festivals, artists, and promoters
- [x] Shared format helpers extracted to `src/lib/format.ts` — removed duplicate inline code

---

## Queued

### Pages & Routes

- [ ] Admin dashboard (role-gated) — approve submitted festivals, manage records
- [ ] Festival submission form — public submit with admin approval queue
- [ ] Artist claim flow — organiser can link their artist profile

### Data & Seed

- [ ] Add websites for festivals still missing links (~25 entries)
- [ ] Add promoter records (Fuzen NZ, Audiology Touring, Rhythm & Vines Ltd, etc.)
- [ ] Add artist records for known headliners (Alison Wonderland, Andy C, Clean Bandit…)
- [ ] Add lineup entries linking artists to festivals and years
- [ ] Add Ultra New Zealand details (April 2026, Wellington Waterfront, EDM)
- [ ] Region normalisation: "East Coast" → GISBORNE, "Nelson-Tasman" → split to TASMAN/NELSON
- [ ] Scrape/import RA NZ events to supplement electronic festival data

### UI / UX

- [ ] Dark mode toggle (CSS var foundation already in globals.css)
- [ ] Festival status badge component — consistent colour system across all pages
- [ ] Upcoming vs past festival split on listing page (use `startDate` field)
- [ ] Map view of NZ festivals by region (static SVG of NZ or Leaflet)
- [ ] iCal export for individual festivals (`/festivals/[slug]/calendar.ics`)
- [ ] Open Graph / social share cards per festival (`generateMetadata` already used)
- [ ] Breadcrumb navigation on detail pages
- [ ] Pagination or infinite scroll on listing pages (currently loads all)
- [ ] Accessibility audit pass (axe — pre-push hook wired, E2E tests pending)

### Performance & Infrastructure

- [ ] `use cache` on Prisma queries (Next.js 16 cache components when stable)
- [ ] `generateStaticParams` for festival/artist/promoter detail pages (currently force-dynamic)
- [ ] Playwright E2E tests for listing and detail pages
- [ ] Vitest unit tests for seed data parser/validator, slug helper, region formatter
- [ ] Renovate dependency PRs — review queued updates
