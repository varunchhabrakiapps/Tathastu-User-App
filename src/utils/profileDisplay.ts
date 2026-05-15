/**
 * Pure helpers for profile surfaces — initials and formatting stay testable without RN.
 */

/** Up to two graphemes for avatarGlyph hint when trimming multi-byte scripts. */
export function initialsFromDisplayName(displayName: string): string {
  const trimmed = displayName.trim();
  if (!trimmed) {
    return '•';
  }

  const segments = trimmed.split(/\s+/).filter(Boolean);
  if (segments.length >= 2) {
    const first = segments[0]?.charAt(0) ?? '';
    const last = segments[segments.length - 1]?.charAt(0) ?? '';
    return (first + last).toUpperCase();
  }

  const compact = trimmed.replace(/\s+/g, '');
  const slice = compact.slice(0, 2);
  return slice.toUpperCase();
}
