import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { LiquidGlassMaterial } from '@/components/atoms/LiquidGlassMaterial';
import { NazarClearMomentRow } from '@/components/molecules/NazarClearMomentRow';
import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import type { NazarClearMomentId, NazarClearMomentPreview } from '@/domain/nazarClearMoment';
import { useGhostCardShadow } from '@/theme/ghostCardShadow';

type Props = {
  moments: NazarClearMomentPreview[];
  onSelectMoment: (momentId: NazarClearMomentId) => void;
};

/** Single grouped surface — moments read as one story, not four floating tiles. */
export const NazarClearMomentsPanel = memo(function NazarClearMomentsPanel({
  moments,
  onSelectMoment,
}: Props) {
  const ghostShadow = useGhostCardShadow();

  return (
    <View style={[styles.shadowBase, ghostShadow]} accessibilityRole="none">
      <LiquidGlassMaterial
        preset="ghost"
        borderRadius={RITUAL_CORNER_RADIUS}
        className="overflow-hidden rounded-[18px] border border-ritual-borderSoft/70 dark:border-ritual-borderSoft-dark/55"
      >
        <View className="py-0.5">
          {moments.map((moment, index) => (
            <NazarClearMomentRow
              key={moment.id}
              moment={moment}
              showDivider={index < moments.length - 1}
              onPress={onSelectMoment}
            />
          ))}
        </View>
      </LiquidGlassMaterial>
    </View>
  );
});

const styles = StyleSheet.create({
  shadowBase: {
    borderRadius: RITUAL_CORNER_RADIUS,
  },
});
