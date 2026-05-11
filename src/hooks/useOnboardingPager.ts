import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  useWindowDimensions,
  type FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import {
  ONBOARDING_SLIDE_IMAGES,
  ONBOARDING_VIEWABILITY_PERCENT,
} from '@/constants/onboardingLayout';
import type {
  OnboardingGetItemLayout,
  OnboardingSlideModel,
  ViewabilityChangeInfo,
} from '@/types/onboarding';

export type { OnboardingSlideModel } from '@/types/onboarding';

/**
 * Horizontal pager for onboarding: slide copy, list ref, and scroll helpers.
 */
export function useOnboardingPager() {
  const { t } = useTranslation();
  const { width: windowWidth } = useWindowDimensions();
  const listRef = useRef<FlatList<OnboardingSlideModel>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slideWidth = windowWidth;

  const slides = useMemo<OnboardingSlideModel[]>(() => {
    return [
      {
        id: 'liveRemote',
        title: t('screens.onboarding.slides.liveRemote.title'),
        body: t('screens.onboarding.slides.liveRemote.body'),
        illustrationLabel: t(
          'screens.onboarding.slides.liveRemote.illustrationA11y',
        ),
        illustrationSource: ONBOARDING_SLIDE_IMAGES.liveRemote,
      },
      {
        id: 'homeCeremonies',
        title: t('screens.onboarding.slides.homeCeremonies.title'),
        body: t('screens.onboarding.slides.homeCeremonies.body'),
        illustrationLabel: t(
          'screens.onboarding.slides.homeCeremonies.illustrationA11y',
        ),
        illustrationSource: ONBOARDING_SLIDE_IMAGES.homeCeremonies,
      },
    ];
  }, [t]);

  const slideCount = slides.length;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: ONBOARDING_VIEWABILITY_PERCENT,
  }).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: Pick<ViewabilityChangeInfo, 'viewableItems'>) => {
      const next = viewableItems[0]?.index;
      if (next != null) {
        setActiveIndex(next);
      }
    },
  ).current;

  const getItemLayout = useCallback<OnboardingGetItemLayout>(
    (_data, index) => ({
      length: slideWidth,
      offset: slideWidth * index,
      index,
    }),
    [slideWidth],
  );

  const onCarouselMomentumEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const x = event.nativeEvent.contentOffset.x;
      const idx = Math.round(x / slideWidth);
      setActiveIndex(Math.min(slideCount - 1, Math.max(0, idx)));
    },
    [slideWidth, slideCount],
  );

  const goToNextSlide = useCallback(() => {
    if (activeIndex >= slideCount - 1) {
      return;
    }
    const next = activeIndex + 1;
    listRef.current?.scrollToIndex({
      index: next,
      animated: true,
    });
    setActiveIndex(next);
  }, [activeIndex, slideCount]);

  const isLastSlide = activeIndex === slideCount - 1;

  return {
    slides,
    listRef: listRef as RefObject<FlatList<OnboardingSlideModel> | null>,
    slideWidth,
    activeIndex,
    viewabilityConfig,
    onViewableItemsChanged,
    getItemLayout,
    onCarouselMomentumEnd,
    goToNextSlide,
    isLastSlide,
  };
}
