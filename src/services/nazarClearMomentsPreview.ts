import type { NazarClearMomentPreview } from '@/domain/nazarClearMoment';
import { NAZAR_CLEAR_MOMENT_IDS } from '@/domain/nazarClearMoment';

const MOMENT_META = {
  interviewTomorrow: { icon: 'briefcase' as const },
  startedGlowing: { icon: 'star' as const },
  feelsOff: { icon: 'flash' as const },
  maaNotHere: { icon: 'home' as const, isPopular: true },
} satisfies Record<
  (typeof NAZAR_CLEAR_MOMENT_IDS)[number],
  { icon: NazarClearMomentPreview['icon']; isPopular?: boolean }
>;

/** Deterministic home feed cards until usage stats are fetched remotely. */
export const NAZAR_CLEAR_MOMENTS_PREVIEW: NazarClearMomentPreview[] = NAZAR_CLEAR_MOMENT_IDS.map(
  (id) => ({
    id,
    icon: MOMENT_META[id].icon,
    isPopular: MOMENT_META[id].isPopular,
  }),
);
