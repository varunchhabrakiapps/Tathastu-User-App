import type { NativeBottomTabNavigationProp } from '@bottom-tabs/react-navigation';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useCallback } from 'react';

import type { RootStackParamList, RootTabParamList } from '@/navigation/types';

type TabsNav = NativeBottomTabNavigationProp<RootTabParamList>;

function getRootNavigator(navigation: TabsNav): StackNavigationProp<RootStackParamList> | undefined {
  return navigation.getParent<StackNavigationProp<RootStackParamList>>();
}

/**
 * Bookings-focused navigation helpers for Home anchor (tabs + overlay detail route).
 */
export function useHomeBookingRoutes() {
  const tabNavigation = useNavigation<TabsNav>();

  const openBookingsList = useCallback(() => {
    tabNavigation.navigate('Bookings');
  }, [tabNavigation]);

  const openBookingDetail = useCallback(
    (bookingId: string) => {
      const rootNavigation = getRootNavigator(tabNavigation);
      rootNavigation?.navigate('BookingDetail', { bookingId });
    },
    [tabNavigation],
  );

  return { openBookingsList, openBookingDetail };
}
