// Saved-festival plan, persisted in localStorage so the plan survives
// navigation without an account. Keyed by festival slug.

export const PLAN_STORAGE_KEY = "aotearoa-festivals:plan";

export function readPlanSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PLAN_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((slug): slug is string => typeof slug === "string")
      : [];
  } catch {
    return [];
  }
}

export function writePlanSlugs(slugs: string[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(slugs));
}

export function togglePlanSlug(slugs: string[], slug: string): string[] {
  return slugs.includes(slug)
    ? slugs.filter((s) => s !== slug)
    : [...slugs, slug];
}
