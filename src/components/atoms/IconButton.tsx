import type { ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, View, type PressableProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useColorScheme } from 'nativewind';

import { LiquidGlassMaterial } from '@/components/atoms/LiquidGlassMaterial';
import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = Omit<PressableProps, 'children'> & {
  accessibilityLabel: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  /** `chrome` — filled icon chrome; `ghost` — translucent whisper control. */
  glassVariant?: 'chrome' | 'ghost';
};

/**
 * Tactile icon-only control — {@link LiquidGlassMaterial} with `chrome` (default) or `ghost` preset.
 */
export function IconButton({
  accessibilityLabel,
  disabled = false,
  className,
  children,
  glassVariant = 'chrome',
  onPress,
  onPressIn,
  onPressOut,
  ...rest
}: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const shadowColor =
    glassVariant === 'ghost'
      ? isDark
        ? hexToRgba(paletteHex.ritual.ink.dark, 0.28)
        : hexToRgba(paletteHex.ritual.ink.light, 0.12)
      : isDark
        ? paletteHex.ritual.primary.dark
        : paletteHex.ritual.primary.light;

  const shadowStyle =
    Platform.OS === 'android'
      ? styles.shadowAndroid
      : isDark
        ? styles.shadowIosDark
        : styles.shadowIosLight;

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      onPressIn={(e) => {
        onPressIn?.(e);
        scale.value = withSpring(0.96, { damping: 20, stiffness: 420, mass: 0.28 });
      }}
      onPressOut={(e) => {
        onPressOut?.(e);
        scale.value = withSpring(1, { damping: 16, stiffness: 320, mass: 0.32 });
      }}
      style={[
        animStyle,
        styles.shadowBase,
        shadowStyle,
        {
          shadowColor,
        },
      ]}
      className={cn(
        'self-start rounded-[18px] active:opacity-92 dark:shadow-none',
        disabled && 'opacity-48',
        className,
      )}
      {...rest}
    >
      <LiquidGlassMaterial
        preset={glassVariant === 'ghost' ? 'ghost' : 'chrome'}
        borderRadius={RITUAL_CORNER_RADIUS}
        className="rounded-[18px]"
      >
        <View className="h-11 w-11 items-center justify-center">{children}</View>
      </LiquidGlassMaterial>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  shadowBase: {
    borderRadius: RITUAL_CORNER_RADIUS,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
  },
  shadowIosLight: {
    shadowOpacity: 0.12,
    elevation: 0,
  },
  shadowIosDark: {
    shadowOpacity: 0.22,
    elevation: 0,
  },
  shadowAndroid: {
    shadowOpacity: 0,
    elevation: 3,
  },
});
