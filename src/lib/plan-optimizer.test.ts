import { describe, expect, it } from 'vitest';
import {
  buildFestivalItinerary,
  filterFestivalsForPlanner,
  type PlanFestival,
} from './plan-optimizer';

function festival(
  slug: string,
  start: string,
  end: string | null,
  overrides: Partial<PlanFestival> = {}
): PlanFestival {
  return {
    slug,
    name: slug,
    region: 'AUCKLAND',
    genre: 'EDM',
    lineupGenres: ['EDM'],
    camping: null,
    ticketPrice: null,
    attendance: null,
    startDate: new Date(start),
    endDate: end ? new Date(end) : null,
    ...overrides,
  };
}

describe('filterFestivalsForPlanner', () => {
  const festivals = [
    festival('north-edm', '2026-12-28T00:00:00.000Z', null, {
      region: 'AUCKLAND',
      genre: 'EDM',
    }),
    festival('south-jazz', '2026-12-29T00:00:00.000Z', null, {
      region: 'OTAGO',
      genre: 'Jazz',
    }),
    festival('no-date', '2026-12-30T00:00:00.000Z', null, {
      startDate: null,
    }),
  ];

  it('keeps only festivals with a start date', () => {
    const result = filterFestivalsForPlanner(festivals, {
      strategy: 'most',
      region: 'all',
    });
    expect(result.map((f) => f.slug)).toEqual(['north-edm', 'south-jazz']);
  });

  it('filters to North Island regions', () => {
    const result = filterFestivalsForPlanner(festivals, {
      strategy: 'most',
      region: 'north',
    });
    expect(result.map((f) => f.slug)).toEqual(['north-edm']);
  });

  it('filters to South Island regions', () => {
    const result = filterFestivalsForPlanner(festivals, {
      strategy: 'most',
      region: 'south',
    });
    expect(result.map((f) => f.slug)).toEqual(['south-jazz']);
  });

  it('filters by genre case-insensitively', () => {
    const result = filterFestivalsForPlanner(festivals, {
      strategy: 'most',
      region: 'all',
      genre: 'jazz',
    });
    expect(result.map((f) => f.slug)).toEqual(['south-jazz']);
  });

  it('matches genre against lineup artist genres', () => {
    const festivals = [
      festival('own-tag', '2026-12-28T00:00:00.000Z', null, {
        genre: 'Electronic',
      }),
      festival('lineup-only', '2026-12-29T00:00:00.000Z', null, {
        genre: null,
        lineupGenres: ['Hip hop', 'Drum & Bass'],
      }),
    ];
    const result = filterFestivalsForPlanner(festivals, {
      strategy: 'most',
      region: 'all',
      genre: 'hip hop',
    });
    expect(result.map((f) => f.slug)).toEqual(['lineup-only']);
  });

  it('filters by camping availability', () => {
    const festivals = [
      festival('camps', '2026-12-28T00:00:00.000Z', null, { camping: true }),
      festival('no-camps', '2026-12-29T00:00:00.000Z', null, {
        camping: false,
      }),
      festival('unknown', '2026-12-30T00:00:00.000Z', null, { camping: null }),
    ];
    expect(
      filterFestivalsForPlanner(festivals, {
        strategy: 'most',
        region: 'all',
        camping: 'yes',
      }).map((f) => f.slug)
    ).toEqual(['camps']);
    expect(
      filterFestivalsForPlanner(festivals, {
        strategy: 'most',
        region: 'all',
        camping: 'no',
      }).map((f) => f.slug)
    ).toEqual(['no-camps']);
  });

  it('filters to festivals of at least a given duration', () => {
    const festivals = [
      festival('one-day', '2026-12-28T00:00:00.000Z', null),
      festival('two-days', '2026-12-29T00:00:00.000Z', '2026-12-30T00:00:00.000Z'),
    ];
    const result = filterFestivalsForPlanner(festivals, {
      strategy: 'most',
      region: 'all',
      minDays: 2,
    });
    expect(result.map((f) => f.slug)).toEqual(['two-days']);
  });
});

describe('buildFestivalItinerary', () => {
  it('picks the maximum number of non-overlapping festivals', () => {
    const festivals = [
      festival('a', '2026-12-28T00:00:00.000Z', '2026-12-29T00:00:00.000Z'),
      festival('b', '2026-12-29T00:00:00.000Z', '2026-12-30T00:00:00.000Z'),
      festival('c', '2026-12-30T00:00:00.000Z', '2026-12-31T00:00:00.000Z'),
      festival('d', '2026-12-28T00:00:00.000Z', '2027-01-02T00:00:00.000Z'),
    ];
    const result = buildFestivalItinerary(festivals, {
      strategy: 'most',
      region: 'all',
    });
    // b (29–30) overlaps a's final day (29) and c's first day (30);
    // the max non-overlapping run is a (28–29) then c (30–31).
    expect(result.map((f) => f.slug)).toEqual(['a', 'c']);
  });

  it('treats a missing end date as a single day', () => {
    const festivals = [
      festival('one-day', '2026-12-28T00:00:00.000Z', null),
      festival('next-day', '2026-12-29T00:00:00.000Z', null),
    ];
    const result = buildFestivalItinerary(festivals, {
      strategy: 'most',
      region: 'all',
    });
    expect(result.map((f) => f.slug)).toEqual(['one-day', 'next-day']);
  });

  it('prefers the bigger crowd when festivals overlap', () => {
    const festivals = [
      festival('small', '2026-12-28T00:00:00.000Z', '2026-12-30T00:00:00.000Z', {
        attendance: 2000,
      }),
      festival('big', '2026-12-28T00:00:00.000Z', '2026-12-30T00:00:00.000Z', {
        attendance: 25000,
      }),
    ];
    const result = buildFestivalItinerary(festivals, {
      strategy: 'biggest',
      region: 'all',
    });
    expect(result.map((f) => f.slug)).toEqual(['big']);
  });

  it('prefers the small intimate festival when festivals overlap', () => {
    const festivals = [
      festival('mainstream', '2026-12-28T00:00:00.000Z', '2026-12-30T00:00:00.000Z', {
        attendance: 25000,
      }),
      festival('boutique', '2026-12-28T00:00:00.000Z', '2026-12-30T00:00:00.000Z', {
        attendance: 500,
      }),
    ];
    const result = buildFestivalItinerary(festivals, {
      strategy: 'indie',
      region: 'all',
    });
    expect(result.map((f) => f.slug)).toEqual(['boutique']);
  });

  it('caps the itinerary at maxCount', () => {
    const festivals = [
      festival('a', '2026-12-28T00:00:00.000Z', null),
      festival('b', '2026-12-29T00:00:00.000Z', null),
      festival('c', '2026-12-30T00:00:00.000Z', null),
    ];
    const result = buildFestivalItinerary(festivals, {
      strategy: 'most',
      region: 'all',
      maxCount: 2,
    });
    expect(result).toHaveLength(2);
  });

  it('returns an empty itinerary when nothing matches', () => {
    expect(buildFestivalItinerary([], { strategy: 'most', region: 'all' })).toEqual([]);
  });

  it('returns festivals sorted by start date', () => {
    const festivals = [
      festival('later', '2026-12-30T00:00:00.000Z', null),
      festival('earlier', '2026-12-28T00:00:00.000Z', null),
    ];
    const result = buildFestivalItinerary(festivals, {
      strategy: 'most',
      region: 'all',
    });
    expect(result.map((f) => f.slug)).toEqual(['earlier', 'later']);
  });
});
