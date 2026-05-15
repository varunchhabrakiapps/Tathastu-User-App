import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { radii } from '@/theme/tokens';

type Props = {
  label: string;
};

/**
 * Compact “volume / cadence” chip for reel-style thumbnails — instagram-adjacent, ritual-warm accents.
 */
export const TrendingVolumeTag = memo(function TrendingVolumeTag({ label }: Props) {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      pointerEvents="none"
      style={styles.wrap}
    >
      <View style={[styles.shell, subtleRing]}>
        <Text numberOfLines={1} className="text-[10px] font-semibold leading-[13px] text-white">
          {label}
        </Text>
      </View>
    </View>
  );
});

const subtleRing = {
  borderColor: hexToRgba(paletteHex.warm.peach, 0.42),
};

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
    maxWidth: '78%',
    alignItems: 'flex-end',
  },
  shell: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.full,
    backgroundColor: hexToRgba(paletteHex.ritual.ink.dark, 0.58),
    borderWidth: StyleSheet.hairlineWidth,
  },
});
