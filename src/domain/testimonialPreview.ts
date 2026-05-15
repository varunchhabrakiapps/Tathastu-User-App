/**
 * Home testimonials rail — ids key `screens.home.testimonials.items` in i18n.
 */
export const TESTIMONIAL_PREVIEW_IDS = ['anya', 'rohan', 'kiara', 'dev'] as const;

export type TestimonialPreviewId = (typeof TESTIMONIAL_PREVIEW_IDS)[number];

export type TestimonialPreview = {
  id: TestimonialPreviewId;
};
