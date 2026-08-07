# auth-clerk

Hosted authentication via [Clerk](https://clerk.com): prebuilt sign-in/sign-up UI, social SSO, organizations, and a generous free tier.

## What this feature ships

- `apps/web/src/lib/clerk-middleware.ts`: a `withClerkAuth` factory that composes Clerk's `clerkMiddleware` on top of the template's always-on middleware (request IDs, Arcjet). The user wires it into the existing `apps/web/src/middleware.ts`.
- `apps/web/src/app/sign-in/[[...rest]]/page.tsx`: catch-all sign-in page rendering `<SignIn />`.
- `apps/web/src/app/sign-up/[[...rest]]/page.tsx`: catch-all sign-up page rendering `<SignUp />`.
- `files/app/layout.tsx.snippet`: doc-only snippet for the `<ClerkProvider>` wrapper. Not auto-applied.

## Why a factory, not a replacement middleware

The template ships an always-on `apps/web/src/middleware.ts` that stamps request IDs and runs Arcjet shield + rate limiting. Replacing that file would silently strip those guarantees. Instead, the feature ships a factory at `apps/web/src/lib/clerk-middleware.ts` that wraps the existing middleware. The user wires it into the root `middleware.ts` per the README section.

This keeps the always-on guardrails intact and makes the Clerk feature compose with anything else that ends up in the root middleware (i18n redirects, feature flags, etc.).

## Conflicts

`auth-kinde`, `auth-auth0`. Selecting more than one auth provider is not supported.

## Verification

```bash
bunx ajv validate \
  -s scripts/features/manifest.schema.json \
  -d scripts/features/auth-clerk/manifest.json \
  --strict=false --all-errors
```

Pattern source: `numeral-studio/workit/src/middleware.ts` (Clerk RBAC sessionClaims pattern).
