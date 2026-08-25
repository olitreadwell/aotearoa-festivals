"use client";

import { useCallback, useEffect, useState } from "react";
import {
  readPlanSlugs,
  togglePlanSlug,
  writePlanSlugs,
} from "@/lib/plan-storage";

export function useFestivalPlan() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    setSlugs(readPlanSlugs());
  }, []);

  const toggle = useCallback((slug: string) => {
    setSlugs((prev) => {
      const next = togglePlanSlug(prev, slug);
      writePlanSlugs(next);
      return next;
    });
  }, []);

  const isSaved = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  return { slugs, isSaved, toggle };
}
