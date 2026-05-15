import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { SectionGhostHeader } from '@/components/molecules/SectionGhostHeader';
import { UpcomingBookingCard } from '@/components/molecules/UpcomingBookingCard';
import type { UpcomingBookingPreview } from '@/domain/bookingPreview';

type Props = {
  booking: UpcomingBookingPreview | null;
  onViewAllBookings: () => void;
  onOpenBookingDetail: (bookingId: string) => void;
};

/**
 * Home ritual anchor — renders the first upcoming preview when present, leaving a composed
 * insertion point (`null` branch) ready for graceful empty-state design later.
 */
export const UpcomingBookingSection = memo(function UpcomingBookingSection({
  booking,
  onViewAllBookings,
  onOpenBookingDetail,
}: Props) {
  const { t } = useTranslation();

  return (
    <View className="mt-6" accessibilityRole="none">
      <SectionGhostHeader
        title={t('screens.home.upcomingBooking.sectionTitle')}
        actionLabel={t('screens.home.upcomingBooking.viewAll')}
        actionAccessibilityLabel={t('screens.home.upcomingBooking.viewAllA11y')}
        onActionPress={onViewAllBookings}
      />

      {booking ? (
        <UpcomingBookingCard booking={booking} onPress={() => onOpenBookingDetail(booking.id)} />
      ) : null}
    </View>
  );
});
