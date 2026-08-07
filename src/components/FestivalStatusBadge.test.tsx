import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FestivalStatusBadge } from "@/components/FestivalStatusBadge";

type FestivalStatus = "ACTIVE" | "TBC" | "HIATUS" | "DEFUNCT" | "UNCONFIRMED";

const ALL_STATUSES: FestivalStatus[] = [
  "ACTIVE",
  "TBC",
  "HIATUS",
  "DEFUNCT",
  "UNCONFIRMED",
];

describe("FestivalStatusBadge", () => {
  it.each(ALL_STATUSES)(
    "renders label and colour class for status %s",
    (status) => {
      render(<FestivalStatusBadge status={status} />);
      const badge = screen.getByTestId("festival-status-badge");
      expect(badge).toBeInTheDocument();
      expect(badge.textContent).toBeTruthy();
      expect(badge.className).toContain("bg-");
      expect(badge.className).toContain("text-");
    },
  );

  it("renders each status with a distinct colour class", () => {
    const classNames = ALL_STATUSES.map((status) => {
      const { container } = render(<FestivalStatusBadge status={status} />);
      const el = container.firstElementChild!;
      // Extract the bg-color class for comparison
      const bgClass = el.className.match(/bg-\w+-\d+/)?.[0] ?? "";
      return bgClass;
    });
    expect(new Set(classNames).size).toBeGreaterThanOrEqual(3);
  });

  it("merges additional className prop", () => {
    render(
      <FestivalStatusBadge status="ACTIVE" className="my-custom-class" />,
    );
    const badge = screen.getByTestId("festival-status-badge");
    expect(badge.className).toContain("my-custom-class");
  });

  it("has correct aria attributes", () => {
    render(<FestivalStatusBadge status="ACTIVE" />);
    const badge = screen.getByTestId("festival-status-badge");
    expect(badge.getAttribute("role")).toBe("status");
  });
});
