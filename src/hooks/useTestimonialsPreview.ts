import { useMemo } from 'react';

import { TESTIMONIALS_PREVIEW } from '@/services/testimonialsPreview';

/** Home testimonials stripe — deterministic until reviews are fetched remotely. */
export function useTestimonialsPreview() {
  return useMemo(() => TESTIMONIALS_PREVIEW, []);
}
