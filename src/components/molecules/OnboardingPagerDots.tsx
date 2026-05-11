import { memo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';

import { paletteHex } from '@/theme/palette';

type Props = {
  count: number;
  activeIndex: number;
};

/**
 * Spring-animated pagination for onboarding (muted track + primary accent — matches surface card).
 */
export const OnboardingPagerDots = memo(function OnboardingPagerDots({
  count,
  activeIndex,
}: Props) {
  return (
    <View className="flex-row items-center justify-center gap-2 py-1">
      {Array.from({ length: count }, (_, i) => (
        <PagerDot key={i} index={i} activeIndex={activeIndex} />
      ))}
    </View>
  );
});

function PagerDot({
  index,
  activeIndex,
}: {
  index: number;
  activeIndex: number;
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const inactive = isDark ? 'rgba(168, 162, 158, 0.4)' : 'rgba(120, 113, 108, 0.32)';
  const active = isDark ? paletteHex.primary.dark : paletteHex.primary.light;

  const expanded = useSharedValue(index === activeIndex ? 1 : 0);

  useEffect(() => {
    expanded.value = withSpring(index === activeIndex ? 1 : 0, {
      damping: 18,
      stiffness: 220,
      mass: 0.35,
    });
  }, [activeIndex, expanded, index]);

  const style = useAnimatedStyle(() => ({
    width: 8 + expanded.value * 20,
    backgroundColor: interpolateColor(expanded.value, [0, 1], [inactive, active]),
  }));

  return (
    <Animated.View
      style={[styles.dot, style]}
      importantForAccessibility="no"
    />
  );
}

const styles = StyleSheet.create({
  dot: { height: 8, borderRadius: 9999 },
});
