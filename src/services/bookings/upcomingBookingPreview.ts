import type { TFunction } from 'i18next';

import type { BookingPreviewServiceMode, UpcomingBookingPreview } from '@/domain/bookingPreview';

/** Gate mock data separately from null-preview empty layouts (flip off when wiring API-only states). */
const ENABLE_STUB_BOOKING_PREVIEW = true;

/**
 * Resolved booking preview for Home anchor (temporary stub mapper).
 * Replace with `mapBookingToPreview(apiDto, t)`; return `null` when nothing is upcoming.
 */
export function resolveUpcomingBookingPreview(t: TFunction): UpcomingBookingPreview | null {
  if (!ENABLE_STUB_BOOKING_PREVIEW) return null;

  const mode: BookingPreviewServiceMode = 'video_call';

  return {
    id: 'booking-preview-grpr-001',
    ritualName: t('product.services.grahPravesh.title'),
    timingGlanceLine: t('screens.home.upcomingBooking.stubTimingGlance'),
    togetherGlanceLine: t('screens.home.upcomingBooking.togetherGlance', {
      name: t('screens.home.upcomingBooking.stubPanditName'),
    }),
    mode,
    status: 'upcoming_tomorrow',
  };
}
