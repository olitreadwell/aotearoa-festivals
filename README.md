# Aotearoa Festivals

New Zealand music festivals, the promoters/production companies behind them, and the artists who play them.

Inspired by [techevents.co.nz](https://techevents.co.nz) ([source](https://github.com/ro-savage/nz-tech-events)) — same idea (a community events directory), different domain (music festivals not tech meetups) and stack (this is TypeScript/Next.js, theirs is Rails).

## Stack

- Next.js 16 (App Router), TypeScript, Tailwind 4
- Prisma + Postgres (Neon)
- Vercel (deploy)

## Data model

- **Festival** — status (active/TBC/hiatus/defunct/unconfirmed), region, dates, cost, notes
- **Promoter** — the production company/collective behind festivals
- **Artist** — DJs/acts
- **LineupEntry** — join table: which artist played which festival's edition in which year

The Festival/Promoter shape borrows from nz-tech-events' proven model (region enum, approval flag). Artist/LineupEntry is this project's own extension — nz-tech-events doesn't track lineups.

## Pages & Routes

| Route                               | Description                                                           |
| ----------------------------------- | --------------------------------------------------------------------- |
| `/`                                 | Home — upcoming festivals grid, live counts, region browsing links    |
| `/festivals`                        | Browse all festivals with region/status filters and pagination        |
| `/festivals/[slug]`                 | Festival detail — lineup, promoter info, breadcrumbs, add-to-calendar |
| `/calendar`                         | Monthly festival calendar view with subscribe link                       |
| `/calendar.ics`                     | All upcoming festivals iCal feed                                         |
| `/plan`                             | Plan your festival season — upcoming festivals grouped by NZ season, save the ones you want to catch |
| `/artists`                          | Browse all artists, paginated                                         |
| `/artists/[slug]`                   | Artist detail — festival history across editions                      |
| `/promoters`                        | Browse all promoters, paginated                                       |
| `/promoters/[slug]`                 | Promoter detail — list of festivals they run                          |
| `/regions`                          | Browse festivals by NZ region                                         |
| `/regions/[region]`                 | Festivals in one region, with an email subscribe CTA                  |
| `/about`                            | About the project — mission, how it works, contribute                     |
| `/map`                              | Interactive NZ map — festivals by region, color-coded, clickable      |
| `/search`                           | Client-side fuzzy search across festivals/artists/promoters (Fuse.js)    |
| `/feed.xml`                         | RSS feed of upcoming active/TBC festivals                                |
| `/sitemap.xml`                      | Dynamic sitemap covering all festivals, artists, and promoters        |
| `/subscribe`, `/api/subscribe`      | Email subscription flow                                               |
| `/unsubscribe`, `/api/unsubscribe`  | Token-based unsubscribe flow                                          |

Detail pages (festival/artist/promoter/region) are statically generated (`generateStaticParams`, ISR with `revalidate = 3600`); listing pages stay dynamic since they read filter/pagination query params. A dark mode toggle in the nav overrides the OS-level colour scheme.

## Festival season planning

`/plan` groups upcoming festivals into NZ seasons (Summer spans the calendar-year boundary, so it reads "Summer 25/26"). Each festival has a status picker — **Interested** (maybe) or **Planned** (going) — stored in `localStorage` (no account needed); the nav shows a count badge. The same picker appears on the home dashboard and festival detail pages.

The **Build your season** tool generates a non-overlapping itinerary from your choices: strategy (most festivals, biggest lineups, or indie/undiscovered picks), region (North Island, South Island, all NZ), genre, and a max count. Itinerary picks can be added to the plan in one click.

## Setup

```bash
cp .env.example .env   # fill in DATABASE_URL from your Neon project
npm install
npm run db:generate
npm run db:push        # create tables from schema.prisma
npm run db:seed        # import prisma/data/festivals-seed.json
npm run dev
```

## Seed data

`prisma/data/festivals-seed.json` is a snapshot of the festival/promoter research from the personal `~/oli` life-repo (`events/nz-festival-index.json` / `.toon`). Re-copy that file here and re-run `npm run db:seed` to refresh.

## Deploys

- `main` → production (Vercel), non-cancelling (a mid-flight cancel is riskier than letting a prod deploy finish)
- `dev` → dev environment, newest push cancels an in-flight older one
- All other branches don't auto-deploy

See `.github/workflows/`.

## Quality gates

- `npm run ci` runs the full local check: format, lint, typecheck, tests with coverage, build.
- CI (`.github/workflows/ci.yml`): format check, lint (+ advisory `npm audit`), typecheck, unit tests with coverage, build, and an E2E job (Playwright, against an ephemeral Postgres service) that also runs `@axe-core/playwright` accessibility checks. The `test` and `build` jobs each get their own ephemeral Postgres too, since integration tests and `generateStaticParams` both need a reachable database.
- Husky `pre-push` mirrors the fast local checks (lint, typecheck, format, unit tests) so broken work doesn't leave the machine.
- Renovate (`renovate.json`) keeps dependencies current — devDependency patch/minor auto-merges once CI passes, majors need dashboard approval.

## Testing policy

New features are built test-first (TDD): write the failing test, implement against it, then refactor. Test names read as behaviour specs (BDD-style — "given X, when Y, then Z" in spirit, `describe`/`it` in practice), not implementation-detail assertions.

Every feature should have, as close to full coverage as the feature warrants:

- **Unit** (Vitest, `src/**/*.test.ts(x)`) — pure logic and components with no DB/network dependency (helpers, `Breadcrumbs`, `Pagination`, `ThemeToggle`).
- **Integration** (Vitest, against a real ephemeral Postgres) — anything touching Prisma or an API route (`/api/subscribe`, `/api/unsubscribe`, route handlers like `calendar.ics`, `opengraph-image`, `feed.xml`, `sitemap.ts`).
- **Smoke** (Playwright, `e2e/smoke.spec.ts`) — every top-level route returns a working page with no error boundary, minimal assertions.
- **E2E** (Playwright) — real user flows per feature: filtering, pagination, search, breadcrumb navigation, theme toggling, subscribing.
- **A11y** (Playwright + `@axe-core/playwright`, `e2e/a11y.spec.ts`) — every route, checked against `wcag2a`/`wcag2aa`, serious/critical violations block CI.

A local ephemeral Postgres (no Docker required — `initdb`/`pg_ctl` from Homebrew's `postgresql` formula) is the safe way to run integration/E2E/a11y tests locally without touching the real Neon dev database or the seed file.
