import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useColorScheme } from 'nativewind';

import type { ProfileStackParamList } from '@/navigation/types';
import { AboutScreen } from '@/screens/AboutScreen';
import { HelpScreen } from '@/screens/HelpScreen';
import { LegalInfoScreen } from '@/screens/LegalInfoScreen';
import { NotificationPreferencesScreen } from '@/screens/NotificationPreferencesScreen';
import { ProfileHubScreen } from '@/screens/ProfileHubScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { paletteHex } from '@/theme/palette';
import { semanticColors } from '@/theme/semanticColors';

const Stack = createStackNavigator<ProfileStackParamList>();

/**
 * Nested profile journeys — hub entry; settings, help, and utility screens off the main tab strip.
 */
export function ProfileStackNavigator() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const paletteKey = colorScheme === 'dark' ? 'dark' : 'light';
  const semantic = semanticColors[paletteKey];
  const ritualAccent = paletteHex.ritual.primary[paletteKey];
  const ritualInk = paletteHex.ritual.ink[paletteKey];

  const stackScreenOptions = useMemo(
    () => ({
      headerShadowVisible: false,
      headerBackTitleVisible: false,
      headerTintColor: ritualAccent,
      headerStyle: {
        backgroundColor: semantic.surface,
      },
      headerTitleStyle: {
        fontWeight: '600' as const,
        fontSize: 17,
        color: ritualInk,
      },
    }),
    [ritualAccent, ritualInk, semantic.surface],
  );

  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="ProfileHub"
        component={ProfileHubScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: t('screens.settings.title') }}
      />
      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={{ title: t('screens.help.title') }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationPreferencesScreen}
        options={{ title: t('screens.notifications.title') }}
      />
      <Stack.Screen
        name="LegalInfo"
        component={LegalInfoScreen}
        options={{ title: t('screens.legalInfo.title') }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: t('screens.about.title') }}
      />
    </Stack.Navigator>
  );
}
