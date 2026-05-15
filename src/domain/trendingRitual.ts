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
  /** Varied reel overlay tint rotation (covers are keyed separately by ritual id). */
  artworkPreset: number;
};
