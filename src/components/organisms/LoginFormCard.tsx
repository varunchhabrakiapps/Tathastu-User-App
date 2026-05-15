import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { RitualPrimaryButton } from '@/components/atoms/RitualPrimaryButton';
import { AuthLegalFooter } from '@/components/molecules/AuthLegalFooter';
import { LoginAuthSurface } from '@/components/molecules/LoginAuthSurface';
import { PhoneInput } from '@/components/molecules/PhoneInput';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';

type Props = {
  mobile: string;
  onMobileChange: (text: string) => void;
  onContinue: () => void;
  continueDisabled: boolean;
  submitting: boolean;
  errorText: string | null;
};

/**
 * Auth block: input + CTA, then sign-in reassurance (OTP), then legal — inside `LoginAuthSurface`.
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
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const paletteKey = isDark ? 'dark' : 'light';

  const trustIconColor = useMemo(
    () =>
      hexToRgba(paletteHex.ritual.inkMuted[paletteKey], isDark ? 0.72 : 0.52),
    [paletteKey, isDark],
  );

  const trustHintColor = paletteHex.ritual.inkMuted[paletteKey];

  return (
    <LoginAuthSurface>
      <View className="px-4">
        <View className="gap-4">
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

        {/* Next-step trust (OTP) — paired with the CTA, not the legal cluster. */}
        <View
          accessibilityRole="text"
          accessibilityLabel={t('screens.login.secureOtpHintA11y')}
          className="mt-4 flex-row items-center justify-center gap-2"
        >
          <FontAwesome
            name="lock"
            size={12}
            color={trustIconColor}
            importantForAccessibility="no"
          />
          <Text
            importantForAccessibility="no"
            style={{ color: trustHintColor }}
            className="text-[12px] font-medium leading-4"
          >
            {t('screens.login.secureOtpHint')}
          </Text>
        </View>

        {/* Agreement + policies — separated, slightly larger type via `login-legal*` tokens */}
        <View className="mt-4 gap-3">
          <AuthLegalFooter />
        </View>
      </View>
    </LoginAuthSurface>
  );
});
