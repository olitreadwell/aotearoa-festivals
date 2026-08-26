import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
  buildHref,
}: {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-between"
    >
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1)}
          className="rounded-full border border-border bg-background px-4 py-2 text-sm transition-all duration-300 ease-out-expo hover:border-foreground/25 hover:bg-muted/60 active:scale-[0.98]"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-full border border-border/60 px-4 py-2 text-sm text-muted-foreground/60">
          Previous
        </span>
      )}

      <span className="tabular text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="rounded-full border border-border bg-background px-4 py-2 text-sm transition-all duration-300 ease-out-expo hover:border-foreground/25 hover:bg-muted/60 active:scale-[0.98]"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-full border border-border/60 px-4 py-2 text-sm text-muted-foreground/60">
          Next
        </span>
      )}
    </nav>
  );
}
