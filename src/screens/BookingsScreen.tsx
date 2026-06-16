import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BookingsList } from '@/components/organisms/BookingsList';
import { HomeContainer } from '@/components/templates/HomeContainer';
import { useBookingsList } from '@/hooks/useBookingsList';
import { useBookingsRoutes } from '@/hooks/useBookingsRoutes';
import { authScreen } from '@/theme/tokens';

/** Bookings tab — poojas, home visits, and ceremonies grouped by timeline (thin wiring shell). */
export function BookingsScreen() {
  const insets = useSafeAreaInsets();
  const { timeline, setTimeline, rows, counts } = useBookingsList();
  const { openBookingDetail, openExplore } = useBookingsRoutes();

  const listBottomInset =
    authScreen.scrollBottom + insets.bottom + authScreen.homeFeedExtraBottom;

  return (
    <HomeContainer>
      <BookingsList
        timeline={timeline}
        counts={counts}
        rows={rows}
        listBottomInset={listBottomInset}
        onChangeTimeline={setTimeline}
        onOpenBookingDetail={openBookingDetail}
        onExplore={openExplore}
      />
    </HomeContainer>
  );
}
