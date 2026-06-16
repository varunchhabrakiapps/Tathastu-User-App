import type { ReactNode } from 'react';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { LiquidGlassMaterial } from '@/components/atoms/LiquidGlassMaterial';
import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { useGhostCardShadow } from '@/theme/ghostCardShadow';

type Props = {
  children: ReactNode;
};

/** Grouped location rows — one calm surface instead of many floating tiles. */
export const LocationAreasPanel = memo(function LocationAreasPanel({ children }: Props) {
  const ghostShadow = useGhostCardShadow();

  return (
    <View style={[styles.shadowBase, ghostShadow]} accessibilityRole="none">
      <LiquidGlassMaterial
        preset="ghost"
        borderRadius={RITUAL_CORNER_RADIUS}
        className="overflow-hidden rounded-[18px] border border-ritual-borderSoft/70 dark:border-ritual-borderSoft-dark/55"
      >
        <View className="py-0.5">{children}</View>
      </LiquidGlassMaterial>
    </View>
  );
});

const styles = StyleSheet.create({
  shadowBase: {
    borderRadius: RITUAL_CORNER_RADIUS,
  },
});
