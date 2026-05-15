import type { ImageSourcePropType } from 'react-native';

import type { TrendingRitualId } from '@/domain/trendingRitual';

const examBlessingsCover = require('../../assets/images/trending/exam-blessings.png');
const grahShantiCover = require('../../assets/images/trending/grah-shanti.png');
const nazarRitualCover = require('../../assets/images/trending/nazar-ritual.png');
const newCarPoojaCover = require('../../assets/images/trending/new-car-pooja.png');

/**
 * Editorial covers bundled under `assets/images/trending`.
 * Repeated entries pick the closest thematic match when artwork count < ritual count.
 */
const TRENDING_RITUAL_COVER_IMAGE_BY_ID = {
  /** Remote blessing — reuse auspicious household ritual art until a video-specific cover ships. */
  videoBlessing: grahShantiCover,
  nazarUttaro: nazarRitualCover,
  grihaPravesh: grahShantiCover,
  homeHavan: grahShantiCover,
  newCarBlessing: newCarPoojaCover,
  examBlessings: examBlessingsCover,
} satisfies Record<TrendingRitualId, ImageSourcePropType>;

export function trendingRitualCoverSource(id: TrendingRitualId): ImageSourcePropType {
  return TRENDING_RITUAL_COVER_IMAGE_BY_ID[id];
}
