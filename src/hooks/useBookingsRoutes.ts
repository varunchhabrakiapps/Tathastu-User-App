import type { NativeBottomTabNavigationProp } from '@bottom-tabs/react-navigation';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useCallback } from 'react';

import type { RootStackParamList, RootTabParamList } from '@/navigation/types';

type TabsNav = NativeBottomTabNavigationProp<RootTabParamList>;

/**
 * Navigation helpers for the Bookings tab — open the overlay detail route (root stack) and
 * hop to Explore so members can book a new ritual (empty-state CTA + header action).
 */
export function useBookingsRoutes() {
  const tabNavigation = useNavigation<TabsNav>();

  const openBookingDetail = useCallback(
    (bookingId: string) => {
      const rootNavigation = tabNavigation.getParent<StackNavigationProp<RootStackParamList>>();
      rootNavigation?.navigate('BookingDetail', { bookingId });
    },
    [tabNavigation],
  );

  const openExplore = useCallback(() => {
    tabNavigation.navigate('Explore', {});
  }, [tabNavigation]);

  return { openBookingDetail, openExplore };
}
