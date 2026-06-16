import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';

import { FontAwesomeCircleIcon } from '@/components/atoms/FontAwesomeCircleIcon';
import { BookingListCard } from '@/components/molecules/BookingListCard';
import { BookingSectionLabel } from '@/components/molecules/BookingSectionLabel';
import { BookingTimelineSegmentedControl } from '@/components/molecules/BookingTimelineSegmentedControl';
import { BookingsEmptyState } from '@/components/molecules/BookingsEmptyState';
import {
  SECTION_GHOST_HEADER_LEADING_SIZE,
  SectionGhostHeader,
} from '@/components/molecules/SectionGhostHeader';
import { BOOKING_CARD_GAP } from '@/constants/bookingsLayout';
import type { BookingTimeline } from '@/domain/booking';
import type { BookingListRow, BookingTimelineCounts } from '@/hooks/useBookingsList';
import { authScreen } from '@/theme/tokens';

type Props = {
  timeline: BookingTimeline;
  counts: BookingTimelineCounts;
  rows: BookingListRow[];
  listBottomInset: number;
  onChangeTimeline: (timeline: BookingTimeline) => void;
  onOpenBookingDetail: (bookingId: string) => void;
  onExplore: () => void;
};

/**
 * Bookings tab body — one FlatList rendering the header (title + timeline switch) above grouped
 * section labels and cards, with a graceful empty state when the active timeline has nothing.
 */
export const BookingsList = memo(function BookingsList({
  timeline,
  counts,
  rows,
  listBottomInset,
  onChangeTimeline,
  onOpenBookingDetail,
  onExplore,
}: Props) {
  const { t } = useTranslation();

  const renderItem = useCallback<ListRenderItem<BookingListRow>>(
    ({ item }) => {
      if (item.kind === 'section') {
        return <BookingSectionLabel label={item.label} count={item.count} />;
      }
      return (
        <View style={styles.cardWrap}>
          <BookingListCard
            booking={item.booking}
            whenLine={item.whenLine}
            onPress={() => onOpenBookingDetail(item.booking.id)}
          />
        </View>
      );
    },
    [onOpenBookingDetail],
  );

  const ListHeader = useCallback(
    () => (
      <View className="pb-1">
        <SectionGhostHeader
          leading={
            <FontAwesomeCircleIcon
              name="calendar"
              circleSize={SECTION_GHOST_HEADER_LEADING_SIZE}
              accessibilityLabel={t('screens.bookings.sectionLeadingA11y')}
            />
          }
          title={t('screens.bookings.title')}
          description={t('screens.bookings.subtitle')}
          actionLabel={t('screens.bookings.headerAction')}
          actionAccessibilityLabel={t('screens.bookings.headerActionA11y')}
          onActionPress={onExplore}
          className="mb-4"
        />
        <BookingTimelineSegmentedControl
          value={timeline}
          counts={counts}
          onChange={onChangeTimeline}
        />
      </View>
    ),
    [t, onExplore, timeline, counts, onChangeTimeline],
  );

  const ListEmpty = useCallback(
    () => <BookingsEmptyState variant={timeline} onExplore={onExplore} />,
    [timeline, onExplore],
  );

  return (
    <FlatList
      data={rows}
      keyExtractor={(row) => row.key}
      renderItem={renderItem}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={ListEmpty}
      contentContainerStyle={[styles.listContent, { paddingBottom: listBottomInset }]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    />
  );
});

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingTop: 4,
    paddingHorizontal: authScreen.insetX,
  },
  cardWrap: {
    marginBottom: BOOKING_CARD_GAP,
  },
});
