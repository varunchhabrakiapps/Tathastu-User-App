import type { PropsWithChildren } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

type Props = PropsWithChildren<{
  className?: string;
}>;

const RADIUS = 22;

/**
 * Elevated ritual detail slab — calm shadow + whisper hairline (matches trending reel lift,
 * less loud than peach borders everywhere).
 */
export function RitualDetailCard({ children, className }: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const iosShadow =
    Platform.OS === 'ios'
      ? {
          shadowColor: isDark ? '#000000' : paletteHex.ritual.ink.light,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: isDark ? 0.38 : 0.07,
          shadowRadius: isDark ? 22 : 20,
        }
      : {};

  const androidElev = Platform.OS === 'android' ? { elevation: isDark ? 5 : 3 } : {};

  return (
    <View
      style={[styles.shell, iosShadow, androidElev]}
      className={cn(
        'border border-ritual-borderSoft/30 bg-ritual-surface dark:border-ritual-borderSoft-dark/25 dark:bg-ritual-surface-dark',
        className,
      )}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    borderRadius: RADIUS,
  },
});
