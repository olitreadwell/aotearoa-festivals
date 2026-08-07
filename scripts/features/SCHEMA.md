# Feature Manifest Schema

This document is the human-readable companion to `manifest.schema.json`. The schema is the contract; this document explains the why, the field semantics, and the worked example.

## Why a manifest contract exists

The Numeral Studio template ships without auth, db, cms, payments, email, jobs, i18n, flags, or search baked in. Those choices are project-specific. The scaffolder (`scripts/setup.mjs`, rewritten in T5.2) reads feature folders under `scripts/features/`, prompts the user to pick one option per category, and applies the selection.

For that to be safe and predictable, every feature folder must declare what it brings to the project in a uniform shape. The manifest is that shape. If a feature folder cannot be described by the manifest, it does not belong in the scaffolder.

A single contract gives us:

- One validator (ajv) used by the scaffolder and tests
- One way for humans and agents to add a new feature
- Predictable conflict resolution and dependency dedupe
- A stable surface to extend later (additive only)

## Folder layout

Every feature lives in `scripts/features/<feature-id>/`:

```
scripts/features/<feature-id>/
  manifest.json     # Required. Conforms to manifest.schema.json
  files/            # Optional. Files to copy into the project
  README.md         # Optional. Source of `readmeSection` if you prefer to keep it as a real file
```

The folder name MUST equal `manifest.json`'s `id`.

## Schema draft

The schema uses **JSON Schema draft-07**. Reasons:

- ajv supports draft-07 with no extra opt-in
- `bunx ajv-cli` validates draft-07 out of the box
- We use no draft-2020-12-only features (tuple `prefixItems`, `unevaluatedProperties`, etc.)

If a future field needs draft-2020-12 features we will rev the schema and document it here.

## Field-by-field reference

### `id` (required, string)

Kebab-case, unique across all features. Pattern: `^[a-z][a-z0-9]*(-[a-z0-9]+)*$`. Convention: `<category>-<provider>`.

Examples: `auth-clerk`, `db-drizzle-neon`, `cms-sanity`, `payments-stripe`.

The scaffolder uses `id` as a primary key for conflicts/requires resolution.

### `category` (required, enum)

One of: `auth`, `db`, `cms`, `payments`, `email`, `jobs`, `i18n`, `flags`, `search`.

Categories are the prompt groupings in the scaffolder. By convention only one feature per category is selected, but the scaffolder enforces this through `conflicts`, not the category enum, so cross-category conflicts (e.g. db + cms incompatibility) are also expressible.

### `label` (required, string)

Human display name shown in the prompt. Examples: `Clerk`, `Drizzle + Neon`, `Sanity`.

### `description` (required, string)

One-line summary shown beneath the prompt. Plain prose, no markdown.

### `dependencies` (required, string array, may be empty)

npm runtime deps to add to the project's `package.json`. Each entry is a full spec, e.g. `'@clerk/nextjs@^6'`. Unversioned specs (`'lodash'`) are accepted but discouraged because they pin to whatever the user's registry serves at the time.

### `devDependencies` (optional, string array)

Same shape as `dependencies`. Use for things like type packages or codegen tools.

### `envKeys` (required, object array, may be empty)

Each entry:

```json
{
  "name": "NEXT_PUBLIC_FOO",
  "required": true,
  "description": "Short comment in .env.example",
  "public": true
}
```

Rules:

- `name` must be UPPER_SNAKE_CASE
- If `public: true`, `name` MUST start with `NEXT_PUBLIC_`. The scaffolder rejects manifests that violate this even if everything else passes
- `required: true` keys go into `.env.example` uncommented; `required: false` go in commented out
- `description` is a one-line `# comment` written next to the entry

The scaffolder appends these to the project `.env.example`. Public keys also feed the client-side section of `apps/web/src/env.ts`.

### `files` (required, object array, may be empty)

Each entry:

```json
{
  "from": "middleware.ts",
  "to": "apps/web/middleware.ts",
  "overwrite": false
}
```

