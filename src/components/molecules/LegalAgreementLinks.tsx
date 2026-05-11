import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Pressable, Text, View } from 'react-native';

import { LEGAL_URLS } from '@/constants/legalUrls';

async function openUrl(url: string) {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  }
}

/**
 * Compact legal footer: Terms + Privacy links (opens in browser).
 */
export const LegalAgreementLinks = memo(function LegalAgreementLinks() {
  const { t } = useTranslation();

  const onTerms = useCallback(() => {
    openUrl(LEGAL_URLS.termsOfService);
  }, []);

  const onPrivacy = useCallback(() => {
    openUrl(LEGAL_URLS.privacyPolicy);
  }, []);

  return (
    <View className="mt-6 items-center px-1">
      <Text className="text-center text-xs leading-relaxed text-ink-muted dark:text-ink-muted-ondark">
        {t('screens.login.legal.prefix')}
      </Text>
      <View className="mt-2 flex-row flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
        <Pressable
          onPress={onTerms}
          accessibilityRole="link"
          accessibilityLabel={t('screens.login.legal.termsA11y')}
          accessibilityHint={t('screens.login.legal.opensExternal')}
          hitSlop={8}
        >
          <Text className="text-xs font-semibold text-primary underline dark:text-primary-dark">
            {t('screens.login.legal.terms')}
          </Text>
        </Pressable>
        <Text className="text-xs text-ink-muted dark:text-ink-muted-ondark">
          {t('screens.login.legal.middle')}
        </Text>
        <Pressable
          onPress={onPrivacy}
          accessibilityRole="link"
          accessibilityLabel={t('screens.login.legal.privacyA11y')}
          accessibilityHint={t('screens.login.legal.opensExternal')}
          hitSlop={8}
        >
          <Text className="text-xs font-semibold text-primary underline dark:text-primary-dark">
            {t('screens.login.legal.privacy')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
});
