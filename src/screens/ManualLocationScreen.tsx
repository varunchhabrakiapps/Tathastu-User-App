import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { AuthScreen } from '@/components/templates/AuthScreen';
import { useManualLocationScreen } from '@/hooks/useManualLocationScreen';
import { paletteHex } from '@/theme/palette';

/** Placeholder until city / area picker ships. */
export function ManualLocationScreen() {
  const { t } = useTranslation();
  const vm = useManualLocationScreen();
  const { colorScheme } = useColorScheme();
  const key = colorScheme === 'dark' ? 'dark' : 'light';
  const ink = paletteHex.ritual.ink[key];
  const muted = paletteHex.ritual.inkMuted[key];

  return (
    <AuthScreen
      hasBackHeader
      onBackPress={vm.onBackPress}
      backAccessibilityLabel={t('screens.manualLocation.backA11y')}
    >
      <View className="flex-1 px-5 pt-4">
        <Text
          accessibilityRole="header"
          style={{ color: ink }}
          className="text-login-display font-medium"
        >
          {t('screens.manualLocation.title')}
        </Text>
        <Text style={{ color: muted }} className="mt-2 text-login-body">
          {t('screens.manualLocation.subtitle')}
        </Text>
      </View>
    </AuthScreen>
  );
}
