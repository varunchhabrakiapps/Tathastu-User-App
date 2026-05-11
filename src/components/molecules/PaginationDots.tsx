import { memo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';

import {
  type PagerActiveTint,
  getPagerDotColors,
} from '@/theme/onboardingPagerColors';

type Props = {
  count: number;
  activeIndex: number;
  /** Match semantic chrome — indigo app shell, warm marketing, ritual onboarding. */
  activeTint?: PagerActiveTint;
};

/**
 * Spring-animated pagination (inactive tones from ritual inkMuted; active from semantic tint).
 * Decorative paired with textual step indicator in BrandHeader — hidden from accessibility tree.
 */
export const PaginationDots = memo(function PaginationDots({
  count,
  activeIndex,
  activeTint = 'primary',
}: Props) {
  return (
    <View
      accessibilityElementsHidden={true}
      importantForAccessibility="no-hide-descendants"
      className="flex-row items-center justify-center gap-2 py-0"
    >
      {Array.from({ length: count }, (_, i) => (
        <PagerDot
          key={i}
          index={i}
          activeIndex={activeIndex}
          activeTint={activeTint}
        />
      ))}
    </View>
  );
});

const PagerDot = memo(function PagerDot({
  index,
  activeIndex,
  activeTint,
}: {
  index: number;
  activeIndex: number;
  activeTint: PagerActiveTint;
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { inactive, active } = getPagerDotColors(activeTint, isDark);

  const expanded = useSharedValue(index === activeIndex ? 1 : 0);

  useEffect(() => {
    expanded.value = withSpring(index === activeIndex ? 1 : 0, {
      damping: 18,
      stiffness: 220,
      mass: 0.35,
    });
  }, [activeIndex, expanded, index]);

  const style = useAnimatedStyle(
    () => ({
      width: 8 + expanded.value * 20,
      backgroundColor: interpolateColor(expanded.value, [0, 1], [inactive, active]),
    }),
    [active, inactive],
  );

  return (
    <Animated.View style={[styles.dot, style]} importantForAccessibility="no" />
  );
});

const styles = StyleSheet.create({
  dot: { height: 8, borderRadius: 9999 },
});
