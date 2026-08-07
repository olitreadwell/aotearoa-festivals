# Optional Integrations

This template uses **integration branches** to keep the core lean
while offering pre-built, tested integrations you can opt into.

## How It Works

Each integration lives on its own branch, rebased weekly onto `main`.
After creating your repo from this template, merge the ones you need:

```bash
git merge origin/integration/prisma
git merge origin/integration/kinde-auth
```

Branches are designed to merge cleanly with each other.
If you need both auth and database (common), merge both.

## Available Integrations

| Branch                   | Adds                                 | Guide                  |
| ------------------------ | ------------------------------------ | ---------------------- |
| `integration/sanity`     | Sanity CMS v5 studio + content types | [Setup](sanity.md)     |
| `integration/prisma`     | Prisma ORM + Supabase database       | [Setup](prisma.md)     |
| `integration/kinde-auth` | Kinde authentication middleware      | [Setup](kinde-auth.md) |
| `integration/resend`     | Resend email + react-email templates | [Setup](resend.md)     |
| `integration/gsap`       | GSAP animations + @gsap/react        | [Setup](gsap.md)       |

## After Merging

Each integration adds a setup guide at `docs/integrations/<name>.md`.
Follow it to configure env vars and run any initial setup scripts.

## Keeping Branches Updated

A GitHub Action automatically rebases integration branches onto `main`
weekly. If a rebase fails, it opens a PR for manual resolution.
