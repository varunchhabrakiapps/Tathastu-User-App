import { memo } from 'react';
import { View } from 'react-native';
import { RitualPrimaryButton } from '@/components/atoms/RitualPrimaryButton';
import { BrandHeader } from '@/components/molecules/BrandHeader';
import { OnboardingFooter } from '@/components/molecules/OnboardingFooter';
import { PaginationDots } from '@/components/molecules/PaginationDots';
import { OnboardingSlidesCarousel } from '@/components/organisms/OnboardingSlidesCarousel';
import {
  ONBOARDING_FOOTER_BODY_HEIGHT,
  ONBOARDING_MIN_BOTTOM_SCROLL_INSET,
} from '@/constants/onboardingLayout';
import type { OnboardingCarouselAdapter } from '@/types/onboarding';

type Props = Pick<
  OnboardingCarouselAdapter,
  | 'slides'
  | 'listRef'
  | 'slideWidth'
  | 'activeIndex'
  | 'viewabilityConfig'
  | 'onViewableItemsChanged'
  | 'getItemLayout'
  | 'onCarouselMomentumEnd'
> & {
  eyebrowMarketing: string;
  brandName: string;
  tagline: string;
  stepLabel: string;
  primaryCtaLabel: string;
  onPrimaryPress: () => void;
  primaryLoading: boolean;
  /** Device safe-area bottom — extra scroll pad above floating chrome. */
  safeAreaBottomInset: number;
};

/**
 * Onboarding: calm top story, hero carousel, floating ritual CTA sheet.
 */
export const OnboardingContent = memo(function OnboardingContent({
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
  safeAreaBottomInset,
}: Props) {
  const carouselBottomPadding =
    ONBOARDING_FOOTER_BODY_HEIGHT +
    Math.max(safeAreaBottomInset, ONBOARDING_MIN_BOTTOM_SCROLL_INSET);

  return (
    <View className="relative min-h-0 flex-1">
      <View className="min-h-0 flex-1">
        <View className="px-5">
          <BrandHeader
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
          carouselBottomPadding={carouselBottomPadding}
        />
      </View>

      <OnboardingFooter>
        <PaginationDots
          count={slides.length}
          activeIndex={activeIndex}
          activeTint="ritual"
        />
        <RitualPrimaryButton
          className="mt-3"
          label={primaryCtaLabel}
          onPress={onPrimaryPress}
          loading={primaryLoading}
          accessibilityLabel={primaryCtaLabel}
        />
      </OnboardingFooter>
    </View>
  );
});
