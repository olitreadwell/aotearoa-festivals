import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { PLAN_STORAGE_KEY } from '@/lib/plan-storage';
import { useFestivalPlan } from './useFestivalPlan';

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

describe('useFestivalPlan', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'window', {
      value: { localStorage: createStorageMock() },
      configurable: true,
    });
  });

  afterEach(() => {
    cleanup();
    Object.defineProperty(globalThis, 'window', {
      value: { localStorage: createStorageMock() },
      configurable: true,
    });
  });

  it('loads saved statuses on mount', () => {
    window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify({ splore: 'planned' }));
    const { result } = renderHook(() => useFestivalPlan());
    expect(result.current.statusOf('splore')).toBe('planned');
    expect(result.current.statusOf('other')).toBeNull();
    expect(result.current.savedCount).toBe(1);
  });

  it('sets and changes a festival status', () => {
    const { result } = renderHook(() => useFestivalPlan());
    act(() => result.current.setStatus('rhythm-and-vines', 'interested'));
    expect(result.current.statusOf('rhythm-and-vines')).toBe('interested');
    act(() => result.current.setStatus('rhythm-and-vines', 'planned'));
    expect(result.current.statusOf('rhythm-and-vines')).toBe('planned');
  });

  it('removes a festival when status is null', () => {
    const { result } = renderHook(() => useFestivalPlan());
    act(() => result.current.setStatus('northern-bass', 'planned'));
    act(() => result.current.setStatus('northern-bass', null));
    expect(result.current.statusOf('northern-bass')).toBeNull();
    expect(result.current.savedCount).toBe(0);
  });

  it('persists status changes to localStorage', () => {
    const { result } = renderHook(() => useFestivalPlan());
    act(() => result.current.setStatus('northern-bass', 'interested'));
    expect(JSON.parse(window.localStorage.getItem(PLAN_STORAGE_KEY) ?? '{}')).toEqual({
      'northern-bass': 'interested',
    });
  });
});
