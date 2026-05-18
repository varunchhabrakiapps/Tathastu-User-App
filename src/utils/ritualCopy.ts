import type { TFunction } from 'i18next';

import type { TrendingRitualId } from '@/domain/trendingRitual';

export type RitualListCopy = {
  title: string;
  description: string;
  cardSubtitle: string;
  socialProof: string;
  volumeTag: string;
  priceGlance: string;
};

function itemPrefix(id: TrendingRitualId) {
  return `screens.home.trendingRituals.items.${id}`;
}

/** Shared ritual listing copy — home carousel + Explore catalog. */
export function getRitualListCopy(t: TFunction, id: TrendingRitualId): RitualListCopy {
  const prefix = itemPrefix(id);
  return {
    title: t(`${prefix}.title`),
    description: t(`${prefix}.description`),
    cardSubtitle: t(`${prefix}.cardSubtitle`),
    socialProof: t(`${prefix}.socialProof`),
    volumeTag: t(`${prefix}.volumeTag`),
    priceGlance: t(`screens.ritualDetail.byId.${id}.priceAmount`),
  };
}

export function ritualSearchHaystack(copy: RitualListCopy): string {
  return [copy.title, copy.description, copy.cardSubtitle, copy.socialProof, copy.volumeTag]
    .join(' ')
    .toLowerCase();
}
