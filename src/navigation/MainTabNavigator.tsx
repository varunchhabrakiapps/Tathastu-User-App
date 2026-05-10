/**
 * Tab tint + scene colors: `semanticColors` → `paletteHex` (matches Tailwind primary/canvas/surface).
 *
 * iOS tab icons: outline SF Symbols only — selection is shown by tab tint, not fill/circle swaps,
 * so all tabs behave consistently (Bookings/Help no longer jump to a “circle” glyph).
 */
import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useColorScheme } from 'nativewind';
import { Platform } from 'react-native';
import type { AppleIcon } from 'react-native-bottom-tabs';

import type { RootTabParamList } from '@/navigation/types';
import { BookingsScreen } from '@/screens/BookingsScreen';
import { HelpScreen } from '@/screens/HelpScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { semanticColors } from '@/theme';

const Tab = createNativeBottomTabNavigator<RootTabParamList>();

export function MainTabNavigator() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const paletteKey = colorScheme === 'dark' ? 'dark' : 'light';
  const semantic = semanticColors[paletteKey];

  const navigatorScreenOptions = useMemo(
    () => ({
      tabBarActiveTintColor: semantic.tabActive,
      tabBarInactiveTintColor: semantic.tabInactive,
      tabBarStyle: { backgroundColor: semantic.tabBarBg },
      sceneStyle: { backgroundColor: semantic.surface },
    }),
    [semantic],
  );

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={navigatorScreenOptions}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t('tabs.home'),
          tabBarLabel: t('tabs.home'),
          ...Platform.select({
            ios: {
              tabBarIcon: ({ focused }: { focused: boolean }): AppleIcon =>
                ({
                  sfSymbol: focused ? 'house.fill' : 'house',
                }) as AppleIcon,
            },
            default: {},
          }),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          title: t('tabs.bookings'),
          tabBarLabel: t('tabs.bookings'),
          ...Platform.select({
            ios: {
              tabBarIcon: (): AppleIcon => ({ sfSymbol: 'calendar' }) as AppleIcon,
            },
            default: {},
          }),
        }}
      />
      <Tab.Screen
        name="Help"
        component={HelpScreen}
        options={{
          title: t('tabs.help'),
          tabBarLabel: t('tabs.help'),
          ...Platform.select({
            ios: {
              tabBarIcon: (): AppleIcon =>
                ({ sfSymbol: 'headphones' }) as AppleIcon,
            },
            default: {},
          }),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t('tabs.settings'),
          tabBarLabel: t('tabs.settings'),
          ...Platform.select({
            ios: {
              tabBarIcon: ({ focused }: { focused: boolean }): AppleIcon =>
                ({
                  sfSymbol: focused ? 'gearshape.fill' : 'gearshape',
                }) as AppleIcon,
            },
            default: {},
          }),
        }}
      />
    </Tab.Navigator>
  );
}
