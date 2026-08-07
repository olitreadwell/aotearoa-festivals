'use client';

import { SignIn } from '@clerk/nextjs';

/**
 * Catch-all sign-in page. Clerk's `<SignIn />` component handles every
 * sub-route under `/sign-in/*` (factor verification, SSO callback, etc.)
 * via the `[[...rest]]` segment.
 */
export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <SignIn />
    </main>
  );
}
