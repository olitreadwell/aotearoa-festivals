import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ThemeToggle } from "@/components/ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.className = "";
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    document.documentElement.className = "";
    localStorage.clear();
  });

  it("renders a button with aria-label for light mode initially", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button.getAttribute("aria-label")).toBe("Switch to dark mode");
  });

  it("toggles the 'dark' class on document.documentElement when clicked", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");

    expect(document.documentElement.classList.contains("dark")).toBe(false);

    fireEvent.click(button);

    expect(document.documentElement.classList.contains("dark")).toBe(true);

    fireEvent.click(button);

    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("persists the theme to localStorage when toggled", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(localStorage.getItem("theme")).toBe("dark");

    fireEvent.click(button);

    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("changes aria-label between 'Switch to light mode' and 'Switch to dark mode'", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");

    expect(button.getAttribute("aria-label")).toBe("Switch to dark mode");

    fireEvent.click(button);

    expect(button.getAttribute("aria-label")).toBe("Switch to light mode");

    fireEvent.click(button);

    expect(button.getAttribute("aria-label")).toBe("Switch to dark mode");
  });

  it("dispatches a custom theme-change event when theme is toggled", () => {
    const eventListener = { handleEvent: () => {} };
    const spy = { called: false };
    eventListener.handleEvent = () => {
      spy.called = true;
    };

    window.addEventListener("aotearoa-theme-change", eventListener.handleEvent);

    render(<ThemeToggle />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(spy.called).toBe(true);

    window.removeEventListener(
      "aotearoa-theme-change",
      eventListener.handleEvent
    );
  });

  it("handles rapid consecutive toggles correctly", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(button.getAttribute("aria-label")).toBe("Switch to light mode");
  });
});
