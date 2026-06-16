/** Explore catalog list row — square ritual thumb beside copy stack. */
export const EXPLORE_RITUAL_THUMB_SIZE = 92;

export const EXPLORE_RITUAL_ROW_GAP = 14;

export const EXPLORE_MOMENT_FILTER_CHIP_GAP = 8;

/**
 * Catalog feed paging — tuned so the static dataset still demonstrates real
 * "load more" mechanics. Swap {@link createLocalPageFetcher} for an API page
 * fetcher and only this page size needs to follow the backend contract.
 */
export const EXPLORE_FEED_PAGE_SIZE = 4;

/** Simulated network latency so loading/skeleton states read as production-real. */
export const EXPLORE_FEED_INITIAL_DELAY_MS = 360;
export const EXPLORE_FEED_PAGE_DELAY_MS = 620;

/** First-paint skeleton rows shown while page one resolves. */
export const EXPLORE_SKELETON_ROW_COUNT = 6;

/** Quick-preview sheet — centered card sizing. */
export const RITUAL_PREVIEW_MAX_WIDTH = 420;
/** Matches modal card rounding — same glass language as {@link RitualDetailCard}. */
export const RITUAL_PREVIEW_CORNER_RADIUS = 26;
/** Cap total card height so body scrolls instead of bleeding over the hero. */
export const RITUAL_PREVIEW_MAX_HEIGHT_FRACTION = 0.84;
/** Shorter hero — glanceable cover, not a full reel tile. */
export const RITUAL_PREVIEW_COVER_RATIO = 0.46;
export const RITUAL_PREVIEW_COVER_MAX_HEIGHT = 168;
/** Fixed chrome heights — used to bound the scroll region inside the preview card. */
export const RITUAL_PREVIEW_HANDLE_HEIGHT = 28;
export const RITUAL_PREVIEW_FOOTER_HEIGHT = 136;
