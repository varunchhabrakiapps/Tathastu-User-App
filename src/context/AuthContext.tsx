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
import type { UserLocation } from '@/domain/location';
import { hasUserLocation } from '@/domain/location';
import {
  clearUserLocation,
  loadUserLocation,
  persistUserLocation,
} from '@/services/location/userLocationStorage';

const STORAGE_KEY = '@tathastu/auth-session';

export type AuthUser = {
  mobileNumber: string;
  /** Optional display name once profile/API provides it — persisted separately later. */
  displayName?: string;
  /** Service area captured during sign-in. */
  location?: UserLocation;
};

type PersistedSession = {
  isLoggedIn: boolean;
  user: AuthUser | null;
};

/** Editable subset of the profile — extend as richer fields (birth details, etc.) ship. */
export type AuthProfilePatch = {
  /** Trimmed display name; empty/blank clears it so greetings fall back gracefully. */
  displayName?: string;
};

type AuthContextValue = {
  /** Hydration finished — safe to render gated UI. */
  isReady: boolean;
  isLoggedIn: boolean;
  /** True once the signed-in user has chosen a service area. */
  hasLocation: boolean;
  user: AuthUser | null;
  login: (mobileNumber: string) => Promise<void>;
  logout: () => Promise<void>;
  /** Persist the user's service area (no-op when signed out). */
  setLocation: (location: UserLocation) => Promise<void>;
  /** Patch + persist the signed-in profile (no-op when signed out). */
  updateProfile: (patch: AuthProfilePatch) => Promise<void>;
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
      const storedLocation = await loadUserLocation();

      if (!cancelled && session?.isLoggedIn && session.user) {
        const location = storedLocation ?? session.user.location ?? undefined;
        const nextUser: AuthUser = {
          ...session.user,
          ...(location ? { location } : {}),
        };

        if (location && !storedLocation) {
          await persistUserLocation(location);
        }

        setIsLoggedIn(true);
        setUser(nextUser);
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

  const setLocation = useCallback(
    async (location: UserLocation) => {
      if (!user) {
        return;
      }
      await persistUserLocation(location);
      const nextUser: AuthUser = { ...user, location };
      await writeSession({ isLoggedIn: true, user: nextUser });
      setUser(nextUser);
    },
    [user],
  );

  const logout = useCallback(async () => {
    await clearUserLocation();
    await clearSession();
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  const updateProfile = useCallback(
    async (patch: AuthProfilePatch) => {
      if (!user) {
        return;
      }
      const trimmedName = patch.displayName?.trim();
      const nextUser: AuthUser = {
        ...user,
        displayName: trimmedName ? trimmedName : undefined,
      };
      await writeSession({ isLoggedIn: true, user: nextUser });
      setUser(nextUser);
    },
    [user],
  );

  const value = useMemo(
    () => ({
      isReady,
      isLoggedIn,
      hasLocation: hasUserLocation(user?.location),
      user,
      login,
      logout,
      setLocation,
      updateProfile,
    }),
    [isReady, isLoggedIn, user, login, logout, setLocation, updateProfile],
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
