import { memo } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { hexToRgba, mixHex } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { radii } from '@/theme/tokens';

type Props = {
  label: string;
};

const chipFill = mixHex('#171310', paletteHex.warm.deep, 0.2);

/**
 * High-contrast volume chip for photo corners — readable on bright artwork.
 */
export const TrendingVolumeTag = memo(function TrendingVolumeTag({ label }: Props) {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      pointerEvents="none"
      style={styles.wrap}
    >
      <View style={[styles.shell, shellRing]}>
        <Text numberOfLines={1} style={styles.label} className="text-[10px] font-semibold leading-[13px] text-white">
          {label}
        </Text>
      </View>
    </View>
  );
});

const shellRing = {
  borderColor: hexToRgba('#fef3c7', 0.26),
  ...Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.38,
      shadowRadius: 3,
    },
    default: {},
  }),
};

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 3,
    maxWidth: '76%',
    alignItems: 'flex-end',
  },
  shell: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: radii.full,
    backgroundColor: hexToRgba(chipFill, 0.94),
    borderWidth: 1,
    ...Platform.select({
      android: { elevation: 3 },
      default: {},
    }),
  },
  label: {
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 2.5,
    letterSpacing: 0.2,
  },
});
