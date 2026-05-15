import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { useThemePreference } from '@/hooks/useThemePreference';
import { formatLoginMobileForDisplay } from '@/utils/mobile';

/** Settings orchestration — confirmation + formatting stay out of presentational UI. */
export function useSettingsScreen() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const themePrefs = useThemePreference();

  const signedInMobileDisplay = useMemo(() => {
    const digits = user?.mobileNumber;
    if (!digits) return '—';
    return formatLoginMobileForDisplay(digits);
  }, [user?.mobileNumber]);

  const requestSignOut = useCallback(() => {
    Alert.alert(
      t('screens.settings.signOut'),
      t('screens.settings.signOutConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('screens.settings.signOut'),
          style: 'destructive',
          onPress: () => {
            logout().catch(() => {});
          },
        },
      ],
      { cancelable: true },
    );
  }, [logout, t]);

  return {
    t,
    signedInMobileDisplay,
    requestSignOut,
    preference: themePrefs.preference,
    setPreference: themePrefs.setPreference,
    isReady: themePrefs.isReady,
  };
}
