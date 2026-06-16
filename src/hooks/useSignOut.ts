import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

import { useAuth } from '@/context/AuthContext';

/**
 * Shared sign-out confirmation + logout — reused by the Profile hub and Settings so the
 * destructive flow (and its calm copy) lives in one place rather than each screen.
 */
export function useSignOut() {
  const { t } = useTranslation();
  const { logout } = useAuth();

  return useCallback(() => {
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
}
