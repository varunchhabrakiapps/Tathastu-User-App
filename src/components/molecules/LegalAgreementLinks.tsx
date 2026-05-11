import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Pressable, Text, View } from 'react-native';

import { LEGAL_URLS } from '@/constants/legalUrls';
import { cn } from '@/utils/cn';

async function openUrl(url: string) {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  }
}

type Props = {
  variant?: 'default' | 'ritual';
  /** `quiet`: smaller, lower-emphasis strip (modern auth footer). */
  prominence?: 'default' | 'quiet';
  className?: string;
};

/**
 * Compact legal footer: Terms + Privacy links (opens in browser).
 */
export const LegalAgreementLinks = memo(function LegalAgreementLinks({
  variant = 'default',  
  className,
}: Props) {
  const { t } = useTranslation();


  const legalBodySize = 'text-xs';
  const linkTypography = cn(
    'text-login-legal-link font-semibold',
    'underline decoration-solid underline-offset-[3px]',
  );

  const onTerms = useCallback(() => {
    openUrl(LEGAL_URLS.termsOfService);
  }, []);

  const onPrivacy = useCallback(() => {
    openUrl(LEGAL_URLS.privacyPolicy);
  }, []);

  const chromeUnderline = variant === 'default';

  return (
    <View className={cn('items-center px-1', className)}>
      <Text
        className={cn(
          'text-center font-normal',
          'leading-[16px]',
          legalBodySize,
        )}
      >
        {t('screens.login.legal.prefix')}
      </Text>
      <View
        className={cn(
          'flex-row flex-wrap items-center justify-center '
        )}
      >
        <Pressable
          onPress={onTerms}
          accessibilityRole="link"
          accessibilityLabel={t('screens.login.legal.termsA11y')}
          accessibilityHint={t('screens.login.legal.opensExternal')}
          hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
          style={({ pressed }) => ({
            opacity: pressed ? 0.82 : 1,
          })}
          className={cn('justify-center px-1')}
        >
          <Text
            className={cn(
              linkTypography,
              chromeUnderline && 'underline',
            )}
          >
            {t('screens.login.legal.terms')}
          </Text>
        </Pressable>
        <Text className={cn(legalBodySize)}>{t('screens.login.legal.middle')}</Text>
        <Pressable
          onPress={onPrivacy}
          accessibilityRole="link"
          accessibilityLabel={t('screens.login.legal.privacyA11y')}
          accessibilityHint={t('screens.login.legal.opensExternal')}
          hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
          style={({ pressed }) => ({
            opacity: pressed ? 0.82 : 1,
          })}
          className={cn('justify-center px-1')}
        >
          <Text
            className={cn(
              linkTypography,
              chromeUnderline && 'underline',
            )}
          >
            {t('screens.login.legal.privacy')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
});
