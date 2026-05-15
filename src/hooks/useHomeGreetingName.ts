import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/context/AuthContext';

/**
 * Personalized home greeting fragment — uses profile display name when present,
 * otherwise the warm i18n fallback until naming is wired through auth/API.
 */
export function useHomeGreetingName(): string {
  const { t } = useTranslation();
  const { user } = useAuth();

  return useMemo(() => {
    const raw = user?.displayName?.trim();
    if (raw) return raw;
    return t('screens.home.greetingFallbackName');
  }, [user?.displayName, t]);
}
