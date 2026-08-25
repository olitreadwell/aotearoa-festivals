import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { PLAN_STORAGE_KEY } from "@/lib/plan-storage";
import { PlanStatusSelect } from "./PlanStatusSelect";

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

describe("PlanStatusSelect", () => {
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

  it("starts unsaved", () => {
    render(<PlanStatusSelect slug="splore" name="Splore" />);
    const select = screen.getByLabelText(
      "Plan status for Splore",
    ) as HTMLSelectElement;
    expect(select.value).toBe("");
  });

  it("marks a festival interested", () => {
    render(<PlanStatusSelect slug="splore" name="Splore" />);
    const select = screen.getByLabelText("Plan status for Splore");
    fireEvent.change(select, { target: { value: "interested" } });
    expect((select as HTMLSelectElement).value).toBe("interested");
    expect(
      JSON.parse(window.localStorage.getItem(PLAN_STORAGE_KEY) ?? "{}"),
    ).toEqual({ splore: "interested" });
  });

  it("marks a festival planned and persists", () => {
    render(<PlanStatusSelect slug="splore" name="Splore" />);
    const select = screen.getByLabelText("Plan status for Splore");
    fireEvent.change(select, { target: { value: "planned" } });
    expect((select as HTMLSelectElement).value).toBe("planned");
    expect(
      JSON.parse(window.localStorage.getItem(PLAN_STORAGE_KEY) ?? "{}"),
    ).toEqual({ splore: "planned" });
  });

  it("removes a festival when set back to not saved", () => {
    window.localStorage.setItem(
      PLAN_STORAGE_KEY,
      JSON.stringify({ splore: "planned" }),
    );
    render(<PlanStatusSelect slug="splore" name="Splore" />);
    const select = screen.getByLabelText(
      "Plan status for Splore",
    ) as HTMLSelectElement;
    expect(select.value).toBe("planned");
    fireEvent.change(select, { target: { value: "" } });
    expect(select.value).toBe("");
    expect(
      JSON.parse(window.localStorage.getItem(PLAN_STORAGE_KEY) ?? "{}"),
    ).toEqual({});
  });
});
