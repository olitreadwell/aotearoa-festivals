import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { PLAN_STORAGE_KEY } from "@/lib/plan-storage";
import { PlanToggle } from "./PlanToggle";

function createStorageMock(): Storage {
  let store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    clear: () => {
      store = new Map();
    },
    getItem: (key: string) => store.get(key) ?? null,
    key: (index: number) => [...store.keys()][index] ?? null,
    removeItem: (key: string) => {
      store.delete(key);
    },
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
  };
}

describe("PlanToggle", () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, "window", {
      value: { localStorage: createStorageMock() },
      configurable: true,
    });
  });

  afterEach(() => {
    cleanup();
    Object.defineProperty(globalThis, "window", {
      value: { localStorage: createStorageMock() },
      configurable: true,
    });
  });

  it("starts unsaved with an add label", () => {
    render(<PlanToggle slug="splore" name="Splore" />);
    const button = screen.getByRole("button", {
      name: "Add Splore to my plan",
    });
    expect(button.getAttribute("aria-pressed")).toBe("false");
    expect(button.textContent).toBe("Save to plan");
  });

  it("toggles to saved and back", () => {
    render(<PlanToggle slug="splore" name="Splore" />);
    const button = screen.getByRole("button", {
      name: "Add Splore to my plan",
    });
    fireEvent.click(button);
    expect(
      screen.getByRole("button", { name: "Remove Splore from my plan" }),
    ).toBeDefined();
    expect(button.getAttribute("aria-pressed")).toBe("true");
    expect(button.textContent).toBe("Saved");

    fireEvent.click(button);
    expect(button.getAttribute("aria-pressed")).toBe("false");
    expect(button.textContent).toBe("Save to plan");
  });

  it("starts saved when the slug is already in localStorage", () => {
    window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(["splore"]));
    render(<PlanToggle slug="splore" name="Splore" />);
    const button = screen.getByRole("button", {
      name: "Remove Splore from my plan",
    });
    expect(button.getAttribute("aria-pressed")).toBe("true");
  });

  it("persists the choice to localStorage", () => {
    render(<PlanToggle slug="splore" name="Splore" />);
    fireEvent.click(
      screen.getByRole("button", { name: "Add Splore to my plan" }),
    );
    expect(
      JSON.parse(window.localStorage.getItem(PLAN_STORAGE_KEY) ?? "[]"),
    ).toEqual(["splore"]);
  });
});
