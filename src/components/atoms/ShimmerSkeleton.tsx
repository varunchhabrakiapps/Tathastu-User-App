import { memo, useEffect } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { cn } from '@/utils/cn';

type Props = {
  /** Size + radius come from the caller (e.g. `h-3 w-1/2 rounded-full`). */
  className?: string;
  style?: StyleProp<ViewStyle>;
};

/**
 * Reusable shimmer placeholder — a soft opacity pulse on a themed block. Works for any
 * shape since dimensions are caller-driven; decorative, so hidden from assistive tech.
 */
export const ShimmerSkeleton = memo(function ShimmerSkeleton({ className, style }: Props) {
  const pulse = useSharedValue(0.55);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [pulse]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: pulse.value }));

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      pointerEvents="none"
      style={[animatedStyle, style]}
      className={cn('bg-ritual-surfaceSecondary dark:bg-ritual-surfaceSecondary-dark', className)}
    />
  );
});
