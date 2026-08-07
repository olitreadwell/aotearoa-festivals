'use client';

import { SignUp } from '@clerk/nextjs';

/**
 * Catch-all sign-up page. Clerk's `<SignUp />` component handles every
 * sub-route under `/sign-up/*` (email verification, SSO callback, etc.)
 * via the `[[...rest]]` segment.
 */
export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <SignUp />
    </main>
  );
}
