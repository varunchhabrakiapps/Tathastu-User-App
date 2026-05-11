import type { PropsWithChildren } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useColorScheme } from 'nativewind';

import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

const R = RITUAL_CORNER_RADIUS;

/**
 * Auth slab — light iOS blur + opaque warm-tinted surface (Wallet-like, not glass-gradient).
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
          shadowOpacity: isDark ? 0.11 : 0.065,
          shadowRadius: isDark ? 20 : 24,
          shadowOffset: { width: 0, height: 10 },
          elevation: isDark ? 5 : 4,
        },
      ]}
    >
      <View style={styles.innerClip}>
        {Platform.OS === 'ios' ? (
          <BlurView
            blurType={isDark ? 'dark' : 'light'}
            blurAmount={10}
            reducedTransparencyFallbackColor={
              isDark ? paletteHex.ritual.surface.dark : paletteHex.ritual.surface.light
            }
            style={StyleSheet.absoluteFill}
          />
        ) : null}
        {/* Flat premium warm base + hairline tonal veil (no visible “card gradient”). */}
        <View
          className={cn(
            Platform.OS === 'ios'
              ? 'bg-ritual-surface/91 dark:bg-ritual-surface-dark/90'
              : 'bg-ritual-surface/98 dark:bg-ritual-surface-dark/97',
          )}
        >
          <View
            pointerEvents="none"
            className="absolute inset-0 bg-ritual-surfaceSecondary/[0.035] dark:bg-ritual-surfaceSecondary-dark/[0.042]"
          />
          <View className="px-0 pt-6 pb-8">{children}</View>
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
