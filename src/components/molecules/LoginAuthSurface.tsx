import type { PropsWithChildren } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useColorScheme } from 'nativewind';

import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

const R = RITUAL_CORNER_RADIUS;

/**
 * Grounded auth slab — iOS blur + soft tint (onboarding-adjacent), confident shadow, no stroke box.
 */
export function LoginAuthSurface({ children }: PropsWithChildren) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const rim = paletteHex.ritual.primary[isDark ? 'dark' : 'light'];

  return (
    <View
      style={[
        styles.shadowWrap,
        {
          shadowColor: rim,
          shadowOpacity: isDark ? 0.13 : 0.078,
          shadowRadius: isDark ? 22 : 26,
          shadowOffset: { width: 0, height: 10 },
          elevation: isDark ? 5 : 4,
        },
      ]}
    >
      <View style={styles.innerClip}>
        {Platform.OS === 'ios' ? (
          <BlurView
            blurType={isDark ? 'dark' : 'light'}
            blurAmount={22}
            reducedTransparencyFallbackColor={
              isDark ? paletteHex.ritual.surface.dark : paletteHex.ritual.surface.light
            }
            style={StyleSheet.absoluteFill}
          />
        ) : null}
        <View
          className={cn(
            Platform.OS === 'ios'
              ? 'bg-ritual-surface/66 dark:bg-ritual-surface-dark/58'
              : 'bg-ritual-surface/97 dark:bg-ritual-surface-dark/95',
          )}
        >
          <View className="px-0 py-6">{children}</View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrap: {
    alignSelf: 'stretch',
    borderRadius: R,
  },
  innerClip: {
    borderRadius: R,
    overflow: 'hidden',
  },
});
