import { useCallback } from 'react';

import { LEGAL_URLS } from '@/constants/legalUrls';
import { openExternalUrl } from '@/utils/openExternalUrl';

/** Opens hosted legal docs — keeps Linking out of presentational screens. */
export function useLegalInfoActions() {
  const openTerms = useCallback(() => {
    openExternalUrl(LEGAL_URLS.termsOfService).catch(() => {});
  }, []);

  const openPrivacy = useCallback(() => {
    openExternalUrl(LEGAL_URLS.privacyPolicy).catch(() => {});
  }, []);

  return { openTerms, openPrivacy };
}
