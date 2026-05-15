import { memo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';

import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

type Props = {
  accessibilityLabel: string;
};

const GLYPH_W = 24;
const GLYPH_H = 26;

/**
 * Minimal abstract “sacred flame / diya ember” — monochrome saffron, readable at small size.
 */
function EmberDiyaGlyph({ color }: { color: string }) {
  return (
    <View
      style={styles.glyphWrap}
      importantForAccessibility="no-hide-descendants"
    >
      {/* Upper spark */}
      <View
        style={[
          styles.spark,
          { backgroundColor: color },
        ]}
      />
      {/* Flame body */}
      <View
        style={[
          styles.flame,
          { backgroundColor: color },
        ]}
      />
      {/* Diya lip / base */}
      <View
        style={[
          styles.diyaBase,
          { backgroundColor: color },
        ]}
      />
    </View>
  );
}

/**
 * Signature mark: flame glyph + feather-soft container (no generic dot).
 */
export const TathastuMark = memo(function TathastuMark({
  accessibilityLabel,
}: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  /** Dark: gold flame on solid neutral shell — `primary.dark` on translucent secondary was low contrast. */
  const glyphColor = isDark
    ? paletteHex.warm.gold
    : paletteHex.ritual.primary.light;
  const breath = useSharedValue(1);

  useEffect(() => {
    breath.value = withRepeat(
      withSequence(
        withTiming(0.94, { duration: 5200 }),
        withTiming(1, { duration: 5200 }),
      ),
      -1,
      true,
    );
  }, [breath]);

  const breathStyle = useAnimatedStyle(() => ({
    opacity: 0.88 + breath.value * 0.12,
    transform: [{ scale: 0.98 + breath.value * 0.04 }],
  }));

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
      className={cn(
        'h-11 w-11 items-center justify-center rounded-[14px]',
        isDark
          ? 'border border-ritual-borderSoft-dark/60 bg-ritual-surface-dark'
          : 'border border-transparent bg-ritual-surfaceSecondary/45',
      )}
      style={isDark ? styles.markShellDark : styles.markShellLight}
    >
      <Animated.View style={breathStyle}>
        <EmberDiyaGlyph color={glyphColor} />
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  markShellLight: {
    shadowColor: paletteHex.ritual.primary.light,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 3,
  },
  markShellDark: {
    shadowColor: paletteHex.warm.gold,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 3,
  },
  glyphWrap: {
    width: GLYPH_W,
    height: GLYPH_H,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  spark: {
    position: 'absolute',
    top: 0,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    opacity: 0.95,
  },
  flame: {
    width: 9,
    height: 12,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginBottom: 1,
    opacity: 0.9,
    transform: [{ scaleY: 1.05 }],
  },
  diyaBase: {
    width: 15,
    height: 4.5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    opacity: 0.32,
    marginTop: -1,
  },
});
