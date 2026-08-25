import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  PLAN_STORAGE_KEY,
  readPlanSlugs,
  togglePlanSlug,
  writePlanSlugs,
} from "./plan-storage";

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

describe("readPlanSlugs", () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, "window", {
      value: { localStorage: createStorageMock() },
      configurable: true,
    });
  });

  afterEach(() => {
    delete (globalThis as { window?: unknown }).window;
  });

  it("returns an empty list when nothing is saved", () => {
    expect(readPlanSlugs()).toEqual([]);
  });

  it("returns saved slugs in order", () => {
    window.localStorage.setItem(
      PLAN_STORAGE_KEY,
      JSON.stringify(["rhythm-and-vines", "northern-bass"]),
    );
    expect(readPlanSlugs()).toEqual(["rhythm-and-vines", "northern-bass"]);
  });

  it("ignores non-string entries", () => {
    window.localStorage.setItem(
      PLAN_STORAGE_KEY,
      JSON.stringify(["ok", 42, null, "also-ok"]),
    );
    expect(readPlanSlugs()).toEqual(["ok", "also-ok"]);
  });

  it("returns an empty list for corrupt JSON", () => {
    window.localStorage.setItem(PLAN_STORAGE_KEY, "{not-json");
    expect(readPlanSlugs()).toEqual([]);
  });

  it("returns an empty list when the stored value is not an array", () => {
    window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify("nope"));
    expect(readPlanSlugs()).toEqual([]);
  });
});

describe("writePlanSlugs", () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, "window", {
      value: { localStorage: createStorageMock() },
      configurable: true,
    });
  });

  afterEach(() => {
    delete (globalThis as { window?: unknown }).window;
  });

  it("persists the slug list", () => {
    writePlanSlugs(["splore", "twisted-frequency"]);
    expect(readPlanSlugs()).toEqual(["splore", "twisted-frequency"]);
  });
});

describe("togglePlanSlug", () => {
  it("adds a slug that is not saved", () => {
    expect(togglePlanSlug(["a"], "b")).toEqual(["a", "b"]);
  });

  it("removes a slug that is saved", () => {
    expect(togglePlanSlug(["a", "b"], "a")).toEqual(["b"]);
  });
});
