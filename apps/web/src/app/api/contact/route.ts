import { NextResponse } from 'next/server';

import { contactSchema } from '../../../features/contact/schema';

/**
 * POST /api/contact — receives JSON, validates with the same zod schema
 * the client uses, returns 400 on validation failure.
 *
 * The actual delivery (email, queue, DB) is intentionally not wired up.
 * Plug in your provider (Resend, SendGrid, Postmark, etc.) at the marker.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const json = (await request.json().catch(() => null)) as unknown;
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // TODO: deliver the message via your provider of choice.
  // const { name, email, message } = parsed.data;

  return NextResponse.json({ ok: true });
}
