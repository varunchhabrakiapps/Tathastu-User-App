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

import { paletteHex } from '@/theme/palette';
import { hexToRgba } from '@/theme/colorUtils';
import { cn } from '@/utils/cn';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const RADIUS = 18;

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
    ? [hexToRgba(cta.dark.top, 0.96), cta.dark.bottom]
    : [hexToRgba(cta.light.top, 0.97), cta.light.bottom];

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value * press.value }],
  }));

  const labelContent: ReactNode = loading ? (
    <ActivityIndicator color={paletteHex.warm.subtle} />
  ) : (
    <Text className="text-center text-[15px] font-medium tracking-wide text-warm-subtle">
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
        scale.value = withSpring(0.988, { damping: 20, stiffness: 380, mass: 0.28 });
        press.value = withSpring(0.992, { damping: 22, stiffness: 420, mass: 0.22 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 16, stiffness: 280, mass: 0.3 });
        press.value = withSpring(1, { damping: 14, stiffness: 300, mass: 0.28 });
      }}
      style={[
        scaleStyle,
        isDark
          ? styles.outerShadowDark
          : { ...styles.outerShadowLight, shadowColor: paletteHex.ritual.primary.light },
      ]}
      className={cn('overflow-hidden', disabled && !loading && 'opacity-45', className)}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientFill}
      >
        <LinearGradient
          colors={[
            hexToRgba(paletteHex.ritual.surface.light, 0.16),
            'transparent',
            hexToRgba(
              isDark
                ? paletteHex.ritual.primary.dark
                : paletteHex.ritual.primary.light,
              0.08,
            ),
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          locations={[0, 0.38, 1]}
          style={styles.highlight}
        />
        <View style={styles.labelPad}>{labelContent}</View>
      </LinearGradient>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  outerShadowLight: {
    borderRadius: RADIUS,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 6,
  },
  outerShadowDark: {
    borderRadius: RADIUS,
    shadowColor: paletteHex.ritual.primary.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 20,
    elevation: 8,
  },
  gradientFill: {
    borderRadius: RADIUS,
    overflow: 'hidden',
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
  labelPad: {
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
