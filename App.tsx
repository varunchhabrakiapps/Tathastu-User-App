/**
 * @format
 */

import './global.css';

import '@/i18n';

import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from '@/context/AuthContext';
import { ProductProvider } from '@/context/ProductContext';
import { ThemePreferenceProvider } from '@/hooks/useThemePreference';
import { RootNavigator } from '@/navigation';

import { semanticColors } from '@/theme';

export default function App() {
  const { colorScheme } = useColorScheme();
  const paletteKey = colorScheme === 'dark' ? 'dark' : 'light';
  const semantic = semanticColors[paletteKey];

  return (
    <GestureHandlerRootView className="flex-1 bg-canvas dark:bg-canvas-dark">
      <SafeAreaProvider>
        <ThemePreferenceProvider>
          <AuthProvider>
            <ProductProvider>
              <NavigationContainer>
                <StatusBar barStyle={semantic.statusBarStyle} />
                <RootNavigator />
              </NavigationContainer>
            </ProductProvider>
          </AuthProvider>
        </ThemePreferenceProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
