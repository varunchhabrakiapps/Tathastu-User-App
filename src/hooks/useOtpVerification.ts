import { useCallback, useState } from 'react';
import { Keyboard } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import {
  createSessionAuthService,
  type AuthService,
} from '@/services/auth.service';
import {
  OTP_FLOW,
  mockOtpService,
  type OtpService,
} from '@/services/otp.service';
import { useOtpInput } from '@/hooks/useOtpInput';
import { useResendTimer } from '@/hooks/useResendTimer';

export type UseOtpVerificationOptions = {
  otpService?: OtpService;
  authService?: AuthService;
};

/**
 * OTP step orchestration: input, cooldown resend, verify via {@link OtpService} then session via {@link AuthService}.
 */
export function useOtpVerification(
  mobileNationalNumber: string,
  options: UseOtpVerificationOptions = {},
) {
  const { login } = useAuth();
  const otpService = options.otpService ?? mockOtpService;
  const authService = options.authService ?? createSessionAuthService(login);

  const {
    value: otp,
    onChangeText: onOtpChange,
    clear: clearOtp,
    isComplete: otpComplete,
  } = useOtpInput(OTP_FLOW.codeLength);

  const {
    secondsLeft,
    restart,
    clear: clearCooldown,
    isFinished: cooldownFinished,
  } = useResendTimer(OTP_FLOW.resendCooldownSec);

  const [resendCount, setResendCount] = useState(0);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const resendExhausted = resendCount >= OTP_FLOW.resendMaxAttempts;
  const canResend =
    cooldownFinished &&
    !resendExhausted &&
    !resendLoading &&
    !verifyLoading;

  const onResend = useCallback(async () => {
    if (!canResend) {
      return;
    }
    setResendLoading(true);
    try {
      const result = await otpService.requestOtpResend({
        mobileNationalNumber,
      });
      if (!result.ok) {
        return;
      }
      const next = resendCount + 1;
      setResendCount(next);
      if (next >= OTP_FLOW.resendMaxAttempts) {
        clearCooldown();
      } else {
        restart(OTP_FLOW.resendCooldownSec);
      }
      clearOtp();
    } finally {
      setResendLoading(false);
    }
  }, [
    canResend,
    clearCooldown,
    clearOtp,
    mobileNationalNumber,
    otpService,
    resendCount,
    restart,
  ]);

  const onVerify = useCallback(async () => {
    Keyboard.dismiss();
    if (!otpComplete || verifyLoading) {
      return;
    }
    setVerifyLoading(true);
    try {
      const verified = await otpService.verifyOtp({
        mobileNationalNumber,
        code: otp,
      });
      if (!verified.ok) {
        return;
      }
      await authService.establishSession(mobileNationalNumber);
    } finally {
      setVerifyLoading(false);
    }
  }, [
    authService,
    mobileNationalNumber,
    otp,
    otpComplete,
    otpService,
    verifyLoading,
  ]);

  return {
    otp,
    otpLength: OTP_FLOW.codeLength,
    onOtpChange,
    onResend,
    onVerify,
    verifyLoading,
    verifyDisabled: !otpComplete,
    secondsLeft,
    canResend,
    resendExhausted,
    resendLoading,
  };
}
