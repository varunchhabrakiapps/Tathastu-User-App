import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useColorScheme } from 'nativewind';

import { paletteHex } from '@/theme/palette';

/**
 * Onboarding backdrop: calm canvas base with a soft teal accent wash (distinct from the login hero gradient).
 */
export function OnboardingScreenBackdrop({ children }: PropsWithChildren) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const gradientColors = isDark
    ? ([
        'rgba(45, 212, 191, 0.18)',
        'rgba(19, 78, 74, 0.06)',
        paletteHex.canvas.dark,
      ] as const)
    : ([
        'rgba(15, 118, 110, 0.14)',
        'rgba(204, 251, 241, 0.35)',
        paletteHex.canvas.light,
      ] as const);

  return (
    <View className="flex-1 bg-canvas dark:bg-canvas-dark">
      <LinearGradient
        colors={[...gradientColors]}
        locations={[0, 0.38, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        pointerEvents="none"
        style={StyleSheet.absoluteFill}
      />
      <View
        pointerEvents="none"
        className="absolute -right-20 top-24 h-64 w-64 rounded-full bg-accent/8 dark:bg-accent-dark/12"
      />
      <View
        pointerEvents="none"
        className="absolute -left-10 bottom-1/3 h-32 w-32 rounded-full bg-primary/6 dark:bg-primary-dark/10"
      />
      {children}
    </View>
  );
}
