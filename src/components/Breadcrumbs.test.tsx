import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Breadcrumbs from "@/components/Breadcrumbs";

describe("Breadcrumbs", () => {
  afterEach(() => cleanup());

  it("renders every item's label as text", () => {
    const items = [
      { label: "Home" },
      { label: "Festivals" },
      { label: "Music Festival" },
    ];
    render(<Breadcrumbs items={items} />);

    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Festivals")).toBeDefined();
    expect(screen.getByText("Music Festival")).toBeDefined();
  });

  it("renders non-last items with href as links", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Festivals", href: "/festivals" },
      { label: "Music Festival" },
    ];
    render(<Breadcrumbs items={items} />);

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink.getAttribute("href")).toBe("/");

    const festivalsLink = screen.getByRole("link", { name: "Festivals" });
    expect(festivalsLink.getAttribute("href")).toBe("/festivals");
  });

  it("renders the last item without a link even if it has href", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Music Festival", href: "/music-festival" },
    ];
    render(<Breadcrumbs items={items} />);

    const links = screen.getAllByRole("link");
    expect(links.length).toBe(1);
    expect(links[0].textContent).toBe("Home");
  });

  it("sets aria-current='page' on the last item", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Current Page" },
    ];
    render(<Breadcrumbs items={items} />);

    const lastItem = screen.getByText("Current Page");
    expect(lastItem.getAttribute("aria-current")).toBe("page");
  });

  it("renders a single-item list correctly", () => {
    const items = [{ label: "Single Item" }];
    render(<Breadcrumbs items={items} />);

    const item = screen.getByText("Single Item");
    expect(item).toBeDefined();
    expect(item.getAttribute("aria-current")).toBe("page");
    expect(screen.queryAllByRole("link").length).toBe(0);
  });

  it("renders separators between items", () => {
    const items = [
      { label: "Item A" },
      { label: "Item B" },
      { label: "Item C" },
    ];
    render(<Breadcrumbs items={items} />);

    const separators = screen.getAllByText("/");
    expect(separators.length).toBe(2);
  });

  it("does not render a separator before the first item", () => {
    const items = [
      { label: "First" },
      { label: "Second" },
    ];
    render(<Breadcrumbs items={items} />);

    const listItems = screen.getByRole("navigation").querySelectorAll("li");
    const firstLi = listItems[0];
    const separatorInFirst = firstLi.querySelector('[aria-hidden="true"]');
    expect(separatorInFirst).toBeNull();
  });
});
