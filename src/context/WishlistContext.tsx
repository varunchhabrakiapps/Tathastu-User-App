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

import type { TrendingRitualId } from '@/domain/trendingRitual';
import { isTrendingRitualId } from '@/domain/trendingRitual';

const STORAGE_KEY = '@tathastu/wishlist-ritual-ids';

type WishlistContextValue = {
  isReady: boolean;
  wishlistIds: ReadonlySet<TrendingRitualId>;
  isWishlisted: (ritualId: string) => boolean;
  toggleWishlist: (ritualId: TrendingRitualId) => Promise<void>;
  wishlistCount: number;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

function parseStoredIds(raw: string | null): TrendingRitualId[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is TrendingRitualId => typeof id === 'string' && isTrendingRitualId(id));
  } catch {
    return [];
  }
}

async function readWishlist(): Promise<TrendingRitualId[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return parseStoredIds(raw);
}

async function writeWishlist(ids: TrendingRitualId[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function WishlistProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<ReadonlySet<TrendingRitualId>>(new Set());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ids = await readWishlist();
      if (!cancelled) {
        setWishlistIds(new Set(ids));
        setIsReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const isWishlisted = useCallback(
    (ritualId: string) => isTrendingRitualId(ritualId) && wishlistIds.has(ritualId),
    [wishlistIds],
  );

  const toggleWishlist = useCallback(async (ritualId: TrendingRitualId) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(ritualId)) {
        next.delete(ritualId);
      } else {
        next.add(ritualId);
      }
      void writeWishlist([...next]);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      isReady,
      wishlistIds,
      isWishlisted,
      toggleWishlist,
      wishlistCount: wishlistIds.size,
    }),
    [isReady, wishlistIds, isWishlisted, toggleWishlist],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return ctx;
}
