'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Stack } from '@numeral/ui';

import { type ContactInput, contactSchema } from './schema';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Reference form pattern: zod schema → inferred type → RHF + zodResolver
 * → server route validates with the same schema. Copy this shape when
 * building forms in client projects.
 */
export function ContactForm(): React.ReactElement {
  const [status, setStatus] = useState<Status>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactInput): Promise<void> {
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e);
      }}
      noValidate
    >
      <Stack className="gap-5">
        <label className="block">
          <span className="numeral-text-small">Name</span>
          <input
            type="text"
            autoComplete="name"
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
            className="mt-1.5 w-full rounded border border-[var(--color-border)] px-3 py-2.5 text-base"
          />
          {errors.name ? (
            <span role="alert" className="numeral-text-small text-[var(--color-danger)]">
              {errors.name.message}
            </span>
          ) : null}
        </label>

        <label className="block">
          <span className="numeral-text-small">Email</span>
          <input
            type="email"
            autoComplete="email"
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            className="mt-1.5 w-full rounded border border-[var(--color-border)] px-3 py-2.5 text-base"
          />
          {errors.email ? (
            <span role="alert" className="numeral-text-small text-[var(--color-danger)]">
              {errors.email.message}
            </span>
          ) : null}
        </label>

        <label className="block">
          <span className="numeral-text-small">Message</span>
          <textarea
            rows={5}
            {...register('message')}
            aria-invalid={errors.message ? 'true' : 'false'}
            className="mt-1.5 w-full rounded border border-[var(--color-border)] px-3 py-2.5 text-base"
          />
          {errors.message ? (
            <span role="alert" className="numeral-text-small text-[var(--color-danger)]">
              {errors.message.message}
            </span>
          ) : null}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send message'}
        </Button>

        {status === 'success' ? (
          <p role="status" className="numeral-text-small text-[var(--color-success)]">
            Thanks — we&rsquo;ll be in touch.
          </p>
        ) : null}
        {status === 'error' ? (
          <p role="alert" className="numeral-text-small text-[var(--color-danger)]">
            Something went wrong. Try again in a moment.
          </p>
        ) : null}
      </Stack>
    </form>
  );
}
