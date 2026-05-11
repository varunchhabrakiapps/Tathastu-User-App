import {
  parsePhoneNumber,
  type CountryCode,
} from 'libphonenumber-js/max';

/** Matches login UI country prefix (+91). Swap when supporting multi-country sign-in. */
export const LOGIN_PHONE_REGION: CountryCode = 'IN';

/** Strip non-digits (defensive, e.g. pasted separators). */
export function normalizeMobileDigits(raw: string): string {
  return raw.replace(/\D/g, '');
}

/**
 * National mobile digits for the login field (country prefix shown separately).
 * Supports pasted `+91` / `91` before the subscriber number.
 */
export function normalizeLoginMobileDigits(raw: string): string {
  let d = normalizeMobileDigits(raw);
  if (d.startsWith('91') && d.length >= 12) {
    d = d.slice(2, 12);
  } else {
    d = d.slice(0, 10);
  }
  return d;
}

/** Valid national mobile for {@link LOGIN_PHONE_REGION} (libphonenumber + mobile line types only). */
export function isValidLoginMobileNumber(digits: string): boolean {
  if (!digits) {
    return false;
  }
  try {
    const parsed = parsePhoneNumber(digits, LOGIN_PHONE_REGION);
    if (!parsed.isValid()) {
      return false;
    }
    const lineType = parsed.getType();
    return (
      lineType === 'MOBILE' || lineType === 'FIXED_LINE_OR_MOBILE'
    );
  } catch {
    return false;
  }
}
