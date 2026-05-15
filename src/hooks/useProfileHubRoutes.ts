import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useMemo } from 'react';

import type { ProfileStackParamList } from '@/navigation/types';

import { useContactSupportMail } from './useContactSupportMail';

type ProfileHubNav = StackNavigationProp<ProfileStackParamList, 'ProfileHub'>;

/** Profile hub — settings, help, notifications, legal, about, plus external mail for support. */
export function useProfileHubRoutes() {
  const stackNavigation = useNavigation<ProfileHubNav>();
  const { openFeedbackMail } = useContactSupportMail();

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

  return useMemo(
    () => ({
      openSettings,
      openHelp,
      openNotifications,
      openLegalInfo,
      openAbout,
      openContactSupport: openFeedbackMail,
    }),
    [openAbout, openFeedbackMail, openHelp, openLegalInfo, openNotifications, openSettings],
  );
}
