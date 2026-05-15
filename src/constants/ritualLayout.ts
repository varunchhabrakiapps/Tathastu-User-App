import { radii } from '@/theme/tokens';

/** Shared ritual chrome — matches `RitualPrimaryButton` + `radii.ritualLg`. */
export const RITUAL_CORNER_RADIUS = radii.ritualLg;

/** Tighter rounding for dense reel previews (horizontal strip). */
export const HOME_RITUAL_PREVIEW_CORNER_RADIUS = radii.lg;

/** Home trending carousel — partial next card visible past the padded rail. */
export const HOME_RITUAL_CARD_PEEK_PX = 22;

/** Reel-strip tile width clamps as a fraction of the window — fits ~3 previews + peek on phones. */
export const HOME_RITUAL_PREVIEW_WIDTH_FRACTION = 0.296;
export const HOME_RITUAL_PREVIEW_WIDTH_MIN = 102;
export const HOME_RITUAL_PREVIEW_WIDTH_MAX = 126;

/**
 * Portrait reel preview — height from width (9∶16), capped so the strip stays glanceable.
 */
export const HOME_RITUAL_REEL_MAX_HEIGHT = 186;

/** 9∶16 portrait preview — width → height before cap (`resizeMode: cover` inside). */
export function trendingReelTileHeight(cardWidth: number): number {
  const uncapped = (cardWidth * 16) / 9;
  return Math.round(Math.min(uncapped, HOME_RITUAL_REEL_MAX_HEIGHT));
}

export function trendingPreviewCardWidth(windowWidth: number): number {
  return Math.round(
    Math.min(
      HOME_RITUAL_PREVIEW_WIDTH_MAX,
      Math.max(HOME_RITUAL_PREVIEW_WIDTH_MIN, windowWidth * HOME_RITUAL_PREVIEW_WIDTH_FRACTION),
    ),
  );
}

/** Between carousel tiles — tight strip rhythm. */
export const HOME_RITUAL_CARD_GAP = 10;
