/**
 * Auth session boundaries post-verification (OTP, SSO, etc.).
 * `createSessionAuthService` bridges to today's `AuthContext.login` until a token/API layer exists.
 */

export interface AuthService {
  /** Persist a signed-in session once identity is verified upstream. */
  establishSession(mobileNationalNumber: string): Promise<void>;
}

export function createSessionAuthService(
  login: (mobileNationalNumber: string) => Promise<void>,
): AuthService {
  return {
    establishSession: (mobileNationalNumber) => login(mobileNationalNumber),
  };
}
