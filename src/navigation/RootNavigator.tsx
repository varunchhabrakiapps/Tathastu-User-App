import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'nativewind';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { useOnboardingHydration } from '@/hooks/useOnboardingHydration';
import { paletteHex } from '@/theme/palette';
import { LoginScreen } from '@/screens/LoginScreen';
import { OnboardingScreen } from '@/screens/OnboardingScreen';

import { MainTabNavigator } from './MainTabNavigator';
import type { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { isReady: authReady, isLoggedIn } = useAuth();
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

  return (
    <Stack.Navigator
      key={isLoggedIn ? 'app' : 'auth'}
      initialRouteName={isLoggedIn ? 'Main' : authInitialRoute}
      screenOptions={{ headerShown: false }}
    >
      {isLoggedIn ? (
        <Stack.Screen name="Main" component={MainTabNavigator} />
      ) : (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
