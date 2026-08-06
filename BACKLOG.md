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

## Done (Iteration 4 — test backfill + production stability)

New policy (see README.md "Testing policy"): every feature gets unit + integration + e2e + a11y + smoke coverage as close to 100% as the feature warrants, TDD/BDD workflow going forward.

### Tests & Infrastructure

- [x] Postgres service added to CI `test` job so integration tests can run against a real DB
- [x] Unit tests: `Breadcrumbs`, `Pagination`, `ThemeToggle` components
- [x] Integration tests: `/api/subscribe`, `/api/unsubscribe`, `calendar.ics`, `opengraph-image`, `feed.xml`, `sitemap.ts`
- [x] E2E: every page and iteration-3 feature (filters, pagination, breadcrumbs, dark mode, search)
- [x] A11y: axe checks expanded from home-page-only to every route (found + fixed 6 real contrast violations)
- [x] Smoke: broadened from home-page-only to every top-level route
- [x] Fixed broken production build (missing `postinstall: prisma generate`) and a follow-up lockfile drift regression from the fix
- [x] Removed redundant, permanently-broken `deploy_production.yml`/`deploy_dev.yml` GitHub Actions workflows
- [x] Configured Renovate for safe unattended updates (3-day release-age wait, patch automerge)

### Data & Seed

- Seed data still has zero Artist/LineupEntry rows — the E2E artist tests use a test-only fixture created via `e2e/global-setup.ts`, not real seed data. Real artist/lineup data is still queued below.

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
- [ ] Default-sort festivals by soonest upcoming date: ACTIVE (with a set `startDate`) sort first by date; TBD/TBC sort into that same list (not segregated) if active last year, positioned around their last known date rather than pushed to the end; DEFUNCT always sort last regardless of date. Consistently across home, `/festivals`, and `/regions/[region]`
- [ ] Upcoming vs past festival split on listing page (use `startDate` field)
- [ ] Map view of NZ festivals by region (static SVG of NZ or Leaflet)

### Research

- [ ] User research: personas/profiles, user stories, journeys, and wants for who actually uses Aotearoa Festivals (festival-goers, promoters, artists) — document findings (e.g. `docs/user-research.md`) and feed into backlog prioritisation each loop iteration

### Performance & Infrastructure

- [ ] `use cache` on Prisma queries (Next.js 16 cache components when stable)
- [ ] Renovate dependency PRs — review queued updates (once the Renovate GitHub App is installed)
