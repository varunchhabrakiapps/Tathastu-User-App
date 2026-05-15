import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { UpcomingBookingPreview } from '@/domain/bookingPreview';
import { resolveUpcomingBookingPreview } from '@/services/bookings/upcomingBookingPreview';

/** Home anchor data — swaps to fetching + caching when bookings API integrates. */
export function useUpcomingBookingPreview(): UpcomingBookingPreview | null {
  const { t } = useTranslation();
  return useMemo(() => resolveUpcomingBookingPreview(t), [t]);
}
