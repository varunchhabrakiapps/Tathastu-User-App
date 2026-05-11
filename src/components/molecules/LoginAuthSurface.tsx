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
          shadowOpacity: isDark ? 0.16 : 0.1,
          shadowRadius: isDark ? 28 : 34,
          shadowOffset: { width: 0, height: 14 },
          elevation: isDark ? 6 : 5,
        },
      ]}
    >
      <View style={styles.innerClip}>
        {Platform.OS === 'ios' ? (
          <BlurView
            blurType={isDark ? 'dark' : 'light'}
            blurAmount={28}
            reducedTransparencyFallbackColor={
              isDark ? paletteHex.ritual.surface.dark : paletteHex.ritual.surface.light
            }
            style={StyleSheet.absoluteFill}
          />
        ) : null}
        <View
          className={cn(
            Platform.OS === 'ios'
              ? 'bg-ritual-surface/58 dark:bg-ritual-surface-dark/54'
              : 'bg-ritual-surface/96 dark:bg-ritual-surface-dark/94',
          )}
        >
          <View className="px-0 py-8">{children}</View>
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
