"use client";

import { useFestivalPlan } from "@/hooks/useFestivalPlan";
import type { PlanStatus } from "@/lib/plan-storage";

export function PlanStatusSelect({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const { statusOf, setStatus } = useFestivalPlan();
  const status = statusOf(slug);

  return (
    <select
      value={status ?? ""}
      onChange={(event) => {
        const value = event.target.value;
        setStatus(slug, value === "" ? null : (value as PlanStatus));
      }}
      aria-label={`Plan status for ${name}`}
      className="h-8 shrink-0 cursor-pointer rounded-full border border-border bg-background px-3 text-xs font-medium text-foreground shadow-[inset_0_1px_0_0_color-mix(in_srgb,var(--foreground)_3%,transparent)] transition-all duration-300 ease-out-expo hover:border-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
    >
      <option value="">Not saved</option>
      <option value="interested">Interested</option>
      <option value="planned">Planned</option>
    </select>
  );
}
