"use client";

import { useFestivalPlan } from "@/hooks/useFestivalPlan";

export function PlanToggle({ slug, name }: { slug: string; name: string }) {
  const { isSaved, toggle } = useFestivalPlan();
  const saved = isSaved(slug);

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={saved}
      aria-label={
        saved ? `Remove ${name} from my plan` : `Add ${name} to my plan`
      }
      className={`shrink-0 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
        saved
          ? "border-primary bg-primary text-primary-foreground"
          : "border-neutral-300 bg-background text-foreground hover:bg-muted dark:border-neutral-700"
      }`}
    >
      {saved ? "Saved" : "Save to plan"}
    </button>
  );
}
