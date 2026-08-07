# Kinde Auth Integration

This guide covers integrating Kinde authentication into your Next.js application.

## Overview

Kinde is a modern authentication and user management platform that provides:

- User authentication (sign up, sign in, sign out)
- Social login providers
- Multi-factor authentication
- User management
- Organizations and roles

## Installation

### 1. Install Kinde SDK

```bash
npm install @kinde-oss/kinde-auth-nextjs -w apps/web
```

### 2. Create Kinde Account

1. Go to [kinde.com](https://kinde.com)
2. Sign up for an account
3. Create a new application
4. Note your credentials

## Configuration

### 1. Environment Variables

Add to `.env.example`:

```env
KINDE_CLIENT_ID=your_client_id
KINDE_CLIENT_SECRET=your_client_secret
KINDE_ISSUER_URL=https://your-domain.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
```

Add actual values to `.env.local`:

```env
KINDE_CLIENT_ID=your_actual_client_id
KINDE_CLIENT_SECRET=your_actual_client_secret
KINDE_ISSUER_URL=https://your-domain.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
```

### 2. Validate Environment Variables

Update `apps/web/src/lib/env.ts`:

```typescript
import { z } from 'zod';

const envSchema = z.object({
  // ... existing vars
  KINDE_CLIENT_ID: z.string().min(1),
  KINDE_CLIENT_SECRET: z.string().min(1),
  KINDE_ISSUER_URL: z.string().url(),
  KINDE_SITE_URL: z.string().url(),
  KINDE_POST_LOGOUT_REDIRECT_URL: z.string().url(),
  KINDE_POST_LOGIN_REDIRECT_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

## Implementation

### 1. Create Auth API Routes

Create `apps/web/src/app/api/auth/[kindeAuth]/route.ts`:

```typescript
import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET(request: Request, { params }: any) {
  const endpoint = params.kindeAuth;
  return handleAuth(request, endpoint);
}
```

### 2. Create Auth Helper

Create `apps/web/src/lib/auth.ts`:

```typescript
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function getUser() {
  const { getUser } = getKindeServerSession();
  return await getUser();
}

export async function isAuthenticated() {
  const { isAuthenticated } = getKindeServerSession();
  return await isAuthenticated();
}
```

### 3. Create Login/Logout Buttons

Create `apps/web/src/components/auth-buttons.tsx`:

```typescript
import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'

export function AuthButtons() {
  return (
    <div className="flex gap-4">
      <LoginLink>Sign in</LoginLink>
      <LogoutLink>Sign out</LogoutLink>
    </div>
  )
}
```

### 4. Protect Routes

Create middleware `apps/web/src/middleware.ts`:

```typescript
import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware';

export default withAuth(
  async function middleware(req) {
    // Custom middleware logic
  },
  {
    isReturnToCurrentPage: true,
  },
);

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
```

### 5. Display User Info

Create `apps/web/src/components/user-profile.tsx`:

```typescript
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export async function UserProfile() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    return null
  }

  return (
    <div>
      <img src={user.picture || ''} alt={user.given_name || ''} />
      <h2>{user.given_name} {user.family_name}</h2>
      <p>{user.email}</p>
    </div>
  )
}
```

## Usage Examples

### Protected Page

```typescript
// apps/web/src/app/dashboard/page.tsx
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const { isAuthenticated } = getKindeServerSession()

  if (!(await isAuthenticated())) {
    redirect('/api/auth/login')
  }

  return <div>Dashboard</div>
}
```

### Get User in Server Component

```typescript
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export default async function ProfilePage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <div>
      <h1>Welcome, {user?.given_name}</h1>
    </div>
  )
}
```

### Get User in API Route

```typescript
// apps/web/src/app/api/profile/route.ts
import { NextResponse } from 'next/server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ user });
}
```

## Advanced Features

### Organizations

```typescript
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function getOrganization() {
  const { getOrganization } = getKindeServerSession();
  return await getOrganization();
}
```

### Permissions

```typescript
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function checkPermission(permission: string) {
  const { getPermission } = getKindeServerSession();
  return await getPermission(permission);
}
```

### User Metadata

```typescript
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function getUserMetadata() {
  const { getUserProfile } = getKindeServerSession();
  return await getUserProfile();
}
```

## Testing

### Mock Kinde in Tests

```typescript
// apps/web/src/lib/__mocks__/auth.ts
import { vi } from 'vitest';

export const getUser = vi.fn(() => ({
  id: '123',
  email: 'test@example.com',
  given_name: 'Test',
  family_name: 'User',
}));

export const isAuthenticated = vi.fn(() => true);
```

### Test Protected Component

```typescript
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { UserProfile } from './user-profile';

vi.mock('../lib/auth');

describe('UserProfile', () => {
  it('displays user information', async () => {
    render(await UserProfile());

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });
});
```

## Troubleshooting

### Redirect Loop

Ensure middleware matcher doesn't include auth routes:

```typescript
export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};
```

### Environment Variables Not Loading

Restart development server after adding environment variables.

### Session Not Persisting

Check cookie settings and ensure HTTPS in production.

## Production Deployment

### Update Environment Variables

Set production URLs:

```env
KINDE_SITE_URL=https://your-domain.com
KINDE_POST_LOGOUT_REDIRECT_URL=https://your-domain.com
KINDE_POST_LOGIN_REDIRECT_URL=https://your-domain.com/dashboard
```

### Configure Kinde Dashboard

1. Add production URLs to allowed callbacks
2. Add production URLs to allowed logout URLs
3. Enable required authentication methods

## Resources

- [Kinde Documentation](https://kinde.com/docs)
- [Next.js SDK Documentation](https://kinde.com/docs/developer-tools/nextjs-sdk)
- [Example Repository](https://github.com/kinde-oss/kinde-nextjs-app-router-starter-kit)
