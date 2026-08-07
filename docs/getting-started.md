# Getting started

## Requirements

- **Node** 22.17.1 — pinned in `.nvmrc`. `nvm use`, `mise install`, and `asdf install nodejs` all read it.
- **npm** 10.9+ — pinned via the `packageManager` field. `corepack enable` will sync it automatically.

## Install

```bash
gh repo create my-project --template numeralstudio/template --private
cd my-project
npm install
npm run setup       # interactive: rename @numeral scope, copy .env, pick integrations
npm run dev
```

Open <http://localhost:3000> for the app, <http://localhost:6006> for Storybook (`npm run storybook`).

## Environment variables

```bash
cp apps/web/.env.example apps/web/.env.local
```

Edit `.env.local` and you're set. Validation lives in `apps/web/src/env.ts` — small zod schema, no t3-env wrapper.

## Verify

```bash
npm run type-check
npm run lint
npm test
npm run build
```

CI runs the same gates. Build, type-check, and tests are the only blockers — lint is advisory.

## Hooks

`pre-commit` autofixes staged files with Prettier + ESLint. Bypass with `git commit --no-verify`. Nothing else runs locally; CI is the gate.

## Reset

```bash
npm run clean:all   # wipes node_modules, .turbo, .next, dist, coverage, npm cache
npm install
```

## Editor

VS Code settings live in `.vscode/`. The recommended extensions:

- ESLint
- Prettier
- Tailwind CSS IntelliSense

## Where to go next

- [AI prompts](./ai-prompts.md) — canned prompts for adding components, forms, tests
- [Integrations](./integrations/) — opt-in feature branches (Sanity, Prisma, Kinde, Resend)
- **Storybook → Style Guide** — Rod's hybrid styling system, 8 chapters
