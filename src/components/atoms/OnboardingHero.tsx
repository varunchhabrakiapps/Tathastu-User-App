import { memo, useEffect } from 'react';
import { Image, type ImageSourcePropType, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';

import { paletteHex } from '@/theme/palette';
import { hexToRgba } from '@/theme/colorUtils';
import { cn } from '@/utils/cn';

type Props = {
  source: ImageSourcePropType;
  accessibilityLabel: string;
  isActive: boolean;
  artHeight: number;
  className?: string;
};

/**
 * Onboarding hero art: ambient wash, layered soft elevation, integrated float (not a harsh plaque).
 */
export const OnboardingHero = memo(function OnboardingHero({
  source,
  accessibilityLabel,
  isActive,
  artHeight,
  className,
}: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const focus = useSharedValue(isActive ? 1 : 0);
  const floatPhase = useSharedValue(0);

  useEffect(() => {
    focus.value = withSpring(isActive ? 1 : 0, {
      damping: 17,
      stiffness: 160,
      mass: 0.48,
    });
    if (isActive) {
      floatPhase.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 3600 }),
          withTiming(0, { duration: 3600 }),
        ),
        -1,
        true,
      );
    } else {
      cancelAnimation(floatPhase);
      floatPhase.value = withTiming(0, { duration: 220 });
    }
  }, [floatPhase, focus, isActive]);

  const heroStyle = useAnimatedStyle(() => {
    const baseY = interpolate(focus.value, [0, 1], [8, 0]);
    const bobY = interpolate(floatPhase.value, [0, 1], [0, -4]);
    return {
      opacity: interpolate(focus.value, [0, 1], [0.58, 1]),
      transform: [{ translateY: baseY + bobY }],
    };
  });

  const ambientTop = isDark
    ? hexToRgba(paletteHex.ritual.primary.dark, 0.06)
    : hexToRgba(paletteHex.ritual.primary.light, 0.045);
  const ambientBottom = 'transparent';

  const cardShadow = isDark ? styles.heroCardDark : styles.heroCardLight;

  return (
    <View className={cn('relative w-full items-center', className)}>
      <View
        pointerEvents="none"
        className="absolute -top-1 h-[108%] w-[104%] overflow-hidden rounded-[44px]"
        style={styles.ambientClip}
      >
        <LinearGradient
          colors={[ambientTop, ambientBottom]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.85 }}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <View
        pointerEvents="none"
        className="absolute top-7 h-[86%] w-[92%] rounded-[42px] bg-ritual-primary/6 dark:bg-ritual-primary-dark/8"
        style={styles.heroGlow}
      />

      <Animated.View style={heroStyle} className="w-full">
        <View
          className="w-full overflow-hidden rounded-[26px] bg-ritual-surface/86 dark:bg-ritual-surface-dark/68"
          style={cardShadow}
        >
          <View className="items-center justify-center bg-ritual-surfaceSecondary/24 px-1.5 pb-1 pt-2.5 dark:bg-ritual-surfaceSecondary-dark/18">
            <View className="w-full overflow-hidden rounded-[26px]">
              <Image
                source={source}
                accessibilityIgnoresInvertColors
                accessible
                accessibilityRole="image"
                accessibilityLabel={accessibilityLabel}
                className="w-full"
                style={{ height: artHeight }}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  ambientClip: { opacity: 0.95 },
  heroGlow: {
    transform: [{ scaleX: 1.04 }, { scaleY: 0.9 }],
    opacity: 0.72,
  },
  heroCardLight: {
    shadowColor: paletteHex.ritual.primary.light,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.11,
    shadowRadius: 44,
    elevation: 6,
  },
  heroCardDark: {
    shadowColor: paletteHex.ritual.primary.dark,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 36,
    elevation: 6,
  },
});
