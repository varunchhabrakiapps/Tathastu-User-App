import { useColorScheme } from 'nativewind';
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import {
  coerceThemePreference,
  defaultThemePreference,
  loadThemePreference,
  persistThemePreference,
  type ThemePreference,
} from '@/services/themePreferenceStorage';

export type { ThemePreference };

type ThemePreferenceContextValue = {
  /** AsyncStorage hydrate completed; NativeWind reflects `preference`. */
  isReady: boolean;
  preference: ThemePreference;
  /** Effective light/dark for the current preference and OS setting. */
  resolvedScheme: 'light' | 'dark';
  setPreference: (next: ThemePreference) => void;
};

const ThemePreferenceContext = createContext<ThemePreferenceContextValue | null>(null);

export function ThemePreferenceProvider({ children }: PropsWithChildren) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [preference, setPreferenceState] = useState<ThemePreference>(() => defaultThemePreference());
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const stored = await loadThemePreference();
        const next = coerceThemePreference(stored);
        if (!cancelled) {
          setPreferenceState(next);
          setColorScheme(next);
        }
      } finally {
        if (!cancelled) {
          setIsReady(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [setColorScheme]);

  const setPreference = useCallback(
    (next: ThemePreference) => {
      setPreferenceState(next);
      setColorScheme(next);
      void persistThemePreference(next);
    },
    [setColorScheme],
  );

  const resolvedScheme: 'light' | 'dark' = colorScheme === 'dark' ? 'dark' : 'light';

  const value = useMemo(
    () => ({
      isReady,
      preference,
      resolvedScheme,
      setPreference,
    }),
    [isReady, preference, resolvedScheme, setPreference],
  );

  return (
    <ThemePreferenceContext.Provider value={value}>{children}</ThemePreferenceContext.Provider>
  );
}

export function useThemePreference(): ThemePreferenceContextValue {
  const ctx = useContext(ThemePreferenceContext);
  if (!ctx) {
    throw new Error('useThemePreference must be used within ThemePreferenceProvider');
  }
  return ctx;
}
