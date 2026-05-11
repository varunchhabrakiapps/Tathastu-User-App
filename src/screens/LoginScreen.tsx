import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { Platform, StatusBar, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AdaptiveGlassSurface } from '@/components/atoms/AdaptiveGlassSurface';
import { HeroDiyaImage } from '@/components/atoms/HeroDiyaImage';
import { LabeledTextField } from '@/components/atoms/LabeledTextField';
import { PrimaryGlassButton } from '@/components/atoms/PrimaryGlassButton';
import { LegalAgreementLinks } from '@/components/molecules/LegalAgreementLinks';
import { GradientHeroShell } from '@/components/molecules/GradientHeroShell';
import { MarketingHeroCopy } from '@/components/molecules/MarketingHeroCopy';
import { AuthFlowScrollLayout } from '@/components/templates/AuthFlowScrollLayout';
import { useAuth } from '@/context/AuthContext';
import { getLoginHeroGradient } from '@/theme/heroGradients';
import { semanticColors } from '@/theme/semanticColors';

export function LoginScreen() {
  const { t } = useTranslation();
  const { height: windowHeight } = useWindowDimensions();
  const { top: safeTop } = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const paletteKey = colorScheme === 'dark' ? 'dark' : 'light';
  const { login } = useAuth();
  const [mobile, setMobile] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const heroColors = getLoginHeroGradient(paletteKey);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('transparent');
      }
      return () => {
        StatusBar.setBarStyle(semanticColors[paletteKey].statusBarStyle);
        if (Platform.OS === 'android') {
          StatusBar.setTranslucent(false);
          StatusBar.setBackgroundColor(semanticColors[paletteKey].surface);
        }
      };
    }, [paletteKey]),
  );

  const onContinue = useCallback(async () => {
    setErrorKey(null);
    setSubmitting(true);
    try {
      await login(mobile);
    } catch (e) {
      if (e instanceof Error && e.message === 'INVALID_MOBILE') {
        setErrorKey('screens.login.errorInvalidMobile');
      } else {
        setErrorKey('screens.login.errorGeneric');
      }
    } finally {
      setSubmitting(false);
    }
  }, [login, mobile]);

  const errorText = errorKey ? t(errorKey) : null;

  return (
    <AuthFlowScrollLayout scrollClassName="bg-transparent">
      <GradientHeroShell
        colors={heroColors}
        contentTopInset={safeTop}
        minHeight={windowHeight}
      >
        <View className="items-center pb-8">
          <View className="w-full max-w-md items-center gap-5">
            <MarketingHeroCopy
              accentTone="warm"
              badge={t('screens.login.heroBadge')}
              title={t('product.brandName')}
              subtitle={t('screens.login.heroSubtitle')}
              body={t('screens.login.heroBody')}
            />
            <HeroDiyaImage accessibilityLabel={t('screens.login.heroDiyaA11y')} />

            <AdaptiveGlassSurface>
              <View className="px-6 py-8">
                <Text className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ink-subtle dark:text-ink-muted-ondark">
                  {t('screens.login.cardEyebrow')}
                </Text>
                <Text className="mt-2 text-center text-2xl font-bold tracking-tight text-ink dark:text-ink-ondark">
                  {t('screens.login.cardTitle')}
                </Text>
                <Text className="mx-auto mt-2 max-w-sm text-center text-base leading-snug text-ink-muted dark:text-ink-muted-ondark">
                  {t('screens.login.cardSubtitle')}
                </Text>

                <View className="my-8 h-px w-full bg-border/80 dark:bg-border-dark/90" />

                <LabeledTextField
                  label={t('screens.login.mobileLabel')}
                  prefix={t('screens.login.mobilePrefix')}
                  value={mobile}
                  maxLength={10}
                  onChangeText={(text) => {
                    const digits = text.replace(/\D/g, '').slice(0, 10);
                    setMobile(digits);
                    setErrorKey(null);
                  }}
                  placeholder={t('screens.login.mobilePlaceholder')}
                  keyboardType="phone-pad"
                  autoComplete="tel"
                  textContentType="telephoneNumber"
                  editable={!submitting}
                  errorText={errorText}
                  accessibilityLabel={t('screens.login.mobileFieldA11y')}
                  inputClassName="rounded-[22px] border-0 bg-surface shadow-sm dark:bg-surface-elevated"
                />

                <PrimaryGlassButton
                  className="mt-7 rounded-[22px]"
                  label={t('screens.login.ctaContinue')}
                  onPress={onContinue}
                  loading={submitting}
                  accessibilityLabel={t('screens.login.ctaContinue')}
                />

                <Text className="mt-6 text-center text-sm leading-snug text-ink-muted dark:text-ink-muted-ondark">
                  {t('screens.login.trustNote')}
                </Text>

                <LegalAgreementLinks />
              </View>
            </AdaptiveGlassSurface>

          </View>
        </View>
      </GradientHeroShell>


    </AuthFlowScrollLayout>
  );
}
