import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { AdaptiveGlassSurface } from '@/components/atoms/AdaptiveGlassSurface';
import { LabeledTextField } from '@/components/atoms/LabeledTextField';
import { PrimaryGlassButton } from '@/components/atoms/PrimaryGlassButton';
import { LegalAgreementLinks } from '@/components/molecules/LegalAgreementLinks';

type Props = {
  mobile: string;
  onMobileChange: (text: string) => void;
  onContinue: () => void;
  submitting: boolean;
  errorText: string | null;
};

export function LoginFormCard({
  mobile,
  onMobileChange,
  onContinue,
  submitting,
  errorText,
}: Props) {
  const { t } = useTranslation();

  return (
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
          onChangeText={onMobileChange}
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
  );
}
