import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '../../lib/cn';

export type GridProps = HTMLAttributes<HTMLDivElement>;

/**
 * Grid — CSS grid container. Default is a 12-column grid with `gap-4`;
 * override columns and gap via className (`grid-cols-2`, `gap-8`, etc.).
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('grid grid-cols-12 gap-4', className)} {...props} />
));
Grid.displayName = 'Grid';
