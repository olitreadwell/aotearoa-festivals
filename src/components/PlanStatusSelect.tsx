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
      className="h-8 shrink-0 rounded-md border border-neutral-300 bg-background px-2 text-xs text-foreground dark:border-neutral-700"
    >
      <option value="">Not saved</option>
      <option value="interested">Interested</option>
      <option value="planned">Planned</option>
    </select>
  );
}
