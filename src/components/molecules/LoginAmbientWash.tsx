import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useColorScheme } from 'nativewind';

import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';

/**
 * Login atmosphere — top warmth + floor wash (layered, no decorative orbs).
 */
export const LoginAmbientWash = memo(function LoginAmbientWash() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const r = paletteHex.ritual;
  const floor = hexToRgba(r.primarySoft[isDark ? 'dark' : 'light'], isDark ? 0.11 : 0.068);
  const ceiling = hexToRgba(r.primary[isDark ? 'dark' : 'light'], isDark ? 0.07 : 0.036);
  const mid = hexToRgba(r.surfaceSecondary[isDark ? 'dark' : 'light'], isDark ? 0.065 : 0.038);

  return (
    <View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no"
      accessible={false}
      style={styles.shell}
    >
      <LinearGradient
        pointerEvents="none"
        colors={[ceiling, mid, 'transparent']}
        locations={[0, 0.45, 1]}
        start={{ x: 0.48, y: 0 }}
        end={{ x: 0.52, y: 0.72 }}
        style={styles.topWash}
      />
      <LinearGradient
        pointerEvents="none"
        colors={['transparent', floor]}
        locations={[0, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.fade}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  shell: {
    ...StyleSheet.absoluteFill,
    zIndex: 0,
  },
  topWash: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '48%',
  },
  fade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '52%',
  },
});
