import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';

import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { paletteHex } from '@/theme/palette';
import { hexToRgba } from '@/theme/colorUtils';
import { cn } from '@/utils/cn';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const RADIUS = RITUAL_CORNER_RADIUS;

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  className?: string;
};

/**
 * Premium ritual CTA — warm saffron gradient, soft inner sheen, confident glow.
 */
export function RitualPrimaryButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  accessibilityLabel,
  className,
}: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scale = useSharedValue(1);
  const press = useSharedValue(1);
  const isBusy = loading || disabled;

  const cta = paletteHex.ritual.cta;
  const gradientColors = isDark
    ? [hexToRgba(cta.dark.top, 1), paletteHex.ritual.primary.dark]
    : [
        hexToRgba(cta.light.top, 1),
        hexToRgba(paletteHex.ritual.primarySoft.light, 1),
        paletteHex.warm.saffron,
      ];

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value * press.value }],
  }));

  const labelContent: ReactNode = loading ? (
    <ActivityIndicator color={paletteHex.ritual.surface.light} />
  ) : (
    <Text accessibilityRole="text" style={styles.ctaLabel}>
      {label}
    </Text>
  );

  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={isBusy}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isBusy, busy: loading }}
      onPressIn={() => {
        scale.value = withSpring(0.987, { damping: 21, stiffness: 450, mass: 0.28 });
        press.value = withSpring(0.991, { damping: 22, stiffness: 440, mass: 0.22 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 300, mass: 0.3 });
        press.value = withSpring(1, { damping: 14, stiffness: 310, mass: 0.28 });
      }}
      style={[
        scaleStyle,
        isDark
          ? styles.outerShadowDark
          : {
              ...styles.outerShadowLight,
              shadowColor: paletteHex.ritual.primary.light,
            },
      ]}
      className={cn('overflow-hidden', disabled && !loading && 'opacity-45', className)}
    >
      <LinearGradient
        colors={gradientColors}
        locations={isDark ? undefined : [0, 0.42, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientFill}
      >
        <LinearGradient
          colors={[
            hexToRgba(paletteHex.ritual.surface.light, 0.16),
            'transparent',
            hexToRgba(
              isDark ? paletteHex.ritual.primary.dark : paletteHex.ritual.primary.light,
              isDark ? 0.09 : 0.07,
            ),
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          locations={[0, 0.38, 1]}
          style={styles.highlight}
        />
        <LinearGradient
          colors={[
            'transparent',
            hexToRgba(paletteHex.warm.deep, isDark ? 0.1 : 0.07),
          ]}
          locations={[0.55, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.warmDepth}
        />
        <View style={styles.labelPad}>{labelContent}</View>
      </LinearGradient>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  outerShadowLight: {
    borderRadius: RADIUS,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.32,
    shadowRadius: 34,
    elevation: 9,
  },
  outerShadowDark: {
    borderRadius: RADIUS,
    shadowColor: paletteHex.ritual.primary.dark,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.38,
    shadowRadius: 28,
    elevation: 11,
  },
  gradientFill: {
    borderRadius: RADIUS,
    overflow: 'hidden',
  },
  ctaLabel: {
    color: paletteHex.ritual.surface.light,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.4,
    textAlign: 'center',
    textShadowColor: hexToRgba(paletteHex.warm.deep, 0.22),
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 1.5,
  },
  highlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: RADIUS,
    pointerEvents: 'none',
  },
  warmDepth: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: RADIUS,
    pointerEvents: 'none',
  },
  labelPad: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
