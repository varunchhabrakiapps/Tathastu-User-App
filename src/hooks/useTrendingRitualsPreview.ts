import { useMemo } from 'react';

import { TRENDING_RITUALS_PREVIEW } from '@/services/trendingRitualsPreview';

/** Stable home carousel dataset — swap implementation when trending is API-backed. */
export function useTrendingRitualsPreview() {
  return useMemo(() => TRENDING_RITUALS_PREVIEW, []);
}
