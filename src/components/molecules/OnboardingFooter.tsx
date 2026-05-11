import type { PropsWithChildren } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useColorScheme } from 'nativewind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

const footerShellShadow = StyleSheet.create({
  light: {
    shadowColor: paletteHex.ritual.primary.light,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.07,
    shadowRadius: 40,
    elevation: 12,
  },
  dark: {
    shadowColor: paletteHex.ritual.canvas.dark,
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.32,
    shadowRadius: 42,
    elevation: 14,
  },
});

/**
 * Feather-light floating sheet — high translucency, soft blur, low slab mass.
 */
export function OnboardingFooter({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const shellShadow = isDark ? footerShellShadow.dark : footerShellShadow.light;
  const paddingBottom = Math.max(insets.bottom, 10);

  return (
    <View
      className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden rounded-t-[36px]"
      style={shellShadow}
    >
      {Platform.OS === 'ios' ? (
        <BlurView
          blurType={isDark ? 'dark' : 'light'}
          blurAmount={36}
          reducedTransparencyFallbackColor={
            isDark ? paletteHex.ritual.surface.dark : paletteHex.ritual.surface.light
          }
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      <View
        className={cn(
          'px-5 pt-3',
          Platform.OS === 'ios'
            ? 'bg-ritual-surface/64 dark:bg-ritual-surface-dark/62'
            : 'bg-ritual-surface/92 dark:bg-ritual-surface-dark/92',
        )}
        style={{ paddingBottom }}
      >
        {children}
      </View>
    </View>
  );
}
