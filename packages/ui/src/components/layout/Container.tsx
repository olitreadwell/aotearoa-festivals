import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '../../lib/cn';

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  /** Max width preset. Defaults to `default` (1200px). */
  size?: 'narrow' | 'default' | 'wide' | 'full';
};

const SIZE_CLASS: Record<NonNullable<ContainerProps['size']>, string> = {
  narrow: 'max-w-[var(--layout-narrow)]',
  default: 'max-w-[var(--layout-default)]',
  wide: 'max-w-[var(--layout-wide)]',
  full: 'max-w-[var(--layout-full)]',
};

/**
 * Container — horizontally centered max-width wrapper with consistent
 * outer padding. The four size presets map to `--layout-*` CSS vars.
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mx-auto w-full px-[var(--layout-outside-space)]', SIZE_CLASS[size], className)}
      {...props}
    />
  ),
);
Container.displayName = 'Container';
