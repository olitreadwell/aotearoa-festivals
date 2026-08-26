type FestivalStatus = "ACTIVE" | "TBC" | "HIATUS" | "DEFUNCT" | "UNCONFIRMED";

const STATUS_LABELS: Record<FestivalStatus, string> = {
  ACTIVE: "Upcoming",
  TBC: "Dates TBC",
  HIATUS: "On break",
  DEFUNCT: "Ended",
  UNCONFIRMED: "Unconfirmed",
};

const STATUS_CLASSES: Record<FestivalStatus, string> = {
  ACTIVE: "bg-wao-300/30 text-wao-0 dark:bg-wao-100/70 dark:text-wao-400",
  TBC: "bg-kowhai-300/40 text-kowhai-0 dark:bg-kowhai-100/70 dark:text-kowhai-300",
  HIATUS:
    "bg-kohatu-300/30 text-kohatu-0 dark:bg-kohatu-100/70 dark:text-kohatu-300",
  DEFUNCT:
    "bg-pohutukawa-300/40 text-pohutukawa-0 dark:bg-pohutukawa-200/20 dark:text-pohutukawa-300",
  UNCONFIRMED:
    "bg-tangaroa-300/30 text-tangaroa-0 dark:bg-tangaroa-100/70 dark:text-tangaroa-300",
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
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-tight";
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