- `from` is a path inside the feature's `files/` subfolder. POSIX separators, no `..`, no leading `/`
- `to` is a path relative to the project root. POSIX separators, no `..`, no leading `/`
- `to` may contain `${PROJECT_NAME}` (see [File templating rules](#file-templating-rules))
- `overwrite: true` replaces an existing destination; `overwrite: false` skips with a warning

Files are copied verbatim. There is no in-file substitution beyond the path-level `${PROJECT_NAME}`.

### `readmeSection` (required, string)

Markdown content appended to the generated project README under a `## <label>` heading. Should describe how to use the feature, the env keys, and any post-install steps.

If you prefer to write this as a separate file, keep it as `scripts/features/<id>/README.md` and have your build step read it into the manifest. The schema only cares that the field is a string at validation time.

### `postInstall` (optional, string array)

Shell commands to run after `bun install`. Use sparingly.

Good uses:

- `'bun run db:generate'` after Drizzle is configured
- `'bunx prisma generate'` after Prisma is added

Bad uses:

- Anything that hits a network outside the package registry
- Anything interactive
- Anything that mutates the user's machine outside the project

Each command runs in the project root with the project's `PATH`. The scaffolder runs them serially in array order.

### `conflicts` (optional, string array)

Other feature ids that cannot coexist with this one. The scaffolder fails fast if the user selects two features that conflict.

Example: `'auth-clerk'` lists `'auth-kinde'`, `'auth-better-auth'`. Conflict relationships are symmetric; declare them on both sides for clarity (the scaffolder also enforces symmetry).

### `requires` (optional, string array)

Other feature ids that must be selected together with this one. The scaffolder warns and asks the user to add the missing dependency.

## Conflict and requires semantics

- `conflicts` is symmetric: if `a.conflicts` contains `b`, the scaffolder behaves as if `b.conflicts` contains `a` even when not declared. We still ask authors to declare both sides for readability.
- `requires` is directional: if `a.requires` contains `b`, selecting `a` implies selecting `b`. Selecting `b` does not imply `a`.
- Cycles in `requires` are an error. The scaffolder detects them at load time.
- A feature cannot list itself in either field.
- A feature cannot list an unknown id in either field; the scaffolder validates ids against the loaded set.

## Dependency dedupe

When two selected features list the same package the scaffolder picks the **highest-precedence semver range** and writes a single entry to `package.json`.

Precedence (highest first):

1. An exact version (`1.2.3`) wins over a range
2. A caret range with a higher minimum (`^6.1.0`) wins over a lower one (`^6.0.0`)
3. A wider range loses to a narrower compatible one
4. Tags (`latest`, `next`) are kept as-is and warn if mixed with semver
5. URLs and `workspace:*` win over everything but produce a warning so authors notice

If the two ranges are not compatible (e.g. `^5` and `^6`), the scaffolder fails and asks the user to remove one of the features. We do not silently downgrade or upgrade across major versions.

This rule applies to both `dependencies` and `devDependencies`. A package listed in both arrays across features is dedupe'd into `dependencies` only (runtime wins).

## File templating rules

Only one substitution is supported in this version: `${PROJECT_NAME}`.

- It is replaced inside the `to` path string, not inside file contents
- The value comes from the `'Project name: '` prompt in `setup.mjs` (T5.2)
- Substitution is a literal string replace; no escaping, no expressions
- File contents are copied verbatim. If you need substitution inside a file, ship two variants and pick the right one with separate `files` entries, or run a `postInstall` step

We deliberately avoid Mustache, Handlebars, EJS, etc. Templating engines invite scope creep, and the simpler the contract the easier it is to audit a feature folder by reading it.

If a future feature genuinely needs in-file substitution we will introduce a single, documented placeholder set and rev the schema. Not before.

## Worked example: `auth-clerk`

This is illustrative; the real `auth-clerk` folder is built in T6.1.

### Folder

```
scripts/features/auth-clerk/
  manifest.json
  files/
    middleware.ts
    app/sign-in/[[...rest]]/page.tsx
    app/sign-up/[[...rest]]/page.tsx
  README.md
```

### `manifest.json`

```json
{
  "id": "auth-clerk",
  "category": "auth",
  "label": "Clerk",
  "description": "Hosted auth with prebuilt UI, social SSO, and orgs.",
  "dependencies": ["@clerk/nextjs@^6", "@clerk/backend@^1"],
  "devDependencies": [],
  "envKeys": [
    {
      "name": "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
      "required": true,
      "description": "Clerk publishable key (safe for client).",
      "public": true
    },
    {
      "name": "CLERK_SECRET_KEY",
      "required": true,
      "description": "Clerk secret key (server only).",
      "public": false
    },
    {
      "name": "NEXT_PUBLIC_CLERK_SIGN_IN_URL",
      "required": false,
      "description": "Override the default '/sign-in' route.",
      "public": true
    }
  ],
  "files": [
    {
      "from": "middleware.ts",
      "to": "apps/web/middleware.ts",
      "overwrite": false
    },
    {
      "from": "app/sign-in/[[...rest]]/page.tsx",
      "to": "apps/web/src/app/sign-in/[[...rest]]/page.tsx",
      "overwrite": false
    },
    {
      "from": "app/sign-up/[[...rest]]/page.tsx",
      "to": "apps/web/src/app/sign-up/[[...rest]]/page.tsx",
      "overwrite": false
    }
  ],
  "readmeSection": "## Clerk\n\nAuthentication is handled by Clerk.\n\n1. Create a project at https://dashboard.clerk.com\n2. Copy the publishable and secret keys into `.env.local`\n3. Visit `/sign-in` to test\n\nThe middleware in `apps/web/middleware.ts` protects every route except the sign-in pages.\n",
  "postInstall": [],
  "conflicts": ["auth-kinde", "auth-better-auth"],
  "requires": []
}
```

### What the scaffolder does with this

1. Adds `@clerk/nextjs` and `@clerk/backend` to `apps/web/package.json` (or wherever auth lives)
2. Appends the three env keys to `apps/web/.env.example`, with the optional one commented out
3. Copies the three files from `files/` into the project, skipping any that already exist
4. Appends `readmeSection` to the generated project README under `## Clerk`
5. Refuses to continue if the user also picked `auth-kinde` or `auth-better-auth`

## Validating manifests

The schema is machine-runnable:

```bash
bunx ajv-cli validate \
  -s scripts/features/manifest.schema.json \
  -d scripts/features/auth-clerk/manifest.json \
  --strict=false --all-errors
```

T5.3 wires this into the test suite so every committed feature manifest is validated in CI.

## Adding a new feature

1. Create `scripts/features/<id>/` with `manifest.json` and any `files/`
2. Run the validator above
3. Add the feature to the conflicts list of any feature in the same category (and theirs to yours)
4. If the feature has a `postInstall` step, document why the work cannot live in `files/`
5. Open a PR; T5.3 tests will validate the manifest in CI
