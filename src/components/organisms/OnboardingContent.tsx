import type { RefObject } from 'react';
import type {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewToken,
} from 'react-native';
import { View } from 'react-native';

import { PrimaryGlassButton } from '@/components/atoms/PrimaryGlassButton';
import { ElevatedSurfaceCard } from '@/components/molecules/ElevatedSurfaceCard';
import { OnboardingHeader } from '@/components/molecules/OnboardingHeader';
import { OnboardingPagerDots } from '@/components/molecules/OnboardingPagerDots';
import { OnboardingSlidesCarousel } from '@/components/organisms/OnboardingSlidesCarousel';
import type { OnboardingSlideModel } from '@/hooks/useOnboardingPager';

type Props = {
  eyebrowMarketing: string;
  brandName: string;
  tagline: string;
  stepLabel: string;
  slides: OnboardingSlideModel[];
  listRef: RefObject<FlatList<OnboardingSlideModel> | null>;
  slideWidth: number;
  activeIndex: number;
  viewabilityConfig: { itemVisiblePercentThreshold: number };
  onViewableItemsChanged: (info: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => void;
  getItemLayout: (
    data: ArrayLike<OnboardingSlideModel> | null | undefined,
    index: number,
  ) => { length: number; offset: number; index: number };
  onCarouselMomentumEnd: (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => void;
  primaryCtaLabel: string;
  onPrimaryPress: () => void;
  primaryLoading: boolean;
};

/**
 * Onboarding layout: header, paginated horizontal deck, footer card with dots + glass CTA.
 */
export function OnboardingContent({
  eyebrowMarketing,
  brandName,
  tagline,
  stepLabel,
  slides,
  listRef,
  slideWidth,
  activeIndex,
  viewabilityConfig,
  onViewableItemsChanged,
  getItemLayout,
  onCarouselMomentumEnd,
  primaryCtaLabel,
  onPrimaryPress,
  primaryLoading,
}: Props) {
  return (
    <View className="min-h-0 flex-1">
      <View className="px-5">
        <OnboardingHeader
          eyebrowMarketing={eyebrowMarketing}
          brandName={brandName}
          tagline={tagline}
          stepLabel={stepLabel}
        />
      </View>

      <OnboardingSlidesCarousel
        slides={slides}
        listRef={listRef}
        slideWidth={slideWidth}
        activeIndex={activeIndex}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        getItemLayout={getItemLayout}
        onCarouselMomentumEnd={onCarouselMomentumEnd}
      />

      <View className="mt-3 shrink-0 px-5">
        <ElevatedSurfaceCard>
          <OnboardingPagerDots count={slides.length} activeIndex={activeIndex} />
          <PrimaryGlassButton
            className="mt-5"
            label={primaryCtaLabel}
            onPress={onPrimaryPress}
            loading={primaryLoading}
            accessibilityLabel={primaryCtaLabel}
          />
        </ElevatedSurfaceCard>
      </View>
    </View>
  );
}
