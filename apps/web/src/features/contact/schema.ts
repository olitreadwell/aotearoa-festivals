import { z } from 'zod';

/**
 * Contact form schema. Single source of truth for:
 *   - Client-side form validation (via react-hook-form + zodResolver)
 *   - Server-side parsing in the route handler
 *   - The TS type used everywhere (`ContactInput`), derived via `z.infer`
 *
 * Keep schemas next to the feature that owns them. Don't dump shared
 * schemas in a top-level `schemas/` folder.
 */
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80),
  email: z.string().email('Enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
