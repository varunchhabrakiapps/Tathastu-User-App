import { Platform, StyleSheet, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useColorScheme } from 'nativewind';

import { paletteHex } from '@/theme/palette';

/**
 * Scroll-reveal scrim behind the stack header — stops section titles colliding with nav chrome.
 */
export function RitualDetailHeaderBackground() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const veil = isDark ? 'rgba(34,30,27,0.78)' : 'rgba(255,248,241,0.82)';

  return (
    <View className="flex-1 overflow-hidden border-b border-ritual-borderSoft/35 dark:border-ritual-borderSoft-dark/28">
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
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { backgroundColor: veil }]}
      />
    </View>
  );
}
