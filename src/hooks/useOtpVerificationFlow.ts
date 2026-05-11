import { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

import { useAuth } from '@/context/AuthContext';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SEC = 30;
const OTP_RESEND_MAX = 3;

export function useOtpVerificationFlow(mobileNationalDigits: string) {
  const { login } = useAuth();
  const [otp, setOtp] = useState('');
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN_SEC);
  const [resendCount, setResendCount] = useState(0);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return undefined;
    }
    const id = setTimeout(() => {
      setSecondsLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  const resendExhausted = resendCount >= OTP_RESEND_MAX;
  const canResend = secondsLeft <= 0 && !resendExhausted;

  const onOtpChange = useCallback((text: string) => {
    const next = text.replace(/\D/g, '').slice(0, OTP_LENGTH);
    setOtp(next);
  }, []);

  const onResend = useCallback(() => {
    if (!canResend) {
      return;
    }
    setResendCount((c) => {
      const next = c + 1;
      if (next >= OTP_RESEND_MAX) {
        setSecondsLeft(0);
      } else {
        setSecondsLeft(RESEND_COOLDOWN_SEC);
      }
      return next;
    });
    setOtp('');
  }, [canResend]);

  const onVerify = useCallback(async () => {
    Keyboard.dismiss();
    if (otp.length !== OTP_LENGTH || verifyLoading) {
      return;
    }
    setVerifyLoading(true);
    try {
      await login(mobileNationalDigits);
    } finally {
      setVerifyLoading(false);
    }
  }, [login, mobileNationalDigits, otp.length, verifyLoading]);

  const verifyDisabled = otp.length !== OTP_LENGTH;

  return {
    otp,
    otpLength: OTP_LENGTH,
    onOtpChange,
    onVerify,
    onResend,
    verifyLoading,
    verifyDisabled,
    secondsLeft,
    canResend,
    resendExhausted,
    resendCount,
    resendCooldownSec: RESEND_COOLDOWN_SEC,
  };
}
