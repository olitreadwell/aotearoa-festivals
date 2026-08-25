import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Breadcrumbs from "@/components/Breadcrumbs";

describe("Breadcrumbs", () => {
  it("renders all items in order", () => {
    render(
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Festivals", href: "/festivals" },
          { label: "Rhythm and Vines" },
        ]}
      />,
    );
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav).toBeTruthy();
    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("Festivals")).toBeTruthy();
    expect(screen.getByText("Rhythm and Vines")).toBeTruthy();
  });

  it("renders last item without link and with aria-current=page", () => {
    render(
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "About" }]}
      />,
    );
    const last = screen.getByText("About");
    expect(last.tagName).toBe("SPAN");
    expect(last.getAttribute("aria-current")).toBe("page");
  });

  it("renders middle items as links", () => {
    render(
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Festivals", href: "/festivals" },
          { label: "Detail" },
        ]}
      />,
    );
    const link = screen.getByText("Festivals");
    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("/festivals");
  });

  it("renders single item as span with aria-current", () => {
    render(<Breadcrumbs items={[{ label: "Search" }]} />);
    const item = screen.getByText("Search");
    expect(item.tagName).toBe("SPAN");
    expect(item.getAttribute("aria-current")).toBe("page");
  });
});
