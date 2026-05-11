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
  prominence = 'default',
  className,
}: Props) {
  const { t } = useTranslation();
  const isQuietAuth = prominence === 'quiet' && variant === 'ritual';

  const muted = isQuietAuth
    ? 'text-ritual-inkMuted/50 dark:text-ritual-inkMuted-dark/46'
    : variant === 'ritual'
      ? 'text-ritual-inkMuted/90 dark:text-ritual-inkMuted-dark/90'
      : 'text-ink-muted dark:text-ink-muted-ondark';

  const linkTone =
    variant === 'ritual'
      ? isQuietAuth
        ? 'text-ritual-primary/72 dark:text-ritual-primary-dark/68'
        : 'text-ritual-primary/92 dark:text-ritual-primary-dark/90'
      : 'text-primary dark:text-primary-dark';

  const labelSize = isQuietAuth ? 'text-[10px]' : 'text-xs';
  const linkTypography = cn(
    labelSize,
    isQuietAuth ? 'font-normal' : 'font-semibold',
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
      <Text className={cn('text-center leading-[16px]', labelSize, muted)}>
        {t('screens.login.legal.prefix')}
      </Text>
      <View
        className={cn(
          'flex-row flex-wrap items-center justify-center gap-x-1 gap-y-0.5',
          isQuietAuth ? 'mt-1' : 'mt-2',
        )}
      >
        <Pressable
          onPress={onTerms}
          accessibilityRole="link"
          accessibilityLabel={t('screens.login.legal.termsA11y')}
          accessibilityHint={t('screens.login.legal.opensExternal')}
          hitSlop={8}
        >
          <Text className={cn(linkTypography, chromeUnderline && 'underline', linkTone)}>
            {t('screens.login.legal.terms')}
          </Text>
        </Pressable>
        <Text className={cn(labelSize, muted)}>{t('screens.login.legal.middle')}</Text>
        <Pressable
          onPress={onPrivacy}
          accessibilityRole="link"
          accessibilityLabel={t('screens.login.legal.privacyA11y')}
          accessibilityHint={t('screens.login.legal.opensExternal')}
          hitSlop={8}
        >
          <Text className={cn(linkTypography, chromeUnderline && 'underline', linkTone)}>
            {t('screens.login.legal.privacy')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
});
