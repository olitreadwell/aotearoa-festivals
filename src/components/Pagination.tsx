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
          className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm hover:border-neutral-500 dark:border-neutral-700"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-600">
          Previous
        </span>
      )}

      <span className="text-sm text-neutral-500 dark:text-neutral-400">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm hover:border-neutral-500 dark:border-neutral-700"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-600">
          Next
        </span>
      )}
    </nav>
  );
}
