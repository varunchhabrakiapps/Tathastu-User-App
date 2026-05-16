import type { ImageSourcePropType } from 'react-native';

import { ONBOARDING_SLIDE_IMAGES } from '@/constants/onboardingLayout';

/**
 * Ritual detail screen layout — hero, narrative scroll, sample-video poster, sticky booking bar.
 */
export const RITUAL_DETAIL_HERO_IMAGE: ImageSourcePropType =
  ONBOARDING_SLIDE_IMAGES.liveRemote;

/** Hero fold height clamp (logical px) — artwork draws from y=0 behind status bar + transparent header. */
export const RITUAL_DETAIL_HERO_HEIGHT = {
  min: 268,
  max: 408,
  windowHeightFactor: 0.46,
} as const;

/**
 * Sticky footer body ( {@link OnboardingFooter} + single price/CTA row), excluding safe-area inset.
 */
export const RITUAL_DETAIL_BOOKING_FOOTER_BODY = 56;
