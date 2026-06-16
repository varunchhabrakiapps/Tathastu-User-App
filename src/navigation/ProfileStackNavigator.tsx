import { createStackNavigator } from '@react-navigation/stack';

import type { ProfileStackParamList } from '@/navigation/types';
import { AboutScreen } from '@/screens/AboutScreen';
import { EditProfileScreen } from '@/screens/EditProfileScreen';
import { HelpScreen } from '@/screens/HelpScreen';
import { LegalInfoScreen } from '@/screens/LegalInfoScreen';
import { NotificationPreferencesScreen } from '@/screens/NotificationPreferencesScreen';
import { ProfileHubScreen } from '@/screens/ProfileHubScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';

const Stack = createStackNavigator<ProfileStackParamList>();

/**
 * Nested profile journeys — hub entry; settings, help, and utility screens off the main tab strip.
 * Nested leaves use {@link ProfileStackScrollLayout} (custom header); navigator headers stay hidden.
 */
export function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHub" component={ProfileHubScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Notifications" component={NotificationPreferencesScreen} />
      <Stack.Screen name="LegalInfo" component={LegalInfoScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}
