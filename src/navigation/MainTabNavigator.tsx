/**
 * Native bottom tabs — core journeys only; ritual-tint chrome stays visually quiet.
 *
 * Accent + wash: `@/navigation/tabBarAppearance` (+ `paletteHex` rituals).
 */
import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { Platform } from 'react-native';
import { useColorScheme } from 'nativewind';
import type { AppleIcon } from 'react-native-bottom-tabs';

import {
  getAppNativeTabBarScreenOptions,
  getAppNativeTabViewPassthrough,
} from '@/navigation/tabBarAppearance';
import { ProfileStackNavigator } from '@/navigation/ProfileStackNavigator';
import type { RootTabParamList } from '@/navigation/types';

import { BookingsScreen } from '@/screens/BookingsScreen';
import { ExploreScreen } from '@/screens/ExploreScreen';
import { HomeScreen } from '@/screens/HomeScreen';

const Tab = createNativeBottomTabNavigator<RootTabParamList>();

/** Home / Bookings / Explore / Profile — utility routes live under Profile stack. */
export function MainTabNavigator() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const paletteKey = colorScheme === 'dark' ? 'dark' : 'light';

  const navigatorScreenOptions = useMemo(() => getAppNativeTabBarScreenOptions(paletteKey), [paletteKey]);

  const tabViewPassthrough = useMemo(() => getAppNativeTabViewPassthrough(paletteKey), [paletteKey]);

  return (
    <Tab.Navigator
      {...tabViewPassthrough}
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
              tabBarIcon: (): AppleIcon =>
                ({
                  sfSymbol: 'house',
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
              tabBarIcon: (): AppleIcon =>
                ({
                  sfSymbol: 'calendar',
                }) as AppleIcon,
            },
            default: {},
          }),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          title: t('tabs.explore'),
          tabBarLabel: t('tabs.explore'),
          ...Platform.select({
            ios: {
              tabBarIcon: (): AppleIcon =>
                ({
                  sfSymbol: 'safari',
                }) as AppleIcon,
            },
            default: {},
          }),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          title: t('tabs.profile'),
          tabBarLabel: t('tabs.profile'),
          ...Platform.select({
            ios: {
              tabBarIcon: (): AppleIcon =>
                ({
                  sfSymbol: 'person.circle',
                }) as AppleIcon,
            },
            default: {},
          }),
        }}
      />
    </Tab.Navigator>
  );
}
