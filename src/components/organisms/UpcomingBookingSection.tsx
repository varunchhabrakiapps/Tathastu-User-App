import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { FontAwesomeCircleIcon } from '@/components/atoms/FontAwesomeCircleIcon';
import { SectionGhostHeader, SECTION_GHOST_HEADER_LEADING_SIZE } from '@/components/molecules/SectionGhostHeader';
import { UpcomingBookingCard } from '@/components/molecules/UpcomingBookingCard';
import type { UpcomingBookingPreview } from '@/domain/bookingPreview';
import { authScreen } from '@/theme/tokens';

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
    <View style={styles.inset} className="mt-6" accessibilityRole="none">
      <SectionGhostHeader
        leading={
          <FontAwesomeCircleIcon
            name="calendar"
            circleSize={SECTION_GHOST_HEADER_LEADING_SIZE}
            accessibilityLabel={t('screens.home.upcomingBooking.sectionLeadingA11y')}
          />
        }
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

const styles = StyleSheet.create({
  inset: { paddingHorizontal: authScreen.insetX },
});
