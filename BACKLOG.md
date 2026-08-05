# Aotearoa Festivals — Backlog

_Updated automatically each loop iteration. Items move from Queued → In Progress → Done._

---

## In Progress (Iteration 1)

- [ ] Festival listing page (`/festivals`) — browse all festivals with region/genre/status filters
- [ ] Festival detail page (`/festivals/[slug]`) — full festival info, lineup, links
- [ ] Artist listing + detail pages (`/artists`, `/artists/[slug]`)
- [ ] Promoter listing + detail pages (`/promoters`, `/promoters/[slug]`)
- [ ] Shared nav bar + improved layout
- [ ] Enrich seed data (websites, promoters, genres for missing entries)

---

## Queued

### Pages & Routes
- [ ] Region pages (`/regions/[region]`) — all festivals in a NZ region
- [ ] Search page (`/search`) — fuzzy search across festivals, artists, promoters (Fuse.js)
- [ ] RSS feed route (`/feed.xml`) — upcoming festivals atom feed
- [ ] Email subscription page (`/subscribe`) — per-region subscribe/unsubscribe flow
- [ ] Admin dashboard (role-gated) — approve submitted festivals, manage records
- [ ] Festival submission form — public submit with admin approval queue
- [ ] Artist claim flow — organiser can link their artist profile

### Data & Seed
- [ ] Add websites for festivals missing links (~30 entries)
- [ ] Add promoter records (Fuzen NZ, Audiology Touring, Rhythm & Vines Ltd, etc.)
- [ ] Add artist records for known headliners (Alison Wonderland, Andy C, Clean Bandit…)
- [ ] Add lineup entries linking artists to festivals and years
- [ ] Scrape/import RA NZ events to supplement electronic festival data
- [ ] Region normalisation: "East Coast" → GISBORNE, "Nelson-Tasman" → split to TASMAN/NELSON

### UI / UX
- [ ] Dark mode toggle
- [ ] Festival status badge colours (ACTIVE green, TBC amber, HIATUS grey, DEFUNCT red)
- [ ] Upcoming vs past festival split on listing page
- [ ] Map view of festivals by region (Leaflet or static SVG of NZ)
- [ ] iCal export for individual festivals
- [ ] Open Graph / social share cards per festival
- [ ] Accessibility audit (axe — pre-push hook already wired)

### Performance & Infrastructure
- [ ] `use cache` on Prisma queries once stable (Next.js 16 cache components)
- [ ] ISR for festival detail pages
- [ ] Playwright E2E tests for listing and detail pages
- [ ] Vitest unit tests for seed data parser/validator
- [ ] Renovate already configured — review dependency PRs

---

## Done

_Nothing shipped yet — iteration 1 in progress._
