# Changelog

All notable changes to Aotearoa Festivals are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased] — claude/dev

### Added

- `BACKLOG.md` — living feature backlog, updated each loop iteration
- `CHANGELOG.md` — this file

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
