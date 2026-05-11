import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { RitualPrimaryButton } from '@/components/atoms/RitualPrimaryButton';
import { AuthLegalFooter } from '@/components/molecules/AuthLegalFooter';
import { LoginAuthSurface } from '@/components/molecules/LoginAuthSurface';
import { PhoneInput } from '@/components/molecules/PhoneInput';

type Props = {
  mobile: string;
  onMobileChange: (text: string) => void;
  onContinue: () => void;
  continueDisabled: boolean;
  submitting: boolean;
  errorText: string | null;
};

/**
 * Auth block + legal block: same horizontal origin as brand (`LoginAuthSurface` is flush; grid is screen `px-5`).
 */
export const LoginFormCard = memo(function LoginFormCard({
  mobile,
  onMobileChange,
  onContinue,
  continueDisabled,
  submitting,
  errorText,
}: Props) {
  const { t } = useTranslation();

  return (
    <View className="w-full gap-8">
      <LoginAuthSurface>
        <View className="gap-6">
          <Text className="text-[14px] font-normal leading-[20px] text-ritual-inkMuted/88 dark:text-ritual-inkMuted-dark/86">
            {t('screens.login.authHelper')}
          </Text>
          <PhoneInput
            label={t('screens.login.mobileLabel')}
            prefix={t('screens.login.mobilePrefix')}
            value={mobile}
            onChangeText={onMobileChange}
            placeholder={t('screens.login.mobilePlaceholder')}
            onSubmitPrimary={onContinue}
            editable={!submitting}
            errorText={errorText}
            accessibilityLabel={t('screens.login.mobileFieldA11y')}
          />

          <RitualPrimaryButton
            label={t('screens.login.ctaContinue')}
            onPress={onContinue}
            loading={submitting}
            disabled={continueDisabled}
            accessibilityLabel={t('screens.login.ctaContinue')}
          />
        </View>
      </LoginAuthSurface>

      <View className="gap-3">
        <Text className="text-center text-[10px] font-normal leading-[15px] text-ritual-inkMuted/48 dark:text-ritual-inkMuted-dark/44">
          {t('screens.login.privacyHint')}
        </Text>

        <AuthLegalFooter />
      </View>
    </View>
  );
});
