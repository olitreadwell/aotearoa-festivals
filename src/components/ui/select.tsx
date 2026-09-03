'use client';
import { cn } from '@/lib/utils';

function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'flex h-10 w-full cursor-pointer rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground shadow-[inset_0_1px_0_0_color-mix(in_srgb,var(--foreground)_2%,transparent)] transition-all duration-300 ease-out-expo focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}
export { Select };
