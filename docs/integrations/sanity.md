# Sanity CMS Integration

This guide covers integrating Sanity CMS for content management in your Next.js application.

## Overview

Sanity is a headless CMS that provides:

- Real-time collaboration
- Structured content modeling
- GROQ query language
- Visual editing
- Image optimization
- Portable Text for rich content

## Installation

### 1. Install Sanity Packages

```bash
npm install next-sanity @sanity/image-url @portabletext/react -w apps/web
npm install -D @sanity/cli -w apps/web
```

### 2. Initialize Sanity Studio (Optional)

```bash
cd apps/web
npx sanity init
```

Or create a separate Sanity Studio app:

```bash
mkdir apps/studio
cd apps/studio
npx create-sanity@latest
```

## Configuration

### 1. Environment Variables

Add to `.env.example`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token
```

Add actual values to `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_actual_token
```

### 2. Validate Environment Variables

Update `apps/web/src/lib/env.ts`:

```typescript
import { z } from 'zod';

const envSchema = z.object({
  // ... existing vars
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().min(1),
  SANITY_API_TOKEN: z.string().min(1).optional(),
});

export const env = envSchema.parse(process.env);
```

### 3. Create Sanity Client

Create `apps/web/src/lib/sanity/client.ts`:

```typescript
import { createClient } from 'next-sanity';

import { env } from '../env';

export const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: process.env.NODE_ENV === 'production',
  token: env.SANITY_API_TOKEN,
});
```

## Schema Definition

### 1. Define Content Types

Create `apps/web/src/lib/sanity/schemas/post.ts`:

```typescript
import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
  },
});
```

## Querying Data

### 1. Create Query Functions

Create `apps/web/src/lib/sanity/queries.ts`:

```typescript
import { groq } from 'next-sanity';

import { client } from './client';

export async function getPosts() {
  return await client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      "author": author->name,
      mainImage
    }`,
  );
}

export async function getPostBySlug(slug: string) {
  return await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      "author": author->{name, image},
      mainImage,
      body
    }`,
    { slug },
  );
}
```

### 2. Use in Server Components

```typescript
// apps/web/src/app/blog/page.tsx
import { getPosts } from '@/lib/sanity/queries'
import { urlForImage } from '@/lib/sanity/image'
import Image from 'next/image'
import Link from 'next/link'

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div>
      <h1>Blog</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <article key={post._id}>
            {post.mainImage && (
              <Image
                src={urlForImage(post.mainImage).url()}
                alt={post.title}
                width={600}
                height={400}
              />
            )}
            <h2>
              <Link href={`/blog/${post.slug.current}`}>
                {post.title}
              </Link>
            </h2>
            <p>{post.author}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
```

## Image Handling

### 1. Create Image URL Helper

Create `apps/web/src/lib/sanity/image.ts`:

```typescript
import imageUrlBuilder from '@sanity/image-url';

import { client } from './client';

const builder = imageUrlBuilder(client);

export function urlForImage(source: any) {
  return builder.image(source);
}
```

### 2. Use Image Helper

```typescript
import { urlForImage } from '@/lib/sanity/image'
import Image from 'next/image'

export function PostImage({ image, alt }: { image: any; alt: string }) {
  return (
    <Image
      src={urlForImage(image).width(800).height(600).url()}
      alt={alt}
      width={800}
      height={600}
    />
  )
}
```

## Portable Text

### 1. Create Portable Text Components

Create `apps/web/src/components/portable-text.tsx`:

```typescript
import { PortableText as PortableTextReact } from '@portabletext/react'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity/image'

const components = {
  types: {
    image: ({ value }: any) => (
      <Image
        src={urlForImage(value).url()}
        alt={value.alt || ''}
        width={800}
        height={600}
      />
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
}

export function PortableText({ value }: { value: any }) {
  return <PortableTextReact value={value} components={components} />
}
```

### 2. Use Portable Text

```typescript
import { PortableText } from '@/components/portable-text'

export function PostBody({ body }: { body: any }) {
  return (
    <div className="prose">
      <PortableText value={body} />
    </div>
  )
}
```

## TypeScript Types

### 1. Generate Types

```bash
npx sanity schema extract
npx sanity typegen generate
```

### 2. Use Generated Types

```typescript
import type { Post } from '@/sanity.types';

export async function getTypedPosts(): Promise<Post[]> {
  return await client.fetch(groq`*[_type == "post"]`);
}
```

## Revalidation

### 1. On-Demand Revalidation

Create webhook endpoint `apps/web/src/app/api/revalidate/route.ts`:

```typescript
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { path } = await request.json();

  if (!path) {
    return NextResponse.json({ error: 'Path is required' }, { status: 400 });
  }

  try {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}
```

### 2. Configure Sanity Webhook

In Sanity dashboard:

1. Go to API settings
2. Add webhook: `https://your-domain.com/api/revalidate`
3. Set payload: `{ "path": "/blog" }`

## Preview Mode

### 1. Create Preview Client

```typescript
import { createClient } from 'next-sanity';

export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'previewDrafts',
});
```

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Integration](https://www.sanity.io/docs/nextjs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
