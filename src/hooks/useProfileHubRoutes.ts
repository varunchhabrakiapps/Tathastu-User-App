import type { NativeBottomTabNavigationProp } from '@bottom-tabs/react-navigation';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useMemo } from 'react';

import type { ProfileStackParamList, RootTabParamList } from '@/navigation/types';

import { useContactSupportMail } from './useContactSupportMail';

type ProfileHubNav = StackNavigationProp<ProfileStackParamList, 'ProfileHub'>;
type TabsNav = NativeBottomTabNavigationProp<RootTabParamList>;

/**
 * Profile hub navigation — nested utility screens (edit, settings, help, …) plus cross-tab
 * hops to Bookings/Explore and the external support mail. Keeps Linking + navigation out of UI.
 */
export function useProfileHubRoutes() {
  const stackNavigation = useNavigation<ProfileHubNav>();
  const { openFeedbackMail } = useContactSupportMail();

  const openEditProfile = useCallback(() => {
    stackNavigation.navigate('EditProfile');
  }, [stackNavigation]);

  const openSettings = useCallback(() => {
    stackNavigation.navigate('Settings');
  }, [stackNavigation]);

  const openHelp = useCallback(() => {
    stackNavigation.navigate('Help');
  }, [stackNavigation]);

  const openNotifications = useCallback(() => {
    stackNavigation.navigate('Notifications');
  }, [stackNavigation]);

  const openLegalInfo = useCallback(() => {
    stackNavigation.navigate('LegalInfo');
  }, [stackNavigation]);

  const openAbout = useCallback(() => {
    stackNavigation.navigate('About');
  }, [stackNavigation]);

  const openSavedRituals = useCallback(() => {
    stackNavigation.getParent<TabsNav>()?.navigate('Explore', {});
  }, [stackNavigation]);

  const openBookings = useCallback(() => {
    stackNavigation.getParent<TabsNav>()?.navigate('Bookings');
  }, [stackNavigation]);

  return useMemo(
    () => ({
      openEditProfile,
      openSettings,
      openHelp,
      openNotifications,
      openLegalInfo,
      openAbout,
      openSavedRituals,
      openBookings,
      openContactSupport: openFeedbackMail,
    }),
    [
      openAbout,
      openBookings,
      openEditProfile,
      openFeedbackMail,
      openHelp,
      openLegalInfo,
      openNotifications,
      openSavedRituals,
      openSettings,
    ],
  );
}
