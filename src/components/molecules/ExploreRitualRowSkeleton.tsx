import { memo } from 'react';
import { View } from 'react-native';

import { ShimmerSkeleton } from '@/components/atoms/ShimmerSkeleton';
import { EXPLORE_RITUAL_THUMB_SIZE } from '@/constants/exploreLayout';
import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';

/** First-paint placeholder — mirrors {@link ExploreRitualListRow} so the swap is seamless. */
export const ExploreRitualRowSkeleton = memo(function ExploreRitualRowSkeleton() {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className="flex-row items-center gap-3.5 rounded-[18px] border border-ritual-borderSoft/60 bg-ritual-surface/70 p-3 dark:border-ritual-borderSoft-dark/45 dark:bg-ritual-surface-dark/60"
    >
      <ShimmerSkeleton
        style={{
          width: EXPLORE_RITUAL_THUMB_SIZE,
          height: EXPLORE_RITUAL_THUMB_SIZE,
          borderRadius: RITUAL_CORNER_RADIUS,
        }}
      />
      <View className="flex-1 gap-2 py-1">
        <ShimmerSkeleton className="h-4 w-3/4 rounded-full" />
        <ShimmerSkeleton className="h-3 w-1/2 rounded-full" />
        <ShimmerSkeleton className="h-3 w-2/3 rounded-full" />
        <ShimmerSkeleton className="mt-1 h-3.5 w-1/4 rounded-full" />
      </View>
    </View>
  );
});
