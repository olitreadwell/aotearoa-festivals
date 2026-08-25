"use client";

import Link from "next/link";
import { useFestivalPlan } from "@/hooks/useFestivalPlan";

export function PlanNavLink({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const { slugs } = useFestivalPlan();
  return (
    <Link href="/plan" onClick={onClick} className={className}>
      Plan
      {slugs.length > 0 && (
        <span className="ml-1.5 inline-flex min-w-4 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-primary-foreground">
          {slugs.length}
        </span>
      )}
    </Link>
  );
}
