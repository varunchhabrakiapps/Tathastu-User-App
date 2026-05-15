import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useColorScheme } from 'nativewind';

import {
  getOnboardingBackdrop,
  type PaletteMode,
} from '@/theme/heroGradients';
import { paletteHex } from '@/theme/palette';
import { hexToRgba } from '@/theme/colorUtils';
import { cn } from '@/utils/cn';

/**
 * Onboarding / auth backdrop — ritual wash + imperceptible “breathing” light (premium calm).
 * Decorative orbs intentionally omitted for a quieter, editorial canvas shared with login.
 */
export function OnboardingScreenBackdrop({ children }: PropsWithChildren) {
  const { colorScheme } = useColorScheme();
  const mode: PaletteMode = colorScheme === 'dark' ? 'dark' : 'light';
  const { colors: gradientColors, locations: gradientLocations } =
    getOnboardingBackdrop(mode);
  const breath = useSharedValue(1);

  useEffect(() => {
    breath.value = withRepeat(
      withSequence(
        withTiming(0.987, { duration: 7200 }),
        withTiming(1, { duration: 7200 }),
      ),
      -1,
      true,
    );
  }, [breath]);

  const breathStyle = useAnimatedStyle(() => ({
    opacity: breath.value,
  }));

  const r = paletteHex.ritual;
  const breathTint =
    mode === 'light'
      ? hexToRgba(r.primary.light, 0.028)
      : hexToRgba(r.primary.dark, 0.034);

  return (
    <View
      className={cn(
        'flex-1',
        mode === 'light' ? 'bg-ritual-canvas' : 'bg-ritual-surface-dark',
      )}
    >
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, breathStyle]}
      >
        <LinearGradient
          colors={gradientColors}
          locations={[...gradientLocations]}
          start={{ x: 0, y: 0 }}
          end={{ x: mode === 'dark' ? 0.52 : 0.88, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={[breathTint, 'transparent']}
          locations={mode === 'dark' ? [0, 0.42] : undefined}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: mode === 'light' ? 0.55 : 0.45 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      </Animated.View>
      {children}
    </View>
  );
}
