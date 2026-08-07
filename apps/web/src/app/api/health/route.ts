import { NextResponse } from 'next/server';

/**
 * Health check endpoint (12-factor IX: disposability).
 *
 * Returns 200 with deploy metadata so uptime monitors and load balancers
 * can verify the process is alive and identify which commit is serving.
 */
export function GET(): NextResponse {
  return NextResponse.json({
    ok: true,
    sha: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    env: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'unknown',
    timestamp: new Date().toISOString(),
  });
}
