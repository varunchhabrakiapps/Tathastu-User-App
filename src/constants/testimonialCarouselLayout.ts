import { authScreen } from '@/theme/tokens';

/** Peek aligned with trending / moments horizontal rhythm. */
export const TESTIMONIAL_CAROUSEL_PEEK_PX = 26;

export const TESTIMONIAL_CARD_GAP = 11;

/** Broad cards so two-line praise + attribution stay readable without crowding the rail. */
const WIDTH_FRACTION = 0.82;
const WIDTH_MIN = 258;
const WIDTH_MAX = 312;

export function testimonialCardWidth(windowWidth: number): number {
  return Math.round(
    Math.min(WIDTH_MAX, Math.max(WIDTH_MIN, windowWidth * WIDTH_FRACTION)),
  );
}

export const testimonialCarouselContentPadding = {
  paddingLeft: authScreen.insetX,
  paddingRight: authScreen.insetX + TESTIMONIAL_CAROUSEL_PEEK_PX,
  paddingVertical: 10,
} as const;
