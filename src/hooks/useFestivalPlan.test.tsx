import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { PLAN_STORAGE_KEY } from "@/lib/plan-storage";
import { useFestivalPlan } from "./useFestivalPlan";

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

describe("useFestivalPlan", () => {
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

  it("loads saved slugs on mount", () => {
    window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(["splore"]));
    const { result } = renderHook(() => useFestivalPlan());
    expect(result.current.slugs).toEqual(["splore"]);
    expect(result.current.isSaved("splore")).toBe(true);
    expect(result.current.isSaved("other")).toBe(false);
  });

  it("toggles a slug in and out of the plan", () => {
    const { result } = renderHook(() => useFestivalPlan());
    act(() => result.current.toggle("rhythm-and-vines"));
    expect(result.current.isSaved("rhythm-and-vines")).toBe(true);
    act(() => result.current.toggle("rhythm-and-vines"));
    expect(result.current.isSaved("rhythm-and-vines")).toBe(false);
  });

  it("persists toggles to localStorage", () => {
    const { result } = renderHook(() => useFestivalPlan());
    act(() => result.current.toggle("northern-bass"));
    expect(
      JSON.parse(window.localStorage.getItem(PLAN_STORAGE_KEY) ?? "[]"),
    ).toEqual(["northern-bass"]);
  });
});
