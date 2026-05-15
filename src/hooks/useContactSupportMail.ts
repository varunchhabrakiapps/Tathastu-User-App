import { useCallback } from 'react';

import { SUPPORT_FEEDBACK_MAILTO } from '@/constants/supportContact';
import { openExternalUrl } from '@/utils/openExternalUrl';

export function useContactSupportMail() {
  const openFeedbackMail = useCallback(() => {
    openExternalUrl(SUPPORT_FEEDBACK_MAILTO).catch(() => {});
  }, []);

  return { openFeedbackMail };
}
