# Resend Email Integration

This guide covers integrating Resend for email delivery in your Next.js application.

## Overview

Resend provides:

- Transactional email delivery
- Email templates with React
- Email tracking
- Webhooks for email events

## Installation

```bash
npm install resend react-email -w apps/web
```

## Configuration

### 1. Environment Variables

Add to `.env.example`:

```env
RESEND_API_KEY=re_...
```

Add actual value to `.env.local`.

### 2. Validate Environment Variables

```typescript
import { z } from 'zod';

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
```

## Implementation

### 1. Create Resend Client

```typescript
// apps/web/src/lib/resend.ts
import { Resend } from 'resend';

import { env } from './env';

export const resend = new Resend(env.RESEND_API_KEY);
```

### 2. Create Email Template

```typescript
// apps/web/src/emails/welcome.tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Text,
} from '@react-email/components'

interface WelcomeEmailProps {
  name: string
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Heading>Welcome {name}!</Heading>
          <Text>Thanks for signing up.</Text>
        </Container>
      </Body>
    </Html>
  )
}
```

### 3. Send Email

```typescript
// apps/web/src/app/api/send-email/route.ts
import { NextResponse } from 'next/server';

import { WelcomeEmail } from '@/emails/welcome';
import { resend } from '@/lib/resend';

export async function POST(request: Request) {
  const { email, name } = await request.json();

  const { data, error } = await resend.emails.send({
    from: 'onboarding@example.com',
    to: email,
    subject: 'Welcome!',
    react: WelcomeEmail({ name }),
  });

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json(data);
}
```

## Resources

- [Resend Documentation](https://resend.com/docs)
- [React Email](https://react.email)
