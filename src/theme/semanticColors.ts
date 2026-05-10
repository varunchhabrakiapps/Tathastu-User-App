/**
 * Semantic colors for places that can't use Tailwind (`className`): native tabs,
 * status bar hints, programmatic styles. Mirrors light/dark from NativeWind.
 */

export const semanticColors = {
  light: {
    surface: '#ffffff',
    tabBarBg: '#ffffff',
    tabActive: '#2563eb',
    tabInactive: '#6b7280',
    statusBarStyle: 'dark-content' as const,
  },
  dark: {
    surface: '#020617',
    tabBarBg: '#020617',
    tabActive: '#60a5fa',
    tabInactive: '#94a3b8',
    statusBarStyle: 'light-content' as const,
  },
} as const;
