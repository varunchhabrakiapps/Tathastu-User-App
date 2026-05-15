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
  /** Gradient preset index for placeholder artwork (rotates through calm ritual tones). */
  artworkPreset: number;
};
