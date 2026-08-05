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

## In Progress (Iteration 3)

### Pages & Routes

- [ ] `generateStaticParams` + ISR (`revalidate`) for festival/artist/promoter/region detail pages
- [ ] Pagination on `/festivals`, `/artists`, `/promoters` listing pages
- [ ] Breadcrumb navigation on detail pages
- [ ] iCal export for individual festivals (`/festivals/[slug]/calendar.ics`)
- [ ] Open Graph images per festival (`opengraph-image.tsx`)
- [ ] Dark mode toggle (manual override on top of existing OS-preference CSS)

### Data & Seed

- [x] Add verified websites for 7 festivals still missing links (Bay of Islands Jazz & Blues, Rhythm and Vines, Marton Country Music Festival, Electric Avenue, Tora Bombora, Southern Sounds, Parklands)

### Tests & Infrastructure

- [ ] Vitest unit tests for `formatRegion`, `formatStatus`, `slugify`, and a seed data validator

---

## Queued

### Pages & Routes

- [ ] Admin dashboard (role-gated) — approve submitted festivals, manage records
- [ ] Festival submission form — public submit with admin approval queue
- [ ] Artist claim flow — organiser can link their artist profile

### Data & Seed

- [ ] Add remaining websites for festivals still missing links (11 entries: High Tide Festival, Carlucci Carnival, 8th Wonder, Rippon Festival/Tuki Festival, Big Day Out (NZ), Raggamuffin Music Festival, Wanderlust NZ, Oasis Festival, Golden Lights Music Festival, Urban Jungle, Aum NYE Festival — no verifiable official domain found this pass)
- [ ] Add promoter records (Fuzen NZ, Audiology Touring, Rhythm & Vines Ltd, etc.)
- [ ] Add artist records for known headliners (Alison Wonderland, Andy C, Clean Bandit…)
- [ ] Add lineup entries linking artists to festivals and years
- [ ] Add Ultra New Zealand details (April 2026, Wellington Waterfront, EDM)
- [ ] Region normalisation: "East Coast" → GISBORNE, "Nelson-Tasman" → split to TASMAN/NELSON
- [ ] Scrape/import RA NZ events to supplement electronic festival data

### UI / UX

- [ ] Festival status badge component — consistent colour system across all pages
- [ ] Upcoming vs past festival split on listing page (use `startDate` field)
- [ ] Map view of NZ festivals by region (static SVG of NZ or Leaflet)
- [ ] Accessibility audit pass (axe — pre-push hook wired, E2E tests pending)

### Performance & Infrastructure

- [ ] `use cache` on Prisma queries (Next.js 16 cache components when stable)
- [ ] Playwright E2E tests for listing and detail pages
- [ ] Renovate dependency PRs — review queued updates
