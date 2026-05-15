import { Platform } from 'react-native';

import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';

type PaletteKey = 'light' | 'dark';

/**
 * Bottom tab tint + tint bar wash — aligns native chrome with ritual brand (soft, not neon indigo).
 */
export function getAppNativeTabBarScreenOptions(mode: PaletteKey) {
  const isDark = mode === 'dark';
  const canvasBg = paletteHex.canvas[mode];
  const active = paletteHex.ritual.primary[mode];
  const inactiveMuted = paletteHex.ritual.inkMuted[mode];

  return {
    tabBarActiveTintColor: active,
    tabBarInactiveTintColor: hexToRgba(inactiveMuted, isDark ? 0.52 : 0.46),
    /** Scene behind tabs — stays stone canvas like {@link TabScreenScaffold}. */
    sceneStyle: { backgroundColor: canvasBg },
    tabBarStyle: {
      /** Subtle wash — pairs with translucent bar on iOS for lighter chrome. */
      backgroundColor: hexToRgba(
        paletteHex.ritual.surface[mode],
        Platform.OS === 'ios' ? (isDark ? 0.55 : 0.62) : isDark ? 0.94 : 0.98,
      ),
    },
  };
}

/** TabView-native props forwarded by `@bottom-tabs/react-navigation` Navigator. */
export function getAppNativeTabViewPassthrough(mode: PaletteKey) {
  const accent = paletteHex.ritual.primary[mode];

  return {
    ...(Platform.OS === 'ios'
      ? {
          translucent: true,
          scrollEdgeAppearance: 'transparent' as const,
          hapticFeedbackEnabled: true,
        }
      : {
          rippleColor: hexToRgba(accent, 0.1),
          activeIndicatorColor: hexToRgba(accent, 0.22),
          hapticFeedbackEnabled: true,
        }),
    labeled: true,
    tabLabelStyle:
      Platform.OS === 'android'
        ? { fontSize: 11, fontWeight: '500' as const }
        : { fontSize: 10, fontWeight: '500' as const },
  };
}
