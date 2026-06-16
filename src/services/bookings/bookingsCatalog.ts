import type { TFunction } from 'i18next';

import type { Booking } from '@/domain/booking';

/**
 * Bookings list source — temporary stub mapper.
 *
 * Replace `resolveBookings` with `bookings.map((dto) => mapBookingDtoToBooking(dto, t))`
 * once the bookings API integrates; return `[]` when the member has no bookings.
 * Times are anchored relative to `nowMs` so the Today/Tomorrow sections always read live.
 */

/** Gate mock rows separately from empty layouts (flip off to preview empty states). */
const ENABLE_STUB_BOOKINGS = true;

/** ISO timestamp `dayOffset` days from `nowMs`, pinned to a local `hour:minute`. */
function isoAt(nowMs: number, dayOffset: number, hour: number, minute: number): string {
  const date = new Date(nowMs);
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

export function resolveBookings(t: TFunction, nowMs: number): Booking[] {
  if (!ENABLE_STUB_BOOKINGS) return [];

  return [
    // —— Upcoming · Today ——
    {
      id: 'bk-live-pooja-001',
      ritualId: 'live_pooja_video',
      ritualName: t('product.services.livePooja.title'),
      mode: 'video_call',
      status: 'confirmed',
      startAtISO: isoAt(nowMs, 0, 18, 30),
      panditName: t('screens.bookings.stub.panditMishra'),
      locationLine: null,
    },
    {
      id: 'bk-home-havan-006',
      ritualId: 'home_havan',
      ritualName: t('screens.home.trendingRituals.items.homeHavan.title'),
      mode: 'home_visit',
      status: 'scheduled',
      startAtISO: isoAt(nowMs, 0, 20, 0),
      panditName: t('screens.bookings.stub.panditSharma'),
      locationLine: t('screens.bookings.stub.locationMumbai'),
    },

    // —— Upcoming · Tomorrow ——
    {
      id: 'bk-griha-pravesh-002',
      ritualId: 'grah_pravesh_home',
      ritualName: t('product.services.grahPravesh.title'),
      mode: 'home_visit',
      status: 'confirmed',
      startAtISO: isoAt(nowMs, 1, 9, 0),
      panditName: t('screens.bookings.stub.panditSharma'),
      locationLine: t('screens.bookings.stub.locationPune'),
    },
    {
      id: 'bk-video-blessing-007',
      ritualId: 'video_blessing',
      ritualName: t('screens.home.trendingRituals.items.videoBlessing.title'),
      mode: 'video_call',
      status: 'scheduled',
      startAtISO: isoAt(nowMs, 1, 17, 45),
      panditName: t('screens.bookings.stub.panditIyer'),
      locationLine: null,
    },

    // —— Upcoming · Later ——
    {
      id: 'bk-nazar-utaro-003',
      ritualId: 'nazar_utaro_video',
      ritualName: t('product.services.nazarUttaro.title'),
      mode: 'video_call',
      status: 'scheduled',
      startAtISO: isoAt(nowMs, 4, 7, 15),
      panditName: t('screens.bookings.stub.panditIyer'),
      locationLine: null,
    },
    {
      id: 'bk-exam-blessings-008',
      ritualId: 'exam_blessings',
      ritualName: t('screens.home.trendingRituals.items.examBlessings.title'),
      mode: 'video_call',
      status: 'confirmed',
      startAtISO: isoAt(nowMs, 8, 6, 0),
      panditName: t('screens.bookings.stub.panditMishra'),
      locationLine: null,
    },

    // —— Past · Completed ——
    {
      id: 'bk-home-havan-004',
      ritualId: 'home_havan',
      ritualName: t('screens.home.trendingRituals.items.homeHavan.title'),
      mode: 'home_visit',
      status: 'completed',
      startAtISO: isoAt(nowMs, -6, 8, 0),
      panditName: t('screens.bookings.stub.panditSharma'),
      locationLine: t('screens.bookings.stub.locationMumbai'),
    },
    {
      id: 'bk-car-blessing-005',
      ritualId: 'new_car_blessing',
      ritualName: t('screens.home.trendingRituals.items.newCarBlessing.title'),
      mode: 'video_call',
      status: 'completed',
      startAtISO: isoAt(nowMs, -20, 11, 30),
      panditName: t('screens.bookings.stub.panditMishra'),
      locationLine: null,
    },
    {
      id: 'bk-nazar-utaro-009',
      ritualId: 'nazar_utaro_video',
      ritualName: t('product.services.nazarUttaro.title'),
      mode: 'video_call',
      status: 'completed',
      startAtISO: isoAt(nowMs, -14, 19, 0),
      panditName: t('screens.bookings.stub.panditIyer'),
      locationLine: null,
    },

    // —— Past · Cancelled ——
    {
      id: 'bk-exam-blessings-010',
      ritualId: 'exam_blessings',
      ritualName: t('screens.home.trendingRituals.items.examBlessings.title'),
      mode: 'video_call',
      status: 'cancelled',
      startAtISO: isoAt(nowMs, -3, 8, 30),
      panditName: t('screens.bookings.stub.panditMishra'),
      locationLine: null,
    },
    {
      id: 'bk-griha-pravesh-011',
      ritualId: 'grah_pravesh_home',
      ritualName: t('product.services.grahPravesh.title'),
      mode: 'home_visit',
      status: 'cancelled',
      startAtISO: isoAt(nowMs, -12, 10, 0),
      panditName: t('screens.bookings.stub.panditSharma'),
      locationLine: t('screens.bookings.stub.locationBengaluru'),
    },
  ];
}
