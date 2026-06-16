import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/context/AuthContext';
import { useSignOut } from '@/hooks/useSignOut';
import { useThemePreference } from '@/hooks/useThemePreference';
import { formatLoginMobileForDisplay } from '@/utils/mobile';

/** Settings orchestration — confirmation + formatting stay out of presentational UI. */
export function useSettingsScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const themePrefs = useThemePreference();
  const requestSignOut = useSignOut();

  const signedInMobileDisplay = useMemo(() => {
    const digits = user?.mobileNumber;
    if (!digits) return '—';
    return formatLoginMobileForDisplay(digits);
  }, [user?.mobileNumber]);

  return {
    t,
    signedInMobileDisplay,
    requestSignOut,
    preference: themePrefs.preference,
    setPreference: themePrefs.setPreference,
    isReady: themePrefs.isReady,
  };
}
