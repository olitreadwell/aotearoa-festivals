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
| `/festivals/[slug]/calendar.ics`    | iCal export for a festival (404s until it has a real `startDate`)     |
| `/festivals/[slug]/opengraph-image` | Generated Open Graph share image for a festival                       |
| `/artists`                          | Browse all artists, paginated                                         |
| `/artists/[slug]`                   | Artist detail — festival history across editions                      |
| `/promoters`                        | Browse all promoters, paginated                                       |
| `/promoters/[slug]`                 | Promoter detail — list of festivals they run                          |
| `/regions`                          | Browse festivals by NZ region                                         |
| `/regions/[region]`                 | Festivals in one region, with an email subscribe CTA                  |
| `/search`                           | Client-side fuzzy search across festivals/artists/promoters (Fuse.js) |
| `/feed.xml`                         | RSS feed of upcoming active/TBC festivals                             |
| `/sitemap.xml`                      | Dynamic sitemap covering all festivals, artists, and promoters        |
| `/subscribe`, `/api/subscribe`      | Email subscription flow                                               |
| `/unsubscribe`, `/api/unsubscribe`  | Token-based unsubscribe flow                                          |

Detail pages (festival/artist/promoter/region) are statically generated (`generateStaticParams`, ISR with `revalidate = 3600`); listing pages stay dynamic since they read filter/pagination query params. A dark mode toggle in the nav overrides the OS-level colour scheme.

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
- CI (`.github/workflows/ci.yml`): format check, lint (+ advisory `npm audit`), typecheck, unit tests with coverage, build, and an E2E job (Playwright, against an ephemeral Postgres service) that also runs `@axe-core/playwright` accessibility checks.
- Husky `pre-push` mirrors the fast local checks (lint, typecheck, format, unit tests) so broken work doesn't leave the machine.
- Renovate (`renovate.json`) keeps dependencies current — devDependency patch/minor auto-merges once CI passes, majors need dashboard approval.
