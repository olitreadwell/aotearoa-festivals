import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Pagination from "@/components/Pagination";

function buildHref(page: number): string {
  return `/festivals?page=${page}`;
}

describe("Pagination", () => {
  it("renders nothing when totalPages is 1", () => {
    const { container } = render(<Pagination currentPage={1} totalPages={1} buildHref={buildHref} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders page links when totalPages > 1", () => {
    render(<Pagination currentPage={1} totalPages={3} buildHref={buildHref} />);
    expect(screen.getByText("1")).toBeTruthy();
    expect(screen.getByText("2")).toBeTruthy();
    expect(screen.getByText("3")).toBeTruthy();
  });

  it("highlights current page", () => {
    render(<Pagination currentPage={2} totalPages={3} buildHref={buildHref} />);
    const current = screen.getByText("2");
    expect(current.getAttribute("aria-current")).toBe("page");
  });

  it("renders previous link except on first page", () => {
    const { } = render(<Pagination currentPage={2} totalPages={3} buildHref={buildHref} />);
    expect(screen.getByLabelText("Previous page")).toBeTruthy();
    const first = render(<Pagination currentPage={1} totalPages={3} buildHref={buildHref} />);
    expect(first.container.querySelector('[aria-label="Previous page"]')).toBeNull();
  });

  it("renders next link except on last page", () => {
    render(<Pagination currentPage={1} totalPages={3} buildHref={buildHref} />);
    expect(screen.getByLabelText("Next page")).toBeTruthy();
    const last = render(<Pagination currentPage={3} totalPages={3} buildHref={buildHref} />);
    expect(last.container.querySelector('[aria-label="Next page"]')).toBeNull();
  });
});
