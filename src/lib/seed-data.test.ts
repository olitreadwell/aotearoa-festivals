import { describe, expect, it } from "vitest";
import seedData from "../../prisma/data/festivals-seed.json";

const KNOWN_STATUSES = ["active", "tbc", "hiatus", "defunct", "unconfirmed"];

describe("prisma/data/festivals-seed.json", () => {
  it("has at least one festival entry", () => {
    expect(seedData.festivals.length).toBeGreaterThan(0);
  });

  it.each(seedData.festivals.map((f) => [f.name, f] as const))(
    "%s has a non-empty name",
    (_name, festival) => {
      expect(festival.name.trim().length).toBeGreaterThan(0);
    },
  );

  it.each(seedData.festivals.map((f) => [f.name, f] as const))(
    "%s has a status from the known set used by prisma/seed.ts",
    (_name, festival) => {
      expect(KNOWN_STATUSES).toContain(festival.status);
    },
  );

  it.each(seedData.festivals.map((f) => [f.name, f] as const))(
    "%s has a non-empty region",
    (_name, festival) => {
      expect(typeof festival.region).toBe("string");
      expect(festival.region.trim().length).toBeGreaterThan(0);
    },
  );

  it("has no case-insensitive duplicate festival names", () => {
    const seen = new Map<string, string[]>();
    for (const f of seedData.festivals) {
      const key = f.name.trim().toLowerCase();
      seen.set(key, [...(seen.get(key) ?? []), f.name]);
    }
    const duplicates = [...seen.values()].filter((names) => names.length > 1);
    expect(duplicates).toEqual([]);
  });
});
