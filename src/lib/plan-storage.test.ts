import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  PLAN_STORAGE_KEY,
  readFestivalPlan,
  setPlanStatus,
  writeFestivalPlan,
} from './plan-storage';

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

describe('readFestivalPlan', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'window', {
      value: { localStorage: createStorageMock() },
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(globalThis, 'window', {
      value: { localStorage: createStorageMock() },
      configurable: true,
    });
  });

  it('returns an empty plan when nothing is saved', () => {
    expect(readFestivalPlan()).toEqual({});
  });

  it('reads statuses keyed by slug', () => {
    window.localStorage.setItem(
      PLAN_STORAGE_KEY,
      JSON.stringify({ splore: 'planned', 'northern-bass': 'interested' })
    );
    expect(readFestivalPlan()).toEqual({
      splore: 'planned',
      'northern-bass': 'interested',
    });
  });

  it('ignores unknown status values', () => {
    window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify({ ok: 'planned', bad: 'maybe' }));
    expect(readFestivalPlan()).toEqual({ ok: 'planned' });
  });

  it('migrates the legacy plain slug list to planned', () => {
    window.localStorage.setItem(
      PLAN_STORAGE_KEY,
      JSON.stringify(['splore', 42, 'rhythm-and-vines'])
    );
    expect(readFestivalPlan()).toEqual({
      splore: 'planned',
      'rhythm-and-vines': 'planned',
    });
  });

  it('returns an empty plan for corrupt JSON', () => {
    window.localStorage.setItem(PLAN_STORAGE_KEY, '{not-json');
    expect(readFestivalPlan()).toEqual({});
  });

  it('returns an empty plan when the stored value is not an object', () => {
    window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify('nope'));
    expect(readFestivalPlan()).toEqual({});
  });
});

describe('writeFestivalPlan', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'window', {
      value: { localStorage: createStorageMock() },
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(globalThis, 'window', {
      value: { localStorage: createStorageMock() },
      configurable: true,
    });
  });

  it('persists the plan', () => {
    writeFestivalPlan({ splore: 'planned', 'bay-dreams': 'interested' });
    expect(readFestivalPlan()).toEqual({
      splore: 'planned',
      'bay-dreams': 'interested',
    });
  });
});

describe('setPlanStatus', () => {
  it('sets a status', () => {
    expect(setPlanStatus({}, 'a', 'interested')).toEqual({
      a: 'interested',
    });
  });

  it('changes an existing status', () => {
    expect(setPlanStatus({ a: 'interested' }, 'a', 'planned')).toEqual({
      a: 'planned',
    });
  });

  it('removes a festival when status is null', () => {
    expect(setPlanStatus({ a: 'planned', b: 'interested' }, 'a', null)).toEqual({
      b: 'interested',
    });
  });
});
