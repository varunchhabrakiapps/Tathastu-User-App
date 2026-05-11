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
    <View className="gap-4">
      <View className="self-start rounded-full bg-ritual-surfaceSecondary/55 px-3 py-2 dark:bg-ritual-surfaceSecondary-dark/38">
        <Text
          accessibilityRole="text"
          className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ritual-inkMuted dark:text-ritual-inkMuted-dark"
        >
          {t('screens.onboarding.eyebrowMarketing')}
        </Text>
      </View>

      <View className="flex-row items-start gap-3.5">
        <TathastuMark accessibilityLabel={t('screens.login.brandMarkA11y')} />
        <View className="min-w-0 flex-1 gap-2 pt-0.5">
          <Text
            accessibilityRole="header"
            className="text-[26px] font-medium leading-[32px] tracking-[-0.02em] text-ritual-ink dark:text-ritual-ink-dark"
          >
            {t('screens.login.authTitle')}
          </Text>
          <Text
            accessibilityRole="text"
            numberOfLines={3}
            className="text-[16px] font-normal leading-[24px] text-ritual-ink/92 dark:text-ritual-ink-dark/92"
          >
            {t('screens.login.trustTagline')}
          </Text>
        </View>
      </View>
    </View>
  );
});
