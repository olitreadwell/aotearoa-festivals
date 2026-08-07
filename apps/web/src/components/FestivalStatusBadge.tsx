type FestivalStatus = "ACTIVE" | "TBC" | "HIATUS" | "DEFUNCT" | "UNCONFIRMED";

const STATUS_LABELS: Record<FestivalStatus, string> = {
  ACTIVE: "Active",
  TBC: "TBC",
  HIATUS: "Hiatus",
  DEFUNCT: "Defunct",
  UNCONFIRMED: "Unconfirmed",
};

const STATUS_CLASSES: Record<FestivalStatus, string> = {
  ACTIVE: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  TBC: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  HIATUS: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  DEFUNCT: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  UNCONFIRMED:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

export interface FestivalStatusBadgeProps {
  status: FestivalStatus;
  className?: string;
}

export function FestivalStatusBadge({
  status,
  className = "",
}: FestivalStatusBadgeProps) {
  const baseClasses =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  const colorClasses = STATUS_CLASSES[status];

  return (
    <span
      data-testid="festival-status-badge"
      role="status"
      className={`${baseClasses} ${colorClasses} ${className}`.trim()}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
