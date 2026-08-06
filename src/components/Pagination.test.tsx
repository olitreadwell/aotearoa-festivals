import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Pagination from "@/components/Pagination";

describe("Pagination", () => {
  afterEach(() => cleanup());

  const buildHref = (page: number) => `/festivals?page=${page}`;

  it("renders nothing when totalPages is 1", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} buildHref={buildHref} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when totalPages is less than 1", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={0} buildHref={buildHref} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("shows 'Page X of Y' text correctly", () => {
    render(<Pagination currentPage={2} totalPages={5} buildHref={buildHref} />);
    expect(screen.getByText("Page 2 of 5")).toBeDefined();
  });

  it("renders Previous as a disabled span on the first page", () => {
    render(<Pagination currentPage={1} totalPages={5} buildHref={buildHref} />);

    const previousButton = screen.getByText("Previous");
    expect(previousButton.tagName).toBe("SPAN");
    const previousLink = screen.queryByRole("link", { name: "Previous" });
    expect(previousLink).toBeNull();
  });

  it("renders Previous as a link with correct href on non-first pages", () => {
    render(<Pagination currentPage={2} totalPages={5} buildHref={buildHref} />);

    const previousLink = screen.getByRole("link", { name: "Previous" });
    expect(previousLink.getAttribute("href")).toBe("/festivals?page=1");
  });

  it("renders Next as a disabled span on the last page", () => {
    render(<Pagination currentPage={5} totalPages={5} buildHref={buildHref} />);

    const nextButton = screen.getByText("Next");
    expect(nextButton.tagName).toBe("SPAN");
    const nextLink = screen.queryByRole("link", { name: "Next" });
    expect(nextLink).toBeNull();
  });

  it("renders Next as a link with correct href on non-last pages", () => {
    render(<Pagination currentPage={2} totalPages={5} buildHref={buildHref} />);

    const nextLink = screen.getByRole("link", { name: "Next" });
    expect(nextLink.getAttribute("href")).toBe("/festivals?page=3");
  });

  it("renders both Previous and Next as links on middle pages", () => {
    render(<Pagination currentPage={3} totalPages={5} buildHref={buildHref} />);

    const links = screen.getAllByRole("link");
    expect(links.length).toBe(2);
    expect(links[0].textContent).toBe("Previous");
    expect(links[1].textContent).toBe("Next");
  });

  it("uses buildHref to generate correct page URLs", () => {
    const customHref = (page: number) => `/custom/path/${page}`;
    render(
      <Pagination currentPage={2} totalPages={4} buildHref={customHref} />,
    );

    const previousLink = screen.getByRole("link", { name: "Previous" });
    expect(previousLink.getAttribute("href")).toBe("/custom/path/1");

    const nextLink = screen.getByRole("link", { name: "Next" });
    expect(nextLink.getAttribute("href")).toBe("/custom/path/3");
  });
});
