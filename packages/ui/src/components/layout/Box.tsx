import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '../../lib/cn';

export type BoxProps = HTMLAttributes<HTMLDivElement>;

/**
 * Box — bare div with className merge. Use as the default building block
 * when you don't need semantic meaning. Style entirely via Tailwind utilities
 * or component-scoped SCSS classes.
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
));
Box.displayName = 'Box';
