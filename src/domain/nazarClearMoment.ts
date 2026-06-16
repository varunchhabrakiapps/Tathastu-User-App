/** Home “when do people clear nazar” cards — ids key i18n under `screens.home.nazarClearMoments.items`. */
export const NAZAR_CLEAR_MOMENT_IDS = [
  'interviewTomorrow',
  'startedGlowing',
  'feelsOff',
  'maaNotHere',
] as const;

export type NazarClearMomentId = (typeof NAZAR_CLEAR_MOMENT_IDS)[number];

export type NazarClearMomentPreview = {
  id: NazarClearMomentId;
  /** Font Awesome 4 glyph */
  icon: 'briefcase' | 'star' | 'flash' | 'home';
  isPopular?: boolean;
};
