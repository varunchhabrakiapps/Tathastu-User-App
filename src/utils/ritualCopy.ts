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

/** Richer copy for the long-press quick preview — list copy + price note + top deliverables. */
export type RitualPreviewCopy = RitualListCopy & {
  priceNote: string;
  highlights: string[];
};

/** Deliverables surfaced in the quick preview (full list lives on the detail screen). */
const PREVIEW_HIGHLIGHT_COUNT = 3;

function itemPrefix(id: TrendingRitualId) {
  return `screens.home.trendingRituals.items.${id}`;
}

function detailPrefix(id: TrendingRitualId) {
  return `screens.ritualDetail.byId.${id}`;
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

/** Quick-preview copy — extends list copy with the price note and a few deliverables. */
export function getRitualPreviewCopy(t: TFunction, id: TrendingRitualId): RitualPreviewCopy {
  const detail = detailPrefix(id);
  const highlights = Array.from({ length: PREVIEW_HIGHLIGHT_COUNT }, (_, index) =>
    t(`${detail}.deliverable${index + 1}`),
  );

  return {
    ...getRitualListCopy(t, id),
    priceNote: t(`${detail}.priceNote`),
    highlights,
  };
}

export function ritualSearchHaystack(copy: RitualListCopy): string {
  return [copy.title, copy.description, copy.cardSubtitle, copy.socialProof, copy.volumeTag]
    .join(' ')
    .toLowerCase();
}
