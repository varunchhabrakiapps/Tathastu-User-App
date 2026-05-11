import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { RitualPrimaryButton } from '@/components/atoms/RitualPrimaryButton';
import { AuthLegalFooter } from '@/components/molecules/AuthLegalFooter';
import { LoginAuthSurface } from '@/components/molecules/LoginAuthSurface';
import { OtpInput } from '@/components/molecules/OtpInput';
import { formatMmSsCountdown } from '@/utils/formatCountdown';

type Props = {
  formattedPhone: string;
  onEditPhone: () => void;
  otp: string;
  otpLength: number;
  onOtpChange: (text: string) => void;
  onVerify: () => void;
  verifyLoading: boolean;
  verifyDisabled: boolean;
  secondsLeft: number;
  canResend: boolean;
  resendExhausted: boolean;
  resendLoading: boolean;
  onResend: () => void;
};

export const OtpFormCard = memo(function OtpFormCard({
  formattedPhone,
  onEditPhone,
  otp,
  otpLength,
  onOtpChange,
  onVerify,
  verifyLoading,
  verifyDisabled,
  secondsLeft,
  canResend,
  resendExhausted,
  resendLoading,
  onResend,
}: Props) {
  const { t } = useTranslation();
  const countdown = useMemo(
    () => formatMmSsCountdown(secondsLeft),
    [secondsLeft],
  );

  return (
    <LoginAuthSurface>
      <View className="px-4">
        <View className="gap-5">
          <View className="flex-row items-end justify-between gap-4">
            <View className="min-w-0 flex-1">
              <Text className="mb-2 text-login-label font-medium text-ritual-inkMuted/72 dark:text-ritual-inkMuted-dark/68">
                {t('screens.otp.phoneLabel')}
              </Text>
              <Text
                accessibilityRole="text"
                className="text-login-body font-semibold tabular-nums text-ritual-ink dark:text-ritual-ink-dark"
              >
                {formattedPhone}
              </Text>
            </View>
            <Pressable
              onPress={onEditPhone}
              accessibilityRole="button"
              accessibilityLabel={t('screens.otp.editA11y')}
              hitSlop={{ top: 10, bottom: 10, left: 12, right: 12 }}
              className="pb-0.5"
            >
              <Text className="text-login-metadata font-semibold uppercase tracking-wide text-ritual-primary dark:text-ritual-primary-dark">
                {t('screens.otp.edit')}
              </Text>
            </Pressable>
          </View>

          <View className="gap-2">
            <Text className="text-login-label font-medium text-ritual-inkMuted/72 dark:text-ritual-inkMuted-dark/68">
              {t('screens.otp.codeLabel')}
            </Text>
            <OtpInput
              value={otp}
              length={otpLength}
              onChangeText={onOtpChange}
              editable={!verifyLoading && !resendLoading}
              accessibilityLabel={t('screens.otp.digitsA11y')}
            />
          </View>

          <View className="items-center gap-1.5">
            {resendExhausted ? (
              <Text className="text-center text-login-legal text-ritual-inkMuted/66 dark:text-ritual-inkMuted-dark/62">
                {t('screens.otp.resendLimit')}
              </Text>
            ) : canResend ? (
              <Pressable
                onPress={onResend}
                disabled={resendLoading}
                accessibilityRole="button"
                accessibilityLabel={t('screens.otp.resend')}
                accessibilityState={{ disabled: resendLoading, busy: resendLoading }}
                hitSlop={{ top: 8, bottom: 8, left: 12, right: 12 }}
                className={resendLoading ? 'opacity-48' : ''}
              >
                <Text className="text-login-body font-semibold text-ritual-primary dark:text-ritual-primary-dark">
                  {t('screens.otp.resend')}
                </Text>
              </Pressable>
            ) : (
              <Text
                accessibilityRole="text"
                accessibilityLabel={t('screens.otp.resendCountdownA11y', {
                  time: countdown,
                })}
                className="text-login-body font-medium tabular-nums text-ritual-inkMuted/62 dark:text-ritual-inkMuted-dark/58"
              >
                {t('screens.otp.resendIn', { time: countdown })}
              </Text>
            )}
          </View>

          <RitualPrimaryButton
            label={t('screens.otp.ctaVerify')}
            onPress={onVerify}
            loading={verifyLoading}
            disabled={verifyDisabled}
            accessibilityLabel={t('screens.otp.ctaVerify')}
          />
        </View>

        <View className="mt-8 gap-3">
          <Text className="max-w-[250px] self-center text-login-legal text-center font-normal text-ritual-inkMuted/54 dark:text-ritual-inkMuted-dark/50">
            {t('screens.otp.helpFooter')}
          </Text>
          <AuthLegalFooter />
        </View>
      </View>
    </LoginAuthSurface>
  );
});
