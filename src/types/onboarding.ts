import type { RefObject } from 'react';
import type {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ImageSourcePropType,
  ViewToken,
} from 'react-native';

/**
 * Single slide entry for the onboarding horizontal deck.
 */
export type OnboardingSlideModel = {
  id: string;
  title: string;
  body?: string;
  lead?: string;
  bullets?: string[];
  illustrationLabel: string;
  illustrationSource: ImageSourcePropType;
};

export type ViewabilityChangeInfo = {
  viewableItems: ViewToken[];
  changed: ViewToken[];
};

/** FlatList `getItemLayout` signature for onboarding slides. */
export type OnboardingGetItemLayout = (
  data: ArrayLike<OnboardingSlideModel> | null | undefined,
  index: number,
) => { length: number; offset: number; index: number };

/** Shared scroll + measurement props for the onboarding carousel. */
export type OnboardingCarouselAdapter = {
  slides: OnboardingSlideModel[];
  listRef: RefObject<FlatList<OnboardingSlideModel> | null>;
  slideWidth: number;
  activeIndex: number;
  viewabilityConfig: { itemVisiblePercentThreshold: number };
  onViewableItemsChanged: (info: ViewabilityChangeInfo) => void;
  getItemLayout: OnboardingGetItemLayout;
  onCarouselMomentumEnd: (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => void;
};
