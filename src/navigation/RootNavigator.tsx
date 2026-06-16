import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'nativewind';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { useOnboardingHydration } from '@/hooks/useOnboardingHydration';
import { BookingDetailScreen } from '@/screens/BookingDetailScreen';
import { BuildCustomRitualScreen } from '@/screens/BuildCustomRitualScreen';
import { RitualDetailScreen } from '@/screens/ritual-detail/RitualDetailScreen';
import { SearchScreen } from '@/screens/SearchScreen';
import { LoginScreen } from '@/screens/LoginScreen';
import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { OtpVerificationScreen } from '@/screens/OtpVerificationScreen';
import { LocationSetupScreen } from '@/screens/LocationSetupScreen';
import { ManualLocationScreen } from '@/screens/ManualLocationScreen';
import { paletteHex } from '@/theme/palette';

import { MainTabNavigator } from './MainTabNavigator';
import type { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { isReady: authReady, isLoggedIn, hasLocation } = useAuth();
  const { isReady: onboardingReady, hasCompletedOnboarding } =
    useOnboardingHydration();
  const { colorScheme } = useColorScheme();
  const paletteKey = colorScheme === 'dark' ? 'dark' : 'light';
  const spinnerColor = paletteHex.primary[paletteKey];

  const gateReady = authReady && onboardingReady;

  if (!gateReady) {
    return (
      <View className="flex-1 items-center justify-center bg-canvas dark:bg-canvas-dark">
        <ActivityIndicator size="large" color={spinnerColor} />
      </View>
    );
  }

  const authInitialRoute = hasCompletedOnboarding ? 'Login' : 'Onboarding';

  const navKey = !isLoggedIn ? 'auth' : !hasLocation ? 'location' : 'app';
  const initialRouteName: keyof RootStackParamList = !isLoggedIn
    ? authInitialRoute
    : !hasLocation
      ? 'LocationSetup'
      : 'Main';

  return (
    <Stack.Navigator
      key={navKey}
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="OtpVerification"
            component={OtpVerificationScreen}
          />
        </>
      ) : !hasLocation ? (
        <>
          <Stack.Screen
            name="LocationSetup"
            component={LocationSetupScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="ManualLocation" component={ManualLocationScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen
            name="BookingDetail"
            component={BookingDetailScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="RitualDetail"
            component={RitualDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BuildCustomRitual"
            component={BuildCustomRitualScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen name="ManualLocation" component={ManualLocationScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
