import { describe, expect, it } from "vitest";
import {
  buildFestivalItinerary,
  filterFestivalsForPlanner,
  type PlanFestival,
} from "./plan-optimizer";

function festival(
  slug: string,
  start: string,
  end: string | null,
  overrides: Partial<PlanFestival> = {},
): PlanFestival {
  return {
    slug,
    name: slug,
    region: "AUCKLAND",
    genre: "EDM",
    startDate: new Date(start),
    endDate: end ? new Date(end) : null,
    lineupCount: 0,
    ...overrides,
  };
}

describe("filterFestivalsForPlanner", () => {
  const festivals = [
    festival("north-edm", "2026-12-28T00:00:00.000Z", null, {
      region: "AUCKLAND",
      genre: "EDM",
    }),
    festival("south-jazz", "2026-12-29T00:00:00.000Z", null, {
      region: "OTAGO",
      genre: "Jazz",
    }),
    festival("no-date", "2026-12-30T00:00:00.000Z", null, {
      startDate: null,
    }),
  ];

  it("keeps only festivals with a start date", () => {
    const result = filterFestivalsForPlanner(festivals, {
      strategy: "most",
      region: "all",
    });
    expect(result.map((f) => f.slug)).toEqual(["north-edm", "south-jazz"]);
  });

  it("filters to North Island regions", () => {
    const result = filterFestivalsForPlanner(festivals, {
      strategy: "most",
      region: "north",
    });
    expect(result.map((f) => f.slug)).toEqual(["north-edm"]);
  });

  it("filters to South Island regions", () => {
    const result = filterFestivalsForPlanner(festivals, {
      strategy: "most",
      region: "south",
    });
    expect(result.map((f) => f.slug)).toEqual(["south-jazz"]);
  });

  it("filters by genre case-insensitively", () => {
    const result = filterFestivalsForPlanner(festivals, {
      strategy: "most",
      region: "all",
      genre: "jazz",
    });
    expect(result.map((f) => f.slug)).toEqual(["south-jazz"]);
  });
});

describe("buildFestivalItinerary", () => {
  it("picks the maximum number of non-overlapping festivals", () => {
    const festivals = [
      festival("a", "2026-12-28T00:00:00.000Z", "2026-12-29T00:00:00.000Z"),
      festival("b", "2026-12-29T00:00:00.000Z", "2026-12-30T00:00:00.000Z"),
      festival("c", "2026-12-30T00:00:00.000Z", "2026-12-31T00:00:00.000Z"),
      festival("d", "2026-12-28T00:00:00.000Z", "2027-01-02T00:00:00.000Z"),
    ];
    const result = buildFestivalItinerary(festivals, {
      strategy: "most",
      region: "all",
    });
    expect(result.map((f) => f.slug)).toEqual(["a", "b", "c"]);
  });

  it("treats a missing end date as a single day", () => {
    const festivals = [
      festival("one-day", "2026-12-28T00:00:00.000Z", null),
      festival("next-day", "2026-12-29T00:00:00.000Z", null),
    ];
    const result = buildFestivalItinerary(festivals, {
      strategy: "most",
      region: "all",
    });
    expect(result.map((f) => f.slug)).toEqual(["one-day", "next-day"]);
  });

  it("prefers the bigger lineup when festivals overlap", () => {
    const festivals = [
      festival(
        "small",
        "2026-12-28T00:00:00.000Z",
        "2026-12-30T00:00:00.000Z",
        {
          lineupCount: 2,
        },
      ),
      festival("big", "2026-12-28T00:00:00.000Z", "2026-12-30T00:00:00.000Z", {
        lineupCount: 40,
      }),
    ];
    const result = buildFestivalItinerary(festivals, {
      strategy: "biggest",
      region: "all",
    });
    expect(result.map((f) => f.slug)).toEqual(["big"]);
  });

  it("prefers the indie pick when festivals overlap", () => {
    const festivals = [
      festival(
        "mainstream",
        "2026-12-28T00:00:00.000Z",
        "2026-12-30T00:00:00.000Z",
        {
          lineupCount: 40,
        },
      ),
      festival(
        "undiscovered",
        "2026-12-28T00:00:00.000Z",
        "2026-12-30T00:00:00.000Z",
        {
          lineupCount: 1,
        },
      ),
    ];
    const result = buildFestivalItinerary(festivals, {
      strategy: "indie",
      region: "all",
    });
    expect(result.map((f) => f.slug)).toEqual(["undiscovered"]);
  });

  it("caps the itinerary at maxCount", () => {
    const festivals = [
      festival("a", "2026-12-28T00:00:00.000Z", null),
      festival("b", "2026-12-29T00:00:00.000Z", null),
      festival("c", "2026-12-30T00:00:00.000Z", null),
    ];
    const result = buildFestivalItinerary(festivals, {
      strategy: "most",
      region: "all",
      maxCount: 2,
    });
    expect(result).toHaveLength(2);
  });

  it("returns an empty itinerary when nothing matches", () => {
    expect(
      buildFestivalItinerary([], { strategy: "most", region: "all" }),
    ).toEqual([]);
  });

  it("returns festivals sorted by start date", () => {
    const festivals = [
      festival("later", "2026-12-30T00:00:00.000Z", null),
      festival("earlier", "2026-12-28T00:00:00.000Z", null),
    ];
    const result = buildFestivalItinerary(festivals, {
      strategy: "most",
      region: "all",
    });
    expect(result.map((f) => f.slug)).toEqual(["earlier", "later"]);
  });
});
