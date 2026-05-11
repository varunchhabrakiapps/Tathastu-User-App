import type { RefObject } from 'react';
import { memo, useCallback, useMemo } from 'react';
import type { FlatList, ListRenderItem } from 'react-native';
import {
  FlatList as RNFlatList,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { OnboardingHero } from '@/components/atoms/OnboardingHero';
import { OnboardingSlide } from '@/components/molecules/OnboardingSlide';
import { ONBOARDING_HERO_ART } from '@/constants/onboardingLayout';
import type {
  OnboardingCarouselAdapter,
  OnboardingSlideModel,
} from '@/types/onboarding';

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
  /** Reserve space for floating footer + safe area so content is not obscured. */
  carouselBottomPadding: number;
};

/**
 * Horizontally paginated onboarding deck (`pagingEnabled` + full-width items).
 */
export const OnboardingSlidesCarousel = memo(function OnboardingSlidesCarousel({
  slides,
  listRef,
  slideWidth,
  activeIndex,
  viewabilityConfig,
  onViewableItemsChanged,
  getItemLayout,
  onCarouselMomentumEnd,
  carouselBottomPadding,
}: Props) {
  const { t } = useTranslation();
  const { height: windowHeight } = useWindowDimensions();

  const deckA11yLabel = t('screens.onboarding.deckA11y');
  const deckA11yHint = t('screens.onboarding.deckA11yHint');

  const artHeight = useMemo(
    () =>
      Math.round(
        Math.min(
          ONBOARDING_HERO_ART.maxHeight,
          slideWidth * ONBOARDING_HERO_ART.widthFactor,
          Math.max(
            ONBOARDING_HERO_ART.minHeight,
            windowHeight * ONBOARDING_HERO_ART.windowHeightFactor,
          ),
        ) * ONBOARDING_HERO_ART.heightScale,
      ),
    [slideWidth, windowHeight],
  );

  const renderItem = useCallback<ListRenderItem<OnboardingSlideModel>>(
    ({ item, index }) => (
      <OnboardingSlide
        title={item.title}
        body={item.body}
        lead={item.lead}
        bullets={item.bullets}
        slideWidth={slideWidth}
        isActive={index === activeIndex}
        illustration={
          <OnboardingHero
            source={item.illustrationSource}
            accessibilityLabel={item.illustrationLabel}
            isActive={index === activeIndex}
            artHeight={artHeight}
          />
        }
      />
    ),
    [slideWidth, activeIndex, artHeight],
  );

  const keyExtractor = useCallback((item: OnboardingSlideModel) => item.id, []);

  const onScrollToIndexFailed = useCallback(
    (info: { index: number }) => {
      requestAnimationFrame(() => {
        listRef.current?.scrollToIndex({
          index: info.index,
          animated: false,
        });
      });
    },
    [listRef],
  );

  return (
    <View className="min-h-0 w-full flex-1">
      <RNFlatList
        ref={listRef}
        accessibilityLabel={deckA11yLabel}
        accessibilityHint={deckA11yHint}
        data={slides}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        decelerationRate="fast"
        keyboardShouldPersistTaps="handled"
        getItemLayout={getItemLayout}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        onMomentumScrollEnd={onCarouselMomentumEnd}
        extraData={activeIndex}
        removeClippedSubviews={false}
        windowSize={2}
        maxToRenderPerBatch={2}
        initialNumToRender={Math.min(2, slides.length)}
        onScrollToIndexFailed={onScrollToIndexFailed}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: carouselBottomPadding },
        ]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  listContent: { flexGrow: 1 },
});
