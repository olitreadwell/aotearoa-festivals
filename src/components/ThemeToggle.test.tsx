import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "@/components/ThemeToggle";

describe("ThemeToggle", () => {
  it("renders a button with accessible label", () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole("button");
    expect(btn).toBeTruthy();
    expect(btn.getAttribute("aria-label")).toBeTruthy();
  });

  it("toggles dark class on document element when clicked", () => {
    render(<ThemeToggle />);
    document.documentElement.classList.remove("dark");
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    fireEvent.click(btn);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("persists theme preference to localStorage", () => {
    localStorage.clear();
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button"));
    expect(localStorage.getItem("theme")).toBe("dark");
    fireEvent.click(screen.getByRole("button"));
    expect(localStorage.getItem("theme")).toBe("light");
    localStorage.clear();
  });
});
