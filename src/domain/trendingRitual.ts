/** Stable ids — keys under `screens.home.trendingRituals.items` in i18n. */
export const TRENDING_RITUAL_IDS = [
  'videoBlessing',
  'nazarUttaro',
  'grihaPravesh',
  'homeHavan',
  'newCarBlessing',
  'examBlessings',
] as const;

export type TrendingRitualId = (typeof TRENDING_RITUAL_IDS)[number];

export type TrendingRitualPreview = {
  id: TrendingRitualId;
  /** Rotates onboarding cover art + reel scrim until dedicated trending imagery ships. */
  artworkPreset: number;
};
