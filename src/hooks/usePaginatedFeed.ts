import { useCallback, useEffect, useRef, useState } from 'react';

/** One page of results from a feed source. */
export type FeedPage<T> = {
  items: T[];
  hasMore: boolean;
};

/** Page fetcher contract — swap a local slice for an API call without touching the hook. */
export type FetchPage<T> = (params: { page: number; pageSize: number }) => Promise<FeedPage<T>>;

type Params<T> = {
  fetchPage: FetchPage<T>;
  pageSize: number;
  /** Serialized inputs (filters, query). Changing this restarts the feed from page zero. */
  resetKey: string;
};

export type PaginatedFeed<T> = {
  items: T[];
  /** First page is loading and nothing is shown yet (drive skeletons off this). */
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  isRefreshing: boolean;
  hasMore: boolean;
  hasError: boolean;
  loadMore: () => void;
  refresh: () => void;
  retry: () => void;
};

/**
 * Generic, source-agnostic pagination state machine for `FlatList`-style feeds.
 *
 * Handles initial load, infinite scroll (`loadMore`), pull-to-refresh, and errors,
 * while guarding against overlapping requests and stale responses when inputs change
 * mid-flight (each request carries a generation token; superseded responses are dropped).
 */
export function usePaginatedFeed<T>({ fetchPage, pageSize, resetKey }: Params<T>): PaginatedFeed<T> {
  const [items, setItems] = useState<T[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Read the latest fetcher without re-running the reset effect on identity change.
  const fetchPageRef = useRef(fetchPage);
  fetchPageRef.current = fetchPage;

  const pageRef = useRef(0);
  const loadingRef = useRef(false);
  const generationRef = useRef(0);

  const loadPage = useCallback(
    async (page: number, generation: number) => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      try {
        const result = await fetchPageRef.current({ page, pageSize });
        if (generation !== generationRef.current) return; // superseded by a newer reset/refresh
        setItems((prev) => (page === 0 ? result.items : [...prev, ...result.items]));
        setHasMore(result.hasMore);
        setHasError(false);
        pageRef.current = page;
      } catch {
        if (generation !== generationRef.current) return;
        setHasError(true);
      } finally {
        // Only the request that still owns the current generation may release the lock
        // and clear loading flags — otherwise a late, stale response could unblock a
        // request that is genuinely in-flight.
        if (generation === generationRef.current) {
          loadingRef.current = false;
          setIsInitialLoading(false);
          setIsLoadingMore(false);
          setIsRefreshing(false);
        }
      }
    },
    [pageSize],
  );

  const restart = useCallback(
    (mode: 'initial' | 'refresh') => {
      const generation = generationRef.current + 1;
      generationRef.current = generation;
      loadingRef.current = false;
      pageRef.current = 0;
      setHasError(false);
      if (mode === 'initial') {
        setItems([]);
        setHasMore(false);
        setIsInitialLoading(true);
        setIsLoadingMore(false);
        setIsRefreshing(false);
      } else {
        setIsRefreshing(true);
      }
      loadPage(0, generation);
    },
    [loadPage],
  );

  useEffect(() => {
    restart('initial');
  }, [resetKey, restart]);

  const loadMore = useCallback(() => {
    if (loadingRef.current || !hasMore || isInitialLoading || hasError) return;
    setIsLoadingMore(true);
    loadPage(pageRef.current + 1, generationRef.current);
  }, [hasMore, isInitialLoading, hasError, loadPage]);

  const refresh = useCallback(() => restart('refresh'), [restart]);

  const retry = useCallback(() => {
    if (loadingRef.current) return;
    if (items.length === 0) {
      restart('initial');
      return;
    }
    setHasError(false);
    setIsLoadingMore(true);
    loadPage(pageRef.current + 1, generationRef.current);
  }, [items.length, restart, loadPage]);

  return {
    items,
    isInitialLoading,
    isLoadingMore,
    isRefreshing,
    hasMore,
    hasError,
    loadMore,
    refresh,
    retry,
  };
}
