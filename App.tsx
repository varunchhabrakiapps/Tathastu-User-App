/**
 * @format
 */

import './global.css';

import '@/i18n';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from '@/context/AuthContext';
import { ProductProvider } from '@/context/ProductContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ThemePreferenceProvider, useThemePreference } from '@/hooks/useThemePreference';
import { RootNavigator } from '@/navigation';

import { semanticColors } from '@/theme';

function AppShell() {
  const { resolvedScheme } = useThemePreference();
  const semantic = semanticColors[resolvedScheme];

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <WishlistProvider>
          <ProductProvider>
            <NavigationContainer>
              <StatusBar barStyle={semantic.statusBarStyle} />
              <RootNavigator />
            </NavigationContainer>
          </ProductProvider>
        </WishlistProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1 bg-canvas dark:bg-canvas-dark">
      <ThemePreferenceProvider>
        <AppShell />
      </ThemePreferenceProvider>
    </GestureHandlerRootView>
  );
}
