/**
 * OTP domain — API boundaries for verification and resend.
 * Replace `mockOtpService` with a network-backed implementation when backend is ready.
 */

export const OTP_FLOW = {
  codeLength: 6,
  resendCooldownSec: 30,
  resendMaxAttempts: 3,
} as const;

export type VerifyOtpSuccess = { ok: true };
export type VerifyOtpFailure = { ok: false; errorCode: string };

export type VerifyOtpResult = VerifyOtpSuccess | VerifyOtpFailure;

export type ResendOtpSuccess = { ok: true };
export type ResendOtpFailure = {
  ok: false;
  errorCode: 'RATE_LIMITED' | 'NETWORK' | 'UNKNOWN';
};

export type ResendOtpResult = ResendOtpSuccess | ResendOtpFailure;

export type OtpVerifyParams = {
  mobileNationalNumber: string;
  code: string;
};

export type OtpResendParams = {
  mobileNationalNumber: string;
};

export interface OtpService {
  verifyOtp(params: OtpVerifyParams): Promise<VerifyOtpResult>;
  requestOtpResend(params: OtpResendParams): Promise<ResendOtpResult>;
}

/** Deterministic stand-in for OTP APIs (swap for HTTP + retries + analytics later). */
export const mockOtpService: OtpService = {
  async verifyOtp({ code }) {
    await delay(400);
    if (code.length === OTP_FLOW.codeLength) {
      return { ok: true };
    }
    return { ok: false, errorCode: 'INVALID_CODE' };
  },

  async requestOtpResend() {
    await delay(280);
    return { ok: true };
  },
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
