import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '../../lib/cn';

export type SectionProps = HTMLAttributes<HTMLElement>;

/**
 * Section — semantic <section> with vertical rhythm via spacing tokens.
 * Pair with `Container` for horizontal centering.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(({ className, ...props }, ref) => (
  <section ref={ref} className={cn('py-[var(--spacing-2xl)]', className)} {...props} />
));
Section.displayName = 'Section';
