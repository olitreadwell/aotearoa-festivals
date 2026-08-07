import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names: filter falsy via clsx, then dedupe Tailwind conflicts
 * via tailwind-merge.
 *
 * Use in components to combine three sources of styling in a readable order:
 *   1. SCSS identity + variants (e.g. `numeral-button numeral-button-primary`)
 *   2. Tailwind layout / spacing utilities
 *   3. Conditional state classes and the `className` prop
 *
 * @example
 *   const cls = cn(
 *     `numeral-button numeral-button-${variant}`,
 *     'inline-flex items-center',
 *     disabled && 'cursor-not-allowed',
 *     className,
 *   );
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
