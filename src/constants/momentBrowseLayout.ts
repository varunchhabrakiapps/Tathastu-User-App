import { authScreen } from '@/theme/tokens';

/** Horizontal moment strip — partial peek past the padded rail (aligned with trending carousel rhythm). */
export const MOMENT_STRIP_PEEK_PX = 26;

/** Between chips — same tactile gap as trending tiles. */
export const MOMENT_CHIP_GAP = 11;

/** Chip width clamps — roomy enough for two-line copy without ellipsis storms. */
export const MOMENT_CHIP_WIDTH_FRACTION = 0.4;
export const MOMENT_CHIP_WIDTH_MIN = 128;
export const MOMENT_CHIP_WIDTH_MAX = 158;

export function momentBrowseChipWidth(windowWidth: number): number {
  return Math.round(
    Math.min(
      MOMENT_CHIP_WIDTH_MAX,
      Math.max(MOMENT_CHIP_WIDTH_MIN, windowWidth * MOMENT_CHIP_WIDTH_FRACTION),
    ),
  );
}

export const momentBrowseContentPadding = {
  paddingLeft: authScreen.insetX,
  paddingRight: authScreen.insetX + MOMENT_STRIP_PEEK_PX,
  paddingVertical: 10,
} as const;
