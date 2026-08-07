import { describe, expect, it } from "vitest";
import { formatRegion, formatStatus, slugify } from "@/lib/format";
import type { FestivalStatus } from "@/generated/prisma";

describe("formatRegion", () => {
  it("returns the macron label for MANAWATU_WHANGANUI", () => {
    expect(formatRegion("MANAWATU_WHANGANUI")).toBe("Manawatū-Whanganui");
  });

  it("returns the apostrophe label for HAWKES_BAY", () => {
    expect(formatRegion("HAWKES_BAY")).toBe("Hawke's Bay");
  });

  it("returns the plain label for a simple region", () => {
    expect(formatRegion("AUCKLAND")).toBe("Auckland");
  });

  it("returns 'Unknown region' for null", () => {
    expect(formatRegion(null)).toBe("Unknown region");
  });

  it("returns 'Unknown region' for undefined", () => {
    expect(formatRegion(undefined)).toBe("Unknown region");
  });
});

describe("formatStatus", () => {
  const cases: Array<[FestivalStatus, string]> = [
    ["ACTIVE", "Active"],
    ["TBC", "TBC"],
    ["HIATUS", "Hiatus"],
    ["DEFUNCT", "Defunct"],
    ["UNCONFIRMED", "Unconfirmed"],
  ];

  it.each(cases)("maps %s to label %s with a className", (status, label) => {
    const result = formatStatus(status);
    expect(result.label).toBe(label);
    expect(result.className).toEqual(expect.any(String));
    expect(result.className.length).toBeGreaterThan(0);
  });

  it("gives each status a distinct className", () => {
    const classNames = cases.map(([status]) => formatStatus(status).className);
    expect(new Set(classNames).size).toBe(classNames.length);
  });
});

describe("slugify", () => {
  it("lowercases and hyphenates a simple name", () => {
    expect(slugify("Rhythm and Vines")).toBe("rhythm-and-vines");
  });

  it("collapses an ampersand into a single hyphen run", () => {
    expect(slugify("Bay of Islands Jazz & Blues Festival")).toBe(
      "bay-of-islands-jazz-blues-festival",
    );
  });

  it("replaces an apostrophe with a hyphen", () => {
    expect(slugify("Taniwha's Den")).toBe("taniwha-s-den");
  });

  it("strips macrons down to their base letters", () => {
    expect(slugify("Manawatū-Whanganui")).toBe("manawatu-whanganui");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("  & Festival &  ")).toBe("festival");
  });

  it("collapses runs of non-alphanumeric characters", () => {
    expect(slugify("Outfield Music, Food & Arts Festival")).toBe(
      "outfield-music-food-arts-festival",
    );
  });
});
