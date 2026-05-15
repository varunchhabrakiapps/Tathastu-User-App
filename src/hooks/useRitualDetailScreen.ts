import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from 'react-native';

import {
  RITUAL_DETAIL_HERO_HEIGHT,
  RITUAL_DETAIL_HERO_IMAGE,
  RITUAL_DETAIL_SAMPLE_VIDEO_POSTER,
} from '@/constants/ritualDetailLayout';
import type {
  RitualDetailBookingVM,
  RitualDetailNarrativeVM,
  RitualDetailStepVM,
} from '@/domain/ritualDetail';
import { TRENDING_RITUAL_IDS, type TrendingRitualId } from '@/domain/trendingRitual';
import type { RootStackParamList } from '@/navigation/types';

type RitualRoute = RouteProp<RootStackParamList, 'RitualDetail'>;

const TRENDING_IDS = new Set<string>(TRENDING_RITUAL_IDS);

/**
 * Ritual detail screen data — hero, narrative, deliverables + pricing VM, sample-video poster.
 */
export function useRitualDetailScreen() {
  const { t } = useTranslation();
  const { params } = useRoute<RitualRoute>();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const ritualKey = TRENDING_IDS.has(params.ritualId)
    ? (params.ritualId as TrendingRitualId)
    : null;

  const copyRoot = useMemo(
    () =>
      ritualKey
        ? `screens.ritualDetail.byId.${ritualKey}`
        : 'screens.ritualDetail.generic',
    [ritualKey],
  );

  const ritualTitle = useMemo(() => {
    if (!ritualKey) return t('screens.ritualDetail.placeholderRitualTitle');
    return t(`screens.home.trendingRituals.items.${ritualKey}.title`);
  }, [ritualKey, t]);

  const heroHeight = useMemo(() => {
    return Math.round(
      Math.min(
        RITUAL_DETAIL_HERO_HEIGHT.max,
        Math.max(
          RITUAL_DETAIL_HERO_HEIGHT.min,
          windowHeight * RITUAL_DETAIL_HERO_HEIGHT.windowHeightFactor,
        ),
      ),
    );
  }, [windowHeight]);

  const heroAccessibilityLabel = t(
    'screens.onboarding.slides.liveRemote.illustrationA11y',
  );

  const narrative = useMemo((): RitualDetailNarrativeVM => {
    const steps: RitualDetailStepVM[] = [1, 2, 3].map((n) => ({
      stepNumber: n,
      title: t(`${copyRoot}.step${n}Title`),
      body: t(`${copyRoot}.step${n}Body`),
    }));

    return {
      overviewEyebrow: t('screens.ritualDetail.narrative.sections.overview'),
      description: t(`${copyRoot}.description`),
      explanation: t(`${copyRoot}.explanation`),
      howEyebrow: t('screens.ritualDetail.narrative.sections.how'),
      howTitle: t('screens.ritualDetail.narrative.howTitle'),
      steps,
      videoEyebrow: t('screens.ritualDetail.narrative.sections.sampleVideo'),
      videoTitle: t(`${copyRoot}.videoTitle`),
      videoBody: t(`${copyRoot}.videoBody`),
      videoCtaLabel: t('screens.ritualDetail.narrative.videoCta'),
      videoDisabledHint: t('screens.ritualDetail.narrative.videoDisabledHint'),
      videoThumbnailAccessibilityLabel: t(
        'screens.ritualDetail.narrative.videoThumbnailA11y',
      ),
    };
  }, [copyRoot, t]);

  const booking = useMemo((): RitualDetailBookingVM => {
    const deliverableLines = [1, 2, 3, 4].map((n) =>
      t(`${copyRoot}.deliverable${n}`),
    );

    return {
      deliverablesEyebrow: t('screens.ritualDetail.booking.sections.deliverables'),
      deliverableLines,
      priceEyebrow: t('screens.ritualDetail.booking.sections.price'),
      priceAmount: t(`${copyRoot}.priceAmount`),
      priceNote: t(`${copyRoot}.priceNote`),
      bookCtaLabel: t('screens.ritualDetail.booking.bookCta'),
      bookAccessibilityHint: t('screens.ritualDetail.booking.bookA11yHint'),
    };
  }, [copyRoot, t]);

  return {
    ritualTitle,
    heroSource: RITUAL_DETAIL_HERO_IMAGE,
    heroAccessibilityLabel,
    heroHeight,
    windowWidth,
    heroSubtitle: t('screens.ritualDetail.heroSubtitle'),
    narrative,
    booking,
    sampleVideoPosterSource: RITUAL_DETAIL_SAMPLE_VIDEO_POSTER,
  };
}
