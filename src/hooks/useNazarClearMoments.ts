import { useMemo } from 'react';

import { NAZAR_CLEAR_MOMENTS_PREVIEW } from '@/services/nazarClearMomentsPreview';

/** Home nazar-clear moments grid — social proof cards below the protection hero. */
export function useNazarClearMoments() {
  return useMemo(() => NAZAR_CLEAR_MOMENTS_PREVIEW, []);
}
