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

## Done (Iteration 3)

- [x] `generateStaticParams` + ISR (`revalidate`) for festival/artist/promoter/region detail pages
- [x] Pagination on `/festivals`, `/artists`, `/promoters` listing pages
- [x] Breadcrumb navigation on detail pages
- [x] iCal export for individual festivals (`/festivals/[slug]/calendar.ics`)
- [x] Open Graph images per festival (`opengraph-image.tsx`)
- [x] Dark mode toggle (manual override on top of existing OS-preference CSS)
- [x] Add verified websites for 7 festivals still missing links (Bay of Islands Jazz & Blues, Rhythm and Vines, Marton Country Music Festival, Electric Avenue, Tora Bombora, Southern Sounds, Parklands)
- [x] Vitest unit tests for `formatRegion`, `formatStatus`, `slugify`, and a seed data validator
- [x] Fixed CI `Build` job (needed a real ephemeral Postgres once ISR started querying at build time) and two pre-existing bugs the fix surfaced: an a11y link-contrast violation on three inline empty-state links, and a stale smoke test asserting text from before the iteration-2 home page redesign

---

## In Progress (Iteration 4 — test backfill + new fields)

New policy (see README.md "Testing policy"): every feature gets unit + integration + e2e + a11y + smoke coverage as close to 100% as the feature warrants, TDD/BDD workflow going forward. Backfilling the gap across iterations 1-3 before resuming new feature work.

### Tests & Infrastructure

- [ ] Unit tests: `Breadcrumbs`, `Pagination`, `ThemeToggle` components
- [ ] Integration tests: `/api/subscribe`, `/api/unsubscribe`, `calendar.ics`, `opengraph-image`, `feed.xml`, `sitemap.ts`
- [ ] E2E: every page and iteration-3 feature (filters, pagination, breadcrumbs, dark mode, search)
- [ ] A11y: axe checks expanded from home-page-only to every route
- [ ] Smoke: broadened from home-page-only to every top-level route

### Done (Iteration 4 — new fields)

- [x] Postgres service added to CI `test` job so integration tests can run against a real DB (pre-existing)
- [x] `vibe` field (String?) — genre/atmosphere summary on festival detail page
- [x] `camping` field (Boolean?) — whether camping is available
- [x] `ticketPrice` field (String?) — price range text
- [x] `ticketUrl` field (String?) — ticketing link
- [x] Schema migration: `add-festival-details`
- [x] Seed data: Bay of Islands Jazz & Blues, Rhythm and Vines populated
- [x] Detail page updated with new fields in meta grid
- [x] Seed data validation tests for new fields
- [x] Node engine widened to `>=22.17.1` (was blocking v24 LTS)

---

## Queued

### Code Quality & Polish

- [x] Extract FestivalStatusBadge component — eliminated 4 DRY violations _(done)_
- [x] Add metadata to 9 pages missing `generateMetadata` — all routes now have titles + descriptions _(done)_
- [ ] Add loading.tsx for pages missing it: artists, promoters, regions, search, home, subscribe, unsubscribe
- [x] Add error.tsx boundaries — root error boundary created _(done)_
- [x] Add not-found.tsx for artists/[slug], promoters/[slug] _(done)_
- [x] Add robots.ts with sitemap reference _(done)_
- [x] Add OpenGraph image for home page _(done)_
- [ ] Add OpenGraph images for artists, promoters, regions detail pages
- [ ] Add JSON-LD structured data (Event schema) on festival detail pages
- [x] Replace duplicate REGION_LABELS in home page with format.ts import _(done)_
- [x] Add FestivalStatusBadge to artist page festival history entries _(done)_
- [x] Add OG images for artists, promoters, regions detail pages _(done)_
- [x] Add JSON-LD Festival schema markup on festival detail pages _(done)_
- [ ] ETA 80% Add breadcrumb navigation to pages missing it: festivals, artists, promoters, regions, search _(in progress — agent)_
- [ ] ETA 60% Add loading.tsx for all routes _(in progress — agent)_
- [ ] ETA 50% Upcoming vs past festival split on listing page _(in progress — agent)_
- [ ] ETA 50% Map view of NZ festivals by region _(in progress — agent)_
- [ ] ETA 10% Add artist + lineup seed data for discovery feature _(in progress — agent)_
- [ ] ETA 0% Research: more backlog improvements _(in progress — librarian)_

### AI & Automation

### AI & Automation

- [ ] **Eventfinda API integration** — fetch NZ festival/event data from https://api.eventfinda.co.nz/v2/events.json. Basic auth via `.env` credentials. Map events to Festival model fields (name, date, venue, genre, cost). Handle pagination, rate limiting, deduplication. Requires `EVENTFINDA_USERNAME` and `EVENTFINDA_PASSWORD` in `.env`.
- [ ] **Poster-to-lineup tool** — AI vision reads festival posters, extracts artist names + dates + venue, cross-references against existing artists, suggests new entries. Example: Twominds Festival 2024/2025 posters from RA. Use Claude Vision / GPT-4V API. Admin review before saving. Max value because RA blocks AI agents — manual data entry via posters is the workaround.
- [ ] RA scraper integration — import RA event data (when accessible) to supplement lineup/festival records
- [ ] Auto-slug generation from festival/artist names during data entry

### Discovery & Engagement

- [ ] ETA 10% Add artist + lineup seed data — artist-to-festival discovery flow exists in UI but has no data _(in progress — agent)_
- [ ] Add "similar festivals" cross-linking on festival detail page based on shared genres/artists
- [ ] Add "also played with" section on artist page showing other artists at same festivals
- [ ] Add About page explaining the project and its mission
- [ ] Add Contact page with submission guidelines

### Pages & Routes

- [ ] Admin dashboard (role-gated) — approve submitted festivals, manage records
- [ ] Festival submission form — public submit with admin approval queue
- [ ] Artist claim flow — organiser can link their artist profile

### Data & Seed

- [ ] Add remaining websites for festivals still missing links (11 entries)
- [ ] Add promoter records (Fuzen NZ, Audiology Touring, Rhythm & Vines Ltd, etc.)
- [ ] Add artist records for known headliners (Alison Wonderland, Andy C, Clean Bandit…)
- [ ] Add lineup entries linking artists to festivals and years
- [ ] Add Ultra New Zealand details (April 2026, Wellington Waterfront, EDM)
- [ ] Region normalisation: "East Coast" → GISBORNE, "Nelson-Tasman" → split to TASMAN/NELSON
- [ ] Scrape/import RA NZ events to supplement electronic festival data

### UI / UX

- [x] ETA 100% Festival status badge component — extracted, integrated into 4 pages, eliminated DRY violations _(done)_
- [x] ETA 100% Vibe description field on festival detail page _(done — iteration 4)_
- [x] ETA 100% Camping info on festival detail page _(done — iteration 4)_
- [x] ETA 100% Ticket pricing on festival detail page _(done — iteration 4)_
- [ ] Upcoming vs past festival split on listing page (use `startDate` field)
- [ ] Map view of NZ festivals by region (static SVG of NZ or Leaflet)

### Performance & Infrastructure

- [ ] `use cache` on Prisma queries (Next.js 16 cache components when stable)
- [ ] Renovate dependency PRs — review queued updates
- [ ] Update Node engine to allow v24 LTS (currently `>=22.17.1 <23.0.0`)
