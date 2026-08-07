# AI Prompts

Canned prompts for the patterns this template uses. Paste them into Claude, Copilot, Cursor — whichever assistant is closest. They're written so the AI matches the existing conventions on first try.

## Add a new component (hybrid styling pattern)

> Build a new component named `<ComponentName>` in `packages/ui/src/components/`.
> Follow the canonical pattern documented in Storybook's Style Guide:
>
> - TSX uses `cn()` from `@numeral/ui`, with class order: SCSS identity + variants, then Tailwind utilities, then conditional state, then the `className` prop.
> - All custom CSS classes start with `numeral-` and use BEM-flat-dash (`.numeral-component-element-modifier`, no double-dashes).
> - Create `packages/ui/src/styles/components/_<component>.scss`. Wire it into `main.scss` via `@use 'components/<component>'`.
> - Use SCSS mixins from `abstracts/_mixins.scss` (`@include hover`, `@include breakpoint-below($bp-768)`, etc.) and functions from `_functions.scss` (`pxToRem`, `fluid-px`).
> - Use design tokens (`var(--color-fg)`, `var(--spacing-md)`, `var(--duration-200)`) instead of raw values.
> - Add a `.test.tsx` file with `vitest` + `@testing-library/react` + `jest-axe`.
> - Add a `.stories.tsx` file with `autodocs` tag and controls for every variant.
> - Add the component to the exports in `packages/ui/src/index.ts`.

## Add a form (zod + RHF + server validation)

> Build a form for `<feature>` following the pattern in `apps/web/src/features/contact/`.
>
> - Schema in `apps/web/src/features/<feature>/schema.ts`: a single `zod` object, exported alongside its inferred type via `z.infer`.
> - Client component in `<Feature>Form.tsx` using `react-hook-form` + `@hookform/resolvers/zod`. Render errors next to the field with `role="alert"`.
> - Server route at `apps/web/src/app/api/<feature>/route.ts`. Re-validate with the same schema using `safeParse`. Return 400 with field errors on failure, 200 with `{ ok: true }` on success.
> - Don't wire up the actual delivery (email, queue, DB). Leave a `// TODO` marker for the human.

## Write tests for an existing component

> Write Vitest tests for `<ComponentName>` at `<path>`. The test file is already adjacent (`<Component>.test.tsx`).
>
> - Use `@testing-library/react` and `screen` queries by role first, label second, text third — never by class or test-id unless nothing else works.
> - Always include one `jest-axe` test asserting `toHaveNoViolations()` for the default rendered state.
> - Cover each variant prop and each state (default, disabled, error if applicable).
> - Don't mock internal modules. Only mock fetch / network boundaries when needed.

## Write a Playwright e2e for a route

> Add a Playwright e2e test for the `<route>` page at `apps/web/e2e/<feature>.spec.ts`.
>
> - Use the existing fixtures and base URL setup.
> - Cover the golden path (the most common user flow) and one error path.
> - Include an `@axe-core/playwright` accessibility scan on the rendered page.
> - Tag critical flows with `@critical` so they can be run via `npm run test:e2e:critical`.

## Add a Radix-based interactive primitive

> We don't ship pre-built dialogs / dropdowns / popovers. To add `<Dialog>`:
>
> - Install the Radix primitive: `npm install @radix-ui/react-dialog --workspace=packages/ui`
> - Build the component at `packages/ui/src/components/Dialog.tsx` following the Button pattern: compose Radix parts, style with `cn()`, SCSS for identity in `_dialog.scss`.
> - Wire `_dialog.scss` into `main.scss`.
> - Export from `packages/ui/src/index.ts`.
> - Story + tests as usual.

## Add a design token

> Add a new design token to `packages/ui/src/tokens/tokens.css`.
>
> - Name it `--{category}-{name}` (e.g. `--color-accent`, `--spacing-2xs`, `--duration-700`).
> - If it should be available as a Tailwind utility, also register it in `apps/web/src/app/globals.css` under the `@theme inline` block.
> - Don't add a token unless it's used in at least two places.

## Document a decision

> Add an ADR (Architecture Decision Record) at `docs/adrs/<NNNN>-<short-title>.md`. Number sequentially.
>
> - Front-matter: `Status: accepted | superseded | proposed`, `Date: YYYY-MM-DD`, `Owners: <names>`.
> - Sections: **Context**, **Decision**, **Consequences**, **Alternatives considered**.
> - Keep it under one page. Bullet points beat prose.
