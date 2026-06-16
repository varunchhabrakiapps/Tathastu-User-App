import { Platform, StyleSheet, type ViewStyle } from 'react-native';
import { useColorScheme } from 'nativewind';

import { paletteHex } from '@/theme/palette';

export type GhostCardShadowMode = 'light' | 'dark';

/**
 * Shared iOS/Android elevation for ghost-glass list + home cards.
 * Uses ritual warm primary — never indigo `paletteHex.primary` (reads blue on dark canvas).
 */
const ghostCardShadowStyles = StyleSheet.create({
  iosLight: {
    shadowColor: paletteHex.ritual.primary.light,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 0,
  },
  iosDark: {
    shadowColor: paletteHex.ritual.primary.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 0,
  },
  androidLight: {
    elevation: 4,
  },
  androidDark: {
    elevation: 2,
  },
});

export function getGhostCardShadow(mode: GhostCardShadowMode): ViewStyle {
  if (Platform.OS === 'ios') {
    return mode === 'dark' ? ghostCardShadowStyles.iosDark : ghostCardShadowStyles.iosLight;
  }
  return mode === 'dark' ? ghostCardShadowStyles.androidDark : ghostCardShadowStyles.androidLight;
}

/** Resolves shared ghost-card shadow from the active color scheme. */
export function useGhostCardShadow(): ViewStyle {
  const { colorScheme } = useColorScheme();
  return getGhostCardShadow(colorScheme === 'dark' ? 'dark' : 'light');
}
