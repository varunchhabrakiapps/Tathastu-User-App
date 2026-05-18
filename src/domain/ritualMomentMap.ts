import type { MomentCategoryId } from '@/domain/momentCategory';
import { TRENDING_RITUAL_IDS, type TrendingRitualId } from '@/domain/trendingRitual';

/**
 * Editorial moment tags per ritual — powers Explore filters until catalog API ships.
 * A ritual may appear under multiple moods.
 */
export const RITUAL_MOMENT_TAGS: Record<TrendingRitualId, readonly MomentCategoryId[]> = {
  videoBlessing: ['lovedOnes', 'newChapter'],
  nazarUttaro: ['vibes', 'lovedOnes'],
  grihaPravesh: ['newChapter', 'lovedOnes'],
  homeHavan: ['lovedOnes', 'vibes'],
  newCarBlessing: ['glowUp', 'newChapter'],
  examBlessings: ['glowUp', 'squad'],
};

export function ritualMatchesMoment(ritualId: TrendingRitualId, momentId: MomentCategoryId): boolean {
  return RITUAL_MOMENT_TAGS[ritualId].includes(momentId);
}

export function ritualsForMoment(momentId: MomentCategoryId): TrendingRitualId[] {
  return TRENDING_RITUAL_IDS.filter((id) => ritualMatchesMoment(id, momentId));
}
