import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { TathastuMark } from '@/components/atoms/TathastuMark';
import { paletteHex } from '@/theme/palette';

/**
 * Brand / trust strip under hero — editorial lockup (badge → mark → headline → promise line).
 */
export const LoginTrustBrandSection = memo(function LoginTrustBrandSection() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const key = colorScheme === 'dark' ? 'dark' : 'light';
  const eyebrowColor = paletteHex.ritual.inkMuted[key];
  const titleColor = paletteHex.ritual.ink[key];
  const taglineColor = paletteHex.ritual.inkMuted[key];

  return (
    <View className="gap-3">
      <View className="self-start rounded-full bg-ritual-surfaceSecondary/55 px-3 py-2 dark:bg-ritual-surfaceSecondary-dark/55">
        <Text
          accessibilityRole="text"
          style={{ color: eyebrowColor }}
          className="text-login-metadata font-medium uppercase"
        >
          {t('screens.onboarding.eyebrowMarketing')}
        </Text>
      </View>

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
            {t('screens.login.authTitle')}
          </Text>
          <Text
            accessibilityRole="text"
            numberOfLines={3}
            style={{ color: taglineColor }}
            className="text-login-body font-normal"
          >
            {t('screens.login.trustTagline')}
          </Text>
        </View>
      </View>
    </View>
  );
});
