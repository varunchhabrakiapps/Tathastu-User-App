import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@tathastu/theme-preference';

export type ThemePreference = 'light' | 'dark' | 'system';

/**
 * Persisted user choice for appearance. When missing or unreadable,
 * callers should fall back to `system`.
 */
export async function loadThemePreference(): Promise<ThemePreference | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return parseThemePreference(raw);
  } catch {
    return null;
  }
}

export async function persistThemePreference(preference: ThemePreference): Promise<boolean> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, preference);
    return true;
  } catch {
    return false;
  }
}

/** Default when nothing is stored yet — track OS appearance. */
export function defaultThemePreference(): ThemePreference {
  return 'system';
}

export function coerceThemePreference(loaded: ThemePreference | null): ThemePreference {
  return loaded ?? defaultThemePreference();
}

function parseThemePreference(raw: string | null): ThemePreference | null {
  if (raw === 'light' || raw === 'dark' || raw === 'system') {
    return raw;
  }
  return null;
}
