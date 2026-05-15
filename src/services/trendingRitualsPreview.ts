import { TRENDING_RITUAL_IDS, type TrendingRitualPreview } from '@/domain/trendingRitual';

/** Curated placeholder ordering — replace with API when ready. */
export const TRENDING_RITUALS_PREVIEW: TrendingRitualPreview[] = TRENDING_RITUAL_IDS.map(
  (id, artworkPreset) => ({
    id,
    artworkPreset,
  }),
);
