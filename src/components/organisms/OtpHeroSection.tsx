import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { TathastuMark } from '@/components/atoms/TathastuMark';
import { paletteHex } from '@/theme/palette';

/**
 * Compact editorial anchor — continues login typography without the full hero illustration.
 */
export const OtpHeroSection = memo(function OtpHeroSection() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const key = colorScheme === 'dark' ? 'dark' : 'light';
  const titleColor = paletteHex.ritual.ink[key];
  const subtitleColor = paletteHex.ritual.inkMuted[key];

  return (
    <View className="gap-4 px-5 pb-2">
      <View className="flex-row items-start gap-3">
        <TathastuMark
          accessibilityLabel={t('screens.login.brandMarkA11y')}
        />
        <View className="min-w-0 flex-1 gap-1">
          <Text
            accessibilityRole="header"
            style={{ color: titleColor }}
            className="text-login-display font-medium"
          >
            {t('screens.otp.title')}
          </Text>
          <Text
            accessibilityRole="text"
            style={{ color: subtitleColor }}
            className="text-login-body font-normal"
          >
            {t('screens.otp.subtitle')}
          </Text>
        </View>
      </View>
    </View>
  );
});
