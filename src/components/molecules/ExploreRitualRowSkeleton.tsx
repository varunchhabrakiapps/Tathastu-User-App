import { memo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { LiquidGlassMaterial } from '@/components/atoms/LiquidGlassMaterial';
import { ShimmerSkeleton } from '@/components/atoms/ShimmerSkeleton';
import { EXPLORE_RITUAL_THUMB_SIZE } from '@/constants/exploreLayout';
import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { paletteHex } from '@/theme/palette';

/** First-paint placeholder — mirrors {@link ExploreRitualListRow} so the swap is seamless. */
export const ExploreRitualRowSkeleton = memo(function ExploreRitualRowSkeleton() {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.shadowBase, Platform.OS === 'ios' ? styles.shadowIos : styles.shadowAndroid]}
    >
      <LiquidGlassMaterial preset="ghost" borderRadius={RITUAL_CORNER_RADIUS} className="rounded-[18px]">
        <View className="flex-row items-start gap-3.5 px-4 py-3.5">
          <ShimmerSkeleton
            style={{
              width: EXPLORE_RITUAL_THUMB_SIZE,
              height: EXPLORE_RITUAL_THUMB_SIZE,
              borderRadius: RITUAL_CORNER_RADIUS,
            }}
          />
          <View className="flex-1 gap-2.5">
            <View className="flex-row items-start justify-between gap-2.5">
              <View className="flex-1 gap-2">
                <ShimmerSkeleton className="h-3 w-2/5 rounded-full" />
                <ShimmerSkeleton className="h-4 w-4/5 rounded-full" />
                <ShimmerSkeleton className="h-4 w-3/5 rounded-full" />
              </View>
              <View className="items-end gap-2">
                <ShimmerSkeleton className="h-6 w-16 rounded-full" />
                <ShimmerSkeleton className="h-10 w-10 rounded-full" />
              </View>
            </View>
            <ShimmerSkeleton className="h-3.5 w-3/4 rounded-full" />
            <ShimmerSkeleton className="h-4 w-1/4 rounded-full" />
          </View>
        </View>
      </LiquidGlassMaterial>
    </View>
  );
});

const styles = StyleSheet.create({
  shadowBase: {
    borderRadius: RITUAL_CORNER_RADIUS,
  },
  shadowIos: {
    shadowColor: paletteHex.ritual.primary.light,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 0,
  },
  shadowAndroid: {
    elevation: 3,
  },
});
