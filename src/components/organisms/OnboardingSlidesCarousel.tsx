import type { RefObject } from 'react';
import { memo, useCallback } from 'react';
import type {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewToken,
} from 'react-native';
import { FlatList as RNFlatList, View } from 'react-native';

import { OnboardingSlideGraphic } from '@/components/molecules/OnboardingSlideGraphic';
import { OnboardingSlidePanel } from '@/components/molecules/OnboardingSlidePanel';
import type { OnboardingSlideModel } from '@/hooks/useOnboardingPager';

type Props = {
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
}: Props) {
  const renderItem = useCallback<ListRenderItem<OnboardingSlideModel>>(
    ({ item }) => (
      <OnboardingSlidePanel
        title={item.title}
        body={item.body}
        lead={item.lead}
        bullets={item.bullets}
        slideWidth={slideWidth}
        illustration={
          <OnboardingSlideGraphic
            variant={item.graphicVariant}
            accessibilityLabel={item.illustrationLabel}
          />
        }
      />
    ),
    [slideWidth],
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
        initialNumToRender={2}
        onScrollToIndexFailed={onScrollToIndexFailed}
      />
    </View>
  );
});
