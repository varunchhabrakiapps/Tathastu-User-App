import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { TathastuMark } from '@/components/atoms/TathastuMark';

/**
 * Compact editorial anchor — continues login typography without the full hero illustration.
 */
export const OtpHeroSection = memo(function OtpHeroSection() {
  const { t } = useTranslation();

  return (
    <View className="gap-4 px-5 pb-2">
      <View className="flex-row items-start gap-3">
        <TathastuMark
          accessibilityLabel={t('screens.login.brandMarkA11y')}
        />
        <View className="min-w-0 flex-1 gap-1">
          <Text
            accessibilityRole="header"
            className="text-login-display font-medium text-ritual-ink dark:text-ritual-ink-dark"
          >
            {t('screens.otp.title')}
          </Text>
          <Text
            accessibilityRole="text"
            className="text-login-body font-normal text-ritual-ink/88 dark:text-ritual-ink-dark/88"
          >
            {t('screens.otp.subtitle')}
          </Text>
        </View>
      </View>
    </View>
  );
});
