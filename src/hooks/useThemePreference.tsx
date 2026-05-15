import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

const STORAGE_KEY = '@tathastu/theme-preference';

export type ThemePreference = 'light' | 'dark' | 'system';

type ThemePreferenceContextValue = {
  /** Storage hydration finished; `preference` matches persisted value. */
  isReady: boolean;
  preference: ThemePreference;
  /** Effective light/dark for the current preference and OS setting. */
  resolvedScheme: 'light' | 'dark';
  setPreference: (next: ThemePreference) => Promise<void>;
};

const ThemePreferenceContext = createContext<ThemePreferenceContextValue | null>(null);

export function ThemePreferenceProvider({ children }: PropsWithChildren) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [preference, setPreferenceState] = useState<ThemePreference>('system');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        const next: ThemePreference =
          raw === 'light' || raw === 'dark' || raw === 'system' ? raw : 'system';
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
    async (next: ThemePreference) => {
      setPreferenceState(next);
      setColorScheme(next);
      try {
        await AsyncStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore persistence errors */
      }
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
