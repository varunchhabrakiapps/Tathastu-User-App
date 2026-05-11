import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { TathastuMark } from '@/components/atoms/TathastuMark';

/**
 * Brand / trust strip under hero — editorial lockup (badge → mark → headline → promise line).
 */
export const LoginTrustBrandSection = memo(function LoginTrustBrandSection() {
  const { t } = useTranslation();

  return (
    <View className="gap-3">
      <View className="self-start rounded-full bg-ritual-surfaceSecondary/55 px-3 py-2 dark:bg-ritual-surfaceSecondary-dark/38">
        <Text
          accessibilityRole="text"
          className="text-login-metadata font-medium uppercase text-ritual-inkMuted/90 dark:text-ritual-inkMuted-dark/88"
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
            className="text-login-display font-medium text-ritual-ink dark:text-ritual-ink-dark"
          >
            {t('screens.login.authTitle')}
          </Text>
          <Text
            accessibilityRole="text"
            numberOfLines={3}
            className="text-login-body font-normal text-ritual-ink/88 dark:text-ritual-ink-dark/88"
          >
            {t('screens.login.trustTagline')}
          </Text>
        </View>
      </View>
    </View>
  );
});
