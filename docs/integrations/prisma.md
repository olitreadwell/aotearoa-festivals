# Prisma ORM Integration

This guide covers integrating Prisma ORM for database management in your Next.js application.

## Overview

Prisma is a next-generation ORM that provides:

- Type-safe database queries
- Auto-generated TypeScript types
- Database migrations
- Intuitive data modeling
- Support for multiple databases

## Installation

### 1. Install Prisma

```bash
npm install prisma @prisma/client -w apps/web
npm install -D prisma -w apps/web
```

### 2. Initialize Prisma

```bash
cd apps/web
npx prisma init
```

This creates:

- `prisma/schema.prisma` - Database schema
- `.env` - Environment variables (if not exists)

## Configuration

### 1. Database URL

Add to `.env.example`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
```

Add actual URL to `.env.local`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
```

### 2. Validate Environment Variables

Update `apps/web/src/lib/env.ts`:

```typescript
import { z } from 'zod';

const envSchema = z.object({
  // ... existing vars
  DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

### 3. Configure Schema

Edit `apps/web/prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Database Setup

### 1. Create Migration

```bash
npx prisma migrate dev --name init
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Seed Database (Optional)

Create `apps/web/prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
      posts: {
        create: [
          {
            title: 'First Post',
            content: 'This is my first post',
            published: true,
          },
        ],
      },
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Add to `apps/web/package.json`:

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

Run seed:

```bash
npx prisma db seed
```

## Implementation

### 1. Create Prisma Client

Create `apps/web/src/lib/prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### 2. Create Database Functions

Create `apps/web/src/lib/db/users.ts`:

```typescript
import { prisma } from '../prisma';

export async function getUsers() {
  return await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      posts: true,
    },
  });
}

export async function createUser(data: { email: string; name?: string }) {
  return await prisma.user.create({
    data,
  });
}

export async function updateUser(id: string, data: { name?: string }) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

export async function deleteUser(id: string) {
  return await prisma.user.delete({
    where: { id },
  });
}
```

### 3. Use in API Routes

Create `apps/web/src/app/api/users/route.ts`:

```typescript
import { NextResponse } from 'next/server';

import { z } from 'zod';

import { createUser, getUsers } from '@/lib/db/users';

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = userSchema.parse(body);
    const user = await createUser(data);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
```

### 4. Use in Server Components

```typescript
// apps/web/src/app/users/page.tsx
import { getUsers } from '@/lib/db/users'

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

## Advanced Usage

### Transactions

```typescript
import { prisma } from '@/lib/prisma';

export async function transferPost(postId: string, newAuthorId: string) {
  return await prisma.$transaction(async (tx) => {
    const post = await tx.post.update({
      where: { id: postId },
      data: { authorId: newAuthorId },
    });

    await tx.user.update({
      where: { id: newAuthorId },
      data: {
        updatedAt: new Date(),
      },
    });

    return post;
  });
}
```

### Raw Queries

```typescript
import { prisma } from '@/lib/prisma';

export async function searchUsers(query: string) {
  return await prisma.$queryRaw`
    SELECT * FROM "User"
    WHERE name ILIKE ${`%${query}%`}
  `;
}
```

### Pagination

```typescript
export async function getPaginatedUsers(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count(),
  ]);

  return {
    users,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}
```

## Testing

### Mock Prisma Client

Create `apps/web/src/lib/__mocks__/prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep, mockReset } from 'vitest-mock-extended';

export const prisma = mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prisma);
});
```

### Test Database Functions

```typescript
import { beforeEach, describe, expect, it } from 'vitest';

import { prisma } from '../__mocks__/prisma';
import { createUser, getUsers } from './users';

vi.mock('../prisma');

describe('User Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('gets all users', async () => {
    const mockUsers = [{ id: '1', email: 'test@example.com', name: 'Test' }];

    prisma.user.findMany.mockResolvedValue(mockUsers);

    const users = await getUsers();

    expect(users).toEqual(mockUsers);
    expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
  });

  it('creates a user', async () => {
    const newUser = { email: 'new@example.com', name: 'New User' };
    const createdUser = { id: '2', ...newUser };

    prisma.user.create.mockResolvedValue(createdUser);

    const user = await createUser(newUser);

    expect(user).toEqual(createdUser);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: newUser });
  });
});
```

## Migrations

### Create Migration

```bash
npx prisma migrate dev --name add_user_role
```

### Apply Migrations (Production)

```bash
npx prisma migrate deploy
```

### Reset Database

```bash
npx prisma migrate reset
```

## Prisma Studio

View and edit data in browser:

```bash
npx prisma studio
```

## Production Deployment

### 1. Generate Prisma Client in Build

Add to `apps/web/package.json`:

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### 2. Run Migrations in CI/CD

```yaml
- name: Run migrations
  run: npx prisma migrate deploy
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### 3. Connection Pooling

For serverless environments, use connection pooling:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_DATABASE_URL")
}
```

## Troubleshooting

### Client Not Generated

```bash
npx prisma generate
```

### Migration Conflicts

```bash
npx prisma migrate resolve --rolled-back <migration-name>
```

### Connection Issues

Check DATABASE_URL format and database accessibility.

## Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma with Next.js](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
