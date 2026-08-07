'use client';

import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { cn } from '../lib/cn';

type Tone = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: Tone;
  size?: Size;
};

/**
 * Button — the canonical example of the hybrid styling pattern.
 *
 * Order of intent in `cn()`:
 *   1. SCSS classes for identity and variants (`.numeral-button`)
 *   2. Tailwind utilities for layout-only details
 *   3. The `className` prop last so consumers can override
 *
 * Add new variants by extending the Tone / Size unions and the matching
 * `.numeral-button-*` rules in `styles/components/_button.scss`.
 *
 * @example
 *   <Button tone="primary" size="md">Save</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, tone = 'primary', size = 'md', type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(`numeral-button numeral-button-${tone} numeral-button-${size}`, className)}
      {...props}
    />
  ),
);
Button.displayName = 'Button';
