/**
 * Static catalog: Vedic ritual marketplace — video ceremonies and home visits.
 * Copy lives in i18n (`product.*` keys). Use `useProduct()` to read this in UI.
 */
export type RitualModality = 'live_video' | 'home_visit';

export type FeaturedRitualService = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  modality: RitualModality;
};

export type ProductCatalog = {
  brandNameKey: string;
  positioningKey: string;
  missionKey: string;
  /**
   * Concrete offerings for onboarding & discovery screens (not shown on login).
   */
  featuredServices: FeaturedRitualService[];
};

export const productCatalog: ProductCatalog = {
  brandNameKey: 'product.brandName',
  positioningKey: 'product.positioning',
  missionKey: 'product.mission',
  featuredServices: [
    {
      id: 'nazar_utaro_video',
      titleKey: 'product.services.nazarUttaro.title',
      descriptionKey: 'product.services.nazarUttaro.description',
      modality: 'live_video',
    },
    {
      id: 'grah_pravesh_home',
      titleKey: 'product.services.grahPravesh.title',
      descriptionKey: 'product.services.grahPravesh.description',
      modality: 'home_visit',
    },
    {
      id: 'live_pooja_video',
      titleKey: 'product.services.livePooja.title',
      descriptionKey: 'product.services.livePooja.description',
      modality: 'live_video',
    },
  ],
};

/** i18n key for modality chip labels — use with `t()` on onboarding / catalog UI. */
export function modalityTranslationKey(
  modality: RitualModality,
): 'product.modalityLiveVideo' | 'product.modalityHomeVisit' {
  return modality === 'live_video'
    ? 'product.modalityLiveVideo'
    : 'product.modalityHomeVisit';
}
