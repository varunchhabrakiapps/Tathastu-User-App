import type { ImageSourcePropType } from 'react-native';

import { ONBOARDING_SLIDE_IMAGES } from '@/constants/onboardingLayout';

/**
 * Ritual detail screen layout — hero, narrative scroll, sample-video poster, sticky booking bar.
 */
export const RITUAL_DETAIL_HERO_IMAGE: ImageSourcePropType =
  ONBOARDING_SLIDE_IMAGES.liveRemote;

/** Sample-video poster until per-ritual clips ship — matches hero art for continuity. */
export const RITUAL_DETAIL_SAMPLE_VIDEO_POSTER: ImageSourcePropType =
  ONBOARDING_SLIDE_IMAGES.liveRemote;

/** Hero fold height clamp (logical px) — artwork draws from y=0 behind status bar + transparent header. */
export const RITUAL_DETAIL_HERO_HEIGHT = {
  min: 268,
  max: 408,
  windowHeightFactor: 0.46,
} as const;

/**
 * Approximate sticky booking footer body (labels + gaps + primary CTA), excluding safe-area inset.
 * Keep in sync with {@link RitualDetailBookingFooter} vertical rhythm.
 */
export const RITUAL_DETAIL_BOOKING_FOOTER_BODY = 132;
