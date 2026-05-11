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
  getOnboardingBackdropGradient,
  type PaletteMode,
} from '@/theme/heroGradients';
import { paletteHex } from '@/theme/palette';
import { hexToRgba } from '@/theme/colorUtils';

/**
 * Onboarding backdrop — ritual wash, soft orbs, imperceptible “breathing” light (premium calm).
 */
export function OnboardingScreenBackdrop({ children }: PropsWithChildren) {
  const { colorScheme } = useColorScheme();
  const mode: PaletteMode = colorScheme === 'dark' ? 'dark' : 'light';
  const gradientColors = getOnboardingBackdropGradient(mode);
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
      : hexToRgba(r.primary.dark, 0.045);

  return (
    <View className="flex-1 bg-ritual-canvas dark:bg-ritual-canvas-dark">
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, breathStyle]}
      >
        <LinearGradient
          colors={gradientColors}
          locations={
            mode === 'light'
              ? [0, 0.24, 0.48, 0.68, 1]
              : [0, 0.26, 0.5, 0.72, 1]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 0.88, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={[breathTint, 'transparent']}
          start={{ x: 0.45, y: 0.2 }}
          end={{ x: 0.55, y: 0.55 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      </Animated.View>
      <View
        pointerEvents="none"
        className="absolute -right-24 top-28 h-72 w-72 rounded-full bg-ritual-primarySoft/18 dark:bg-ritual-primary-dark/7"
      />
      <View
        pointerEvents="none"
        className="absolute -right-6 top-1/3 h-48 w-48 rounded-full bg-ritual-primary/7 dark:bg-ritual-primarySoft-dark/14"
      />
      <View
        pointerEvents="none"
        className="absolute -left-16 bottom-1/3 h-40 w-40 rounded-full bg-ritual-surfaceSecondary/55 dark:bg-ritual-surfaceSecondary-dark/22"
      />
      <View
        pointerEvents="none"
        className="absolute bottom-32 left-10 h-24 w-24 rounded-full bg-ritual-primary/5 dark:bg-ritual-primary-dark/9"
      />
      {children}
    </View>
  );
}
