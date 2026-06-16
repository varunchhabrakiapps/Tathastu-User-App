import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { Booking, BookingTimeline } from '@/domain/booking';
import { resolveBookings } from '@/services/bookings/bookingsCatalog';
import {
  formatBookingWhen,
  getBookingTimeline,
  getUpcomingDateGroup,
  type BookingDateGroupKey,
} from '@/utils/bookingSchedule';

/** Section grouping keys — date buckets (upcoming) or lifecycle buckets (past). */
type BookingGroupKey = BookingDateGroupKey | 'completed' | 'cancelled';

/** Flattened list rows — section labels interleaved with booking cards for one FlatList. */
export type BookingListRow =
  | { kind: 'section'; key: string; label: string; count: number }
  | { kind: 'booking'; key: string; booking: Booking; whenLine: string };

export type BookingTimelineCounts = Record<BookingTimeline, number>;

/** Fixed render order per timeline so sections never reshuffle between renders. */
const GROUP_ORDER: Record<BookingTimeline, BookingGroupKey[]> = {
  upcoming: ['today', 'tomorrow', 'upcoming'],
  past: ['completed', 'cancelled'],
};

function groupKeyFor(
  booking: Booking,
  timeline: BookingTimeline,
  nowMs: number,
): BookingGroupKey {
  if (timeline === 'past') {
    return booking.status === 'cancelled' ? 'cancelled' : 'completed';
  }
  return getUpcomingDateGroup(booking.startAtISO, nowMs);
}

function sortByStartAt(items: Booking[], timeline: BookingTimeline): Booking[] {
  return [...items].sort((a, b) => {
    const aTime = new Date(a.startAtISO).getTime();
    const bTime = new Date(b.startAtISO).getTime();
    // Upcoming reads soonest-first; past reads most-recent-first.
    return timeline === 'upcoming' ? aTime - bTime : bTime - aTime;
  });
}

/**
 * Bookings tab orchestration: resolves bookings, splits them into upcoming/past, then groups
 * + sorts the active timeline into flat rows (section headers + cards) for a single list.
 * Presentation layers stay dumb — they render the rows this hook composes.
 */
export function useBookingsList() {
  const { t, i18n } = useTranslation();
  const [timeline, setTimeline] = useState<BookingTimeline>('upcoming');

  // Stable "now" for the screen session — keeps relative grouping consistent across renders.
  const nowMs = useMemo(() => Date.now(), []);
  const allBookings = useMemo(() => resolveBookings(t, nowMs), [t, nowMs]);

  const byTimeline = useMemo(() => {
    const upcoming: Booking[] = [];
    const past: Booking[] = [];
    for (const booking of allBookings) {
      (getBookingTimeline(booking, nowMs) === 'past' ? past : upcoming).push(booking);
    }
    return { upcoming, past };
  }, [allBookings, nowMs]);

  const counts = useMemo<BookingTimelineCounts>(
    () => ({ upcoming: byTimeline.upcoming.length, past: byTimeline.past.length }),
    [byTimeline],
  );

  const rows = useMemo<BookingListRow[]>(() => {
    const sorted = sortByStartAt(byTimeline[timeline], timeline);

    const grouped = new Map<BookingGroupKey, Booking[]>();
    for (const booking of sorted) {
      const key = groupKeyFor(booking, timeline, nowMs);
      const bucket = grouped.get(key);
      if (bucket) {
        bucket.push(booking);
      } else {
        grouped.set(key, [booking]);
      }
    }

    const result: BookingListRow[] = [];
    for (const key of GROUP_ORDER[timeline]) {
      const bucket = grouped.get(key);
      if (!bucket || bucket.length === 0) continue;

      result.push({
        kind: 'section',
        key: `section-${key}`,
        label: t(`screens.bookings.sections.${key}`),
        count: bucket.length,
      });
      for (const booking of bucket) {
        result.push({
          kind: 'booking',
          key: booking.id,
          booking,
          whenLine: formatBookingWhen(booking, nowMs, t, i18n.language),
        });
      }
    }
    return result;
  }, [byTimeline, timeline, nowMs, t, i18n.language]);

  return {
    timeline,
    setTimeline,
    rows,
    counts,
    isEmpty: rows.length === 0,
  };
}
