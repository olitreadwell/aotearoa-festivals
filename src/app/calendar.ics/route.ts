import { prisma } from '@/lib/prisma';
import { FestivalStatus } from '@/generated/prisma';

function escapeICS(text: string): string {
  return text.replace(/[\\;,]/g, '\\$&').replace(/\n/g, '\\n');
}

function formatICSDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

export async function GET() {
  const festivals = await prisma.festival.findMany({
    where: {
      approved: true,
      status: { in: [FestivalStatus.ACTIVE, FestivalStatus.TBC] },
      startDate: { gte: new Date() },
    },
    orderBy: { startDate: 'asc' },
    select: {
      name: true,
      slug: true,
      startDate: true,
      endDate: true,
      location: true,
      notes: true,
      website: true,
    },
  });

  const events = festivals
    .filter((f) => f.startDate)
    .map((f) => {
      const end = f.endDate ?? new Date(f.startDate!.getTime() + 86400000);
      return [
        'BEGIN:VEVENT',
        `UID:${f.slug}@aotearoa-festivals`,
        `DTSTART:${formatICSDate(f.startDate!)}`,
        `DTEND:${formatICSDate(end)}`,
        `SUMMARY:${escapeICS(f.name)}`,
        ...(f.location ? [`LOCATION:${escapeICS(f.location)}`] : []),
        ...(f.notes ? [`DESCRIPTION:${escapeICS(f.notes)}`] : []),
        ...(f.website ? [`URL:${f.website}`] : []),
        'END:VEVENT',
      ].join('\r\n');
    });

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Aotearoa Festivals//calendar.ics//EN',
    'X-WR-CALNAME:Aotearoa Festivals — Upcoming',
    'NAME:Aotearoa Festivals — Upcoming',
    'REFRESH-INTERVAL;VALUE=DURATION:P1D',
    ...events,
    'END:VCALENDAR',
  ].join('\r\n');

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="aotearoa-festivals.ics"',
    },
  });
}
