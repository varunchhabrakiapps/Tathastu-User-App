import type { TFunction } from 'i18next';

import type { Booking, BookingTimeline } from '@/domain/booking';

/**
 * Pure scheduling helpers for the Bookings tab — timeline split, relative date grouping,
 * and locale-aware glance lines. No React / i18n state here so logic stays testable and
 * reusable when the bookings API replaces the stub catalog.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

/** Relative day buckets for the “Upcoming” timeline (past collapses to status groups). */
export type BookingDateGroupKey = 'today' | 'tomorrow' | 'upcoming';

function startOfDay(ms: number): number {
  const d = new Date(ms);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/** Whole calendar-day delta (local time): negative for past, 0 today, 1 tomorrow, … */
function calendarDayDelta(targetMs: number, nowMs: number): number {
  return Math.round((startOfDay(targetMs) - startOfDay(nowMs)) / DAY_MS);
}

/** Completed/cancelled are always past; otherwise compare the scheduled instant to now. */
export function getBookingTimeline(booking: Booking, nowMs: number): BookingTimeline {
  if (booking.status === 'completed' || booking.status === 'cancelled') {
    return 'past';
  }
  return new Date(booking.startAtISO).getTime() < nowMs ? 'past' : 'upcoming';
}

/** Today / Tomorrow / everything further out — used to section the upcoming list. */
export function getUpcomingDateGroup(startAtISO: string, nowMs: number): BookingDateGroupKey {
  const delta = calendarDayDelta(new Date(startAtISO).getTime(), nowMs);
  if (delta <= 0) return 'today';
  if (delta === 1) return 'tomorrow';
  return 'upcoming';
}

/** 12-hour clock without Intl (always available): e.g. “6:30 PM”. */
function formatClockTime(date: Date): string {
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const hours24 = date.getHours();
  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${minutes} ${period}`;
}

/** Locale-aware “Sat, 21 Jun” via Intl, with a numeric fallback if Intl is unavailable. */
function formatCalendarDate(date: Date, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }).format(date);
  } catch {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  }
}

/**
 * Single calm “when” line for a card — relative word for near dates, calendar date otherwise,
 * always suffixed with the clock time (e.g. “Today · 6:30 PM”, “Sat, 21 Jun · 7:15 AM”).
 */
export function formatBookingWhen(
  booking: Booking,
  nowMs: number,
  t: TFunction,
  locale: string,
): string {
  const date = new Date(booking.startAtISO);
  const time = formatClockTime(date);
  const delta = calendarDayDelta(date.getTime(), nowMs);

  if (delta === 0) return `${t('screens.bookings.card.relative.today')} · ${time}`;
  if (delta === 1) return `${t('screens.bookings.card.relative.tomorrow')} · ${time}`;
  if (delta === -1) return `${t('screens.bookings.card.relative.yesterday')} · ${time}`;
  return `${formatCalendarDate(date, locale)} · ${time}`;
}
