import { memo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { cn } from '@/utils/cn';

type Props = {
  className?: string;
  accessibilityLabel?: string;
};

/**
 * Stylized brass diya + flickering agni flame (Reanimated) — decorative ritual motif for auth heroes.
 */
export const AnimatedDiyaLamp = memo(function AnimatedDiyaLamp({
  className,
  accessibilityLabel,
}: Props) {
  const flicker = useSharedValue(1);

  useEffect(() => {
    flicker.value = withRepeat(
      withSequence(
        withTiming(0.88, {
          duration: 120,
          easing: Easing.bezier(0.45, 0, 0.55, 1),
        }),
        withTiming(1, { duration: 180 }),
        withTiming(0.92, { duration: 100 }),
        withTiming(1, { duration: 220 }),
      ),
      -1,
      false,
    );
  }, [flicker]);

  const flameOuterStyle = useAnimatedStyle(() => ({
    opacity: 0.78 + 0.22 * flicker.value,
    transform: [{ scaleY: 0.9 + 0.1 * flicker.value }],
  }));

  const flameCoreStyle = useAnimatedStyle(() => ({
    opacity: 0.88 + 0.12 * flicker.value,
    transform: [{ translateY: (1 - flicker.value) * 4 }],
  }));

  return (
    <View
      className={cn('items-center', className)}
      accessible={!!accessibilityLabel}
      accessibilityRole={accessibilityLabel ? 'image' : undefined}
      accessibilityLabel={accessibilityLabel}
    >
      <View className="h-[7.5rem] w-[6.5rem] items-center justify-end">
        <Animated.View
          style={[styles.flameOuter, flameOuterStyle]}
          className="items-center"
        >
          <View className="h-11 w-8 rounded-t-full bg-orange-500/95" />
        </Animated.View>
        <Animated.View
          style={[styles.flameMid, flameCoreStyle]}
          className="items-center"
        >
          <View className="h-8 w-5 rounded-t-full bg-amber-200" />
        </Animated.View>
        <Animated.View
          style={[styles.flameInner, flameCoreStyle]}
          className="items-center"
        >
          <View className="h-4 w-2.5 rounded-t-full bg-white" />
        </Animated.View>

        <View className="w-full items-center">
          <View className="h-2 w-16 rounded-sm border border-amber-700/85 bg-amber-900/95 dark:border-amber-500/70" />
          <View className="-mt-px h-9 w-[4.25rem] rounded-b-[1.35rem] border border-amber-800/90 border-t-0 bg-amber-950/85 dark:border-amber-600/70 dark:bg-surface-dark" />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  flameOuter: { bottom: 46, position: 'absolute' },
  flameMid: { bottom: 52, position: 'absolute' },
  flameInner: { bottom: 56, position: 'absolute' },
});
