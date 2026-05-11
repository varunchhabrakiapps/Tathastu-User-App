import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import {
  isValidLoginMobileNumber,
  normalizeMobileDigits,
} from '@/utils/mobile';

const STORAGE_KEY = '@tathastu/auth-session';

export type AuthUser = {
  mobileNumber: string;
};

type PersistedSession = {
  isLoggedIn: boolean;
  user: AuthUser | null;
};

type AuthContextValue = {
  /** Hydration finished — safe to render gated UI. */
  isReady: boolean;
  isLoggedIn: boolean;
  user: AuthUser | null;
  login: (mobileNumber: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function readSession(): Promise<PersistedSession | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedSession;
    if (
      typeof parsed.isLoggedIn !== 'boolean' ||
      (parsed.user !== null &&
        typeof parsed.user !== 'object') ||
      (parsed.user &&
        typeof parsed.user.mobileNumber !== 'string')
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

async function writeSession(session: PersistedSession): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

async function clearSession(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const session = await readSession();
      if (!cancelled && session?.isLoggedIn && session.user) {
        setIsLoggedIn(true);
        setUser(session.user);
      }
      if (!cancelled) setIsReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (mobileNumber: string) => {
    const digits = normalizeMobileDigits(mobileNumber);
    if (!isValidLoginMobileNumber(digits)) {
      throw new Error('INVALID_MOBILE');
    }
    const nextUser: AuthUser = { mobileNumber: digits };
    const session: PersistedSession = { isLoggedIn: true, user: nextUser };
    await writeSession(session);
    setUser(nextUser);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(async () => {
    await clearSession();
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  const value = useMemo(
    () => ({
      isReady,
      isLoggedIn,
      user,
      login,
      logout,
    }),
    [isReady, isLoggedIn, user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
