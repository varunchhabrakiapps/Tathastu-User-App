import type { ImageSourcePropType } from 'react-native';

/**
 * Layout and motion tokens for onboarding — single place to tune spacing and timing
 * without scattering magic numbers across components.
 */
/** Vertical space reserved for footer chrome (dots + CTA) excluding device safe area. */
export const ONBOARDING_FOOTER_BODY_HEIGHT = 142;

/** Minimum bottom inset used when composing carousel padding below the deck. */
export const ONBOARDING_MIN_BOTTOM_SCROLL_INSET = 12;

/** Top safe-area slack added under the notch (beyond max(insets.top, …)). */
export const ONBOARDING_TOP_INSET_EXTRA = 6;

/** Minimum top inset when composing screen top padding with safe area. */
export const ONBOARDING_MIN_TOP_INSET = 8;

/** Hero illustration height clamps (logical px — scales with carousel width / window). */
export const ONBOARDING_HERO_ART = {
  maxHeight: 368,
  widthFactor: 0.78,
  minHeight: 248,
  windowHeightFactor: 0.38,
  /** Final polish bump applied to computed art height — matches legacy visual. */
  heightScale: 1.065,
} as const;

/** Copy block fade / lift when a slide gains focus (ms). */
export const ONBOARDING_COPY_FOCUS_DURATION_MS = 420;

/** Carousel viewability threshold — index updates when slide is mostly on screen. */
export const ONBOARDING_VIEWABILITY_PERCENT = 55;

/** Catalog of bundled onboarding illustrations (typed keys for pager data). */
export const ONBOARDING_SLIDE_ART_KEYS = ['liveRemote', 'homeCeremonies'] as const;
export type OnboardingSlideArtKey = (typeof ONBOARDING_SLIDE_ART_KEYS)[number];

export const ONBOARDING_SLIDE_IMAGES: Record<
  OnboardingSlideArtKey,
  ImageSourcePropType
> = {
  liveRemote: require('../../assets/images/onboarding/video-ritual.png'),
  homeCeremonies: require('../../assets/images/onboarding/puja-ceremonies-home.png'),
};
