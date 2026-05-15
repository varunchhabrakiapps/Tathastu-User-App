import {
  TESTIMONIAL_PREVIEW_IDS,
  type TestimonialPreview,
} from '@/domain/testimonialPreview';

/** Stable carousel payload — swap for API-backed reviews when wired. */
export const TESTIMONIALS_PREVIEW: readonly TestimonialPreview[] = TESTIMONIAL_PREVIEW_IDS.map(
  (id) => ({ id }),
);
