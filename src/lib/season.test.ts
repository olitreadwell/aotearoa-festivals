import { describe, expect, it } from 'vitest';
import { getSeasonForDate, groupFestivalsBySeason, type Season } from './season';

function date(iso: string): Date {
  return new Date(iso);
}

describe('getSeasonForDate', () => {
  it('labels a December festival as Summer spanning the year boundary', () => {
    const season = getSeasonForDate(date('2025-12-27T00:00:00.000Z'));
    expect(season.key).toBe('SUMMER');
    expect(season.label).toBe('Summer 25/26');
  });

  it('labels a January festival as Summer of the previous calendar year', () => {
    const season = getSeasonForDate(date('2026-01-10T00:00:00.000Z'));
    expect(season.key).toBe('SUMMER');
    expect(season.label).toBe('Summer 25/26');
  });

  it('labels a February festival as Summer', () => {
    const season = getSeasonForDate(date('2026-02-14T00:00:00.000Z'));
    expect(season.key).toBe('SUMMER');
    expect(season.label).toBe('Summer 25/26');
  });

  it('labels March as Autumn', () => {
    const season = getSeasonForDate(date('2026-03-15T00:00:00.000Z'));
    expect(season.key).toBe('AUTUMN');
    expect(season.label).toBe('Autumn 2026');
  });

  it('labels June as Winter', () => {
    const season = getSeasonForDate(date('2026-06-21T00:00:00.000Z'));
    expect(season.key).toBe('WINTER');
    expect(season.label).toBe('Winter 2026');
  });

  it('labels September as Spring', () => {
    const season = getSeasonForDate(date('2026-09-23T00:00:00.000Z'));
    expect(season.key).toBe('SPRING');
    expect(season.label).toBe('Spring 2026');
  });

  it('treats the first day of each season as the new season', () => {
    expect(getSeasonForDate(date('2026-03-01T00:00:00.000Z')).key).toBe('AUTUMN');
    expect(getSeasonForDate(date('2026-06-01T00:00:00.000Z')).key).toBe('WINTER');
    expect(getSeasonForDate(date('2026-09-01T00:00:00.000Z')).key).toBe('SPRING');
    expect(getSeasonForDate(date('2026-12-01T00:00:00.000Z')).key).toBe('SUMMER');
  });
});

describe('groupFestivalsBySeason', () => {
  const festivals = [
    {
      id: '1',
      name: 'Winter Fest',
      startDate: date('2026-07-04T00:00:00.000Z'),
    },
    {
      id: '2',
      name: 'Summer Fest',
      startDate: date('2025-12-27T00:00:00.000Z'),
    },
    {
      id: '3',
      name: 'Autumn Fest',
      startDate: date('2026-04-10T00:00:00.000Z'),
    },
    {
      id: '4',
      name: 'Late Summer',
      startDate: date('2026-02-01T00:00:00.000Z'),
    },
  ];

  it('groups festivals by season, ordered by season start', () => {
    const groups = groupFestivalsBySeason(festivals);
    expect(groups.map((g) => g.season.label)).toEqual([
      'Summer 25/26',
      'Autumn 2026',
      'Winter 2026',
    ]);
  });

  it('sorts festivals within a season by start date', () => {
    const groups = groupFestivalsBySeason(festivals);
    const summer = groups.find((g) => g.season.key === 'SUMMER')!;
    expect(summer.festivals.map((f) => f.name)).toEqual(['Summer Fest', 'Late Summer']);
  });

  it('omits seasons with no festivals', () => {
    const groups = groupFestivalsBySeason([festivals[0]]);
    expect(groups).toHaveLength(1);
    expect(groups[0].season.key).toBe('WINTER');
  });

  it('returns an empty list for no festivals', () => {
    expect(groupFestivalsBySeason([])).toEqual([]);
  });

  it('exposes season start and end bounds', () => {
    const season: Season = getSeasonForDate(date('2025-12-27T00:00:00.000Z'));
    expect(season.start.toISOString()).toBe('2025-12-01T00:00:00.000Z');
    expect(season.end.toISOString()).toBe('2026-03-01T00:00:00.000Z');
  });
});
