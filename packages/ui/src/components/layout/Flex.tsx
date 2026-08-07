import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '../../lib/cn';

export type FlexProps = HTMLAttributes<HTMLDivElement>;

/**
 * Flex — flex container with no opinionated direction or alignment.
 * Stack / HStack / VStack are preferred for common cases; reach for Flex
 * when you need a one-off configuration.
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex', className)} {...props} />
));
Flex.displayName = 'Flex';
