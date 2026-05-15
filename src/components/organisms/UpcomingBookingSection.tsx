import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { GhostGlassButton } from '@/components/atoms/GhostGlassButton';
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
    <View className="mt-8" accessibilityRole="none">
      <View className="mb-2 flex-row items-center justify-between gap-3">
        <Text
          accessibilityRole="header"
          numberOfLines={1}
          className="min-w-0 flex-1 font-semibold text-login-body tracking-[-0.01em] text-ritual-ink dark:text-ritual-ink-dark"
        >
          {t('screens.home.upcomingBooking.sectionTitle')}
        </Text>
        <GhostGlassButton
          accessibilityLabel={t('screens.home.upcomingBooking.viewAllA11y')}
          label={t('screens.home.upcomingBooking.viewAll')}
          onPress={onViewAllBookings}
          className="flex-shrink-0"
        />
      </View>

      {booking ? (
        <UpcomingBookingCard booking={booking} onPress={() => onOpenBookingDetail(booking.id)} />
      ) : null}
    </View>
  );
});
