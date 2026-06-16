import type { FetchPage } from '@/hooks/usePaginatedFeed';

type Options = {
  /** Latency for the first page (kept short so first paint feels snappy behind a skeleton). */
  initialDelayMs?: number;
  /** Latency for subsequent pages (mimics a real "load more" round-trip). */
  pageDelayMs?: number;
};

/**
 * Builds a {@link FetchPage} that slices an in-memory array into pages with a simulated
 * round-trip. This keeps the pagination contract identical to a server-backed feed, so
 * swapping to a real endpoint later is a one-line change at the call site.
 */
export function createLocalPageFetcher<T>(source: readonly T[], options: Options = {}): FetchPage<T> {
  const initialDelayMs = options.initialDelayMs ?? 0;
  const pageDelayMs = options.pageDelayMs ?? 0;

  return ({ page, pageSize }) =>
    new Promise((resolve) => {
      const start = page * pageSize;
      const items = source.slice(start, start + pageSize);
      const hasMore = start + items.length < source.length;
      const delay = page === 0 ? initialDelayMs : pageDelayMs;
      setTimeout(() => resolve({ items: [...items], hasMore }), delay);
    });
}
