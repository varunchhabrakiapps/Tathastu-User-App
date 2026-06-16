import { useTranslation } from 'react-i18next';

import { useAuth } from '@/context/AuthContext';

/** Resolved service-area label — persisted location or a calm placeholder until one is set. */
export function useUserLocationLabel(): string {
  const { t } = useTranslation();
  const { user } = useAuth();
  const savedLabel = user?.location?.label?.trim();

  return savedLabel || t('common.locationFallback');
}
