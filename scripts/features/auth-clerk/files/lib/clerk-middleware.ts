import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { type NextMiddleware, type NextRequest, NextResponse } from 'next/server';

/**
 * Public routes that should bypass Clerk's auth gate. The matcher uses
 * Clerk's path syntax: trailing `(.*)` matches nested segments.
 */
const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)', '/api/health']);

/**
 * Shape of custom session claims. Configure in the Clerk dashboard under
 * Sessions, Customize session token: `{ "metadata": "{{user.public_metadata}}" }`.
 *
 * The `role` field is optional; if set, downstream code can gate on it.
 */
type SessionMetadata = {
  role?: 'admin' | 'member';
};

/**
 * Wraps an existing Next.js middleware with Clerk authentication.
 *
 * Clerk runs first: on protected routes (everything except {@link isPublicRoute}),
 * `auth().protect()` short-circuits unauthenticated requests with a redirect to
 * the sign-in page. Authenticated requests fall through to `baseMiddleware`,
 * which keeps doing whatever it was doing before, request-id stamping, Arcjet
 * shield, structured logging, etc.
 *
 * @param baseMiddleware - The existing always-on middleware (request id, Arcjet).
 * @returns A composed middleware suitable for default-export from `middleware.ts`.
 *
 * @example
 * ```ts
 * // apps/web/src/middleware.ts
 * import { withClerkAuth } from './lib/clerk-middleware';
 *
 * async function baseMiddleware(request: NextRequest) {
 *   // request-id + Arcjet logic
 *   return NextResponse.next();
 * }
 *
 * export default withClerkAuth(baseMiddleware);
 * ```
 */
export function withClerkAuth(baseMiddleware: NextMiddleware): NextMiddleware {
  return clerkMiddleware(async (auth, request: NextRequest) => {
    if (!isPublicRoute(request)) {
      await auth.protect();
    }

    // Optional: read role for downstream checks. Available on `auth()` in
    // route handlers and server components; surfaced here only as a hook
    // point, so feature owners can add role-based redirects if needed.
    const { sessionClaims } = await auth();
    const _role = (sessionClaims?.metadata as SessionMetadata | undefined)?.role;
    void _role;

    const result = await baseMiddleware(request, {
      waitUntil: () => undefined,
    } as never);
    return result ?? NextResponse.next();
  });
}
