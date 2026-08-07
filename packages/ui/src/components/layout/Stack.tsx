import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '../../lib/cn';

export type StackProps = HTMLAttributes<HTMLDivElement>;

/**
 * Stack — vertical flex column. Override `gap-*` via className.
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-4', className)} {...props} />
));
Stack.displayName = 'Stack';

/**
 * HStack — horizontal flex row.
 */
export const HStack = forwardRef<HTMLDivElement, StackProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-row items-center gap-4', className)} {...props} />
));
HStack.displayName = 'HStack';

/**
 * VStack — vertical flex column with center alignment. Use for centered
 * column layouts (e.g. a card body). For left-aligned columns, use `Stack`.
 */
export const VStack = forwardRef<HTMLDivElement, StackProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col items-center gap-4', className)} {...props} />
));
VStack.displayName = 'VStack';
