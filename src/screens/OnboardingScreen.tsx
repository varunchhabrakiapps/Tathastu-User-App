import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { OnboardingScreenBackdrop } from '@/components/molecules/OnboardingScreenBackdrop';
import { OnboardingContent } from '@/components/organisms/OnboardingContent';
import {
  ONBOARDING_MIN_TOP_INSET,
  ONBOARDING_TOP_INSET_EXTRA,
} from '@/constants/onboardingLayout';
import { useCompleteOnboarding } from '@/hooks/useCompleteOnboarding';
import { useOnboardingPager } from '@/hooks/useOnboardingPager';

export function OnboardingScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const {
    slides,
    listRef,
    slideWidth,
    activeIndex,
    viewabilityConfig,
    onViewableItemsChanged,
    getItemLayout,
    onCarouselMomentumEnd,
    goToNextSlide,
    isLastSlide,
  } = useOnboardingPager();
  const { completeOnboarding, isCompleting } = useCompleteOnboarding();

  const onPrimaryPress = useCallback(() => {
    if (isLastSlide) {
      completeOnboarding();
      return;
    }
    goToNextSlide();
  }, [isLastSlide, goToNextSlide, completeOnboarding]);

  const primaryCtaLabel = isLastSlide
    ? t('screens.onboarding.ctaContinue')
    : t('screens.onboarding.ctaNext');

  const stepLabel = t('screens.onboarding.stepOf', {
    current: activeIndex + 1,
    total: slides.length,
  });

  return (
    <OnboardingScreenBackdrop>
      <View
        className="min-h-0 flex-1"
        style={{
          paddingTop:
            Math.max(insets.top, ONBOARDING_MIN_TOP_INSET) +
            ONBOARDING_TOP_INSET_EXTRA,
        }}
      >
        <OnboardingContent
          eyebrowMarketing={t('screens.onboarding.eyebrowMarketing')}
          brandName={t('product.brandName')}
          tagline={t('screens.onboarding.tagline')}
          stepLabel={stepLabel}
          slides={slides}
          listRef={listRef}
          slideWidth={slideWidth}
          activeIndex={activeIndex}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
          getItemLayout={getItemLayout}
          onCarouselMomentumEnd={onCarouselMomentumEnd}
          primaryCtaLabel={primaryCtaLabel}
          onPrimaryPress={onPrimaryPress}
          primaryLoading={isCompleting}
          safeAreaBottomInset={insets.bottom}
        />
      </View>
    </OnboardingScreenBackdrop>
  );
}
