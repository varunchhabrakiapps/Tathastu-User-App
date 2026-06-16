/** Quick-preview sheet motion — tune drag/dismiss feel in one place. */
export const QUICK_PREVIEW_MOTION = {
  /** Downward drag past this distance triggers dismiss (logical px). */
  dismissDistance: 100,
  /** Fast downward fling velocity that dismisses even below {@link dismissDistance}. */
  dismissVelocity: 750,
  /** Extra travel after release so the card clears the viewport. */
  dismissFlingExtra: 280,
  /** Programmatic close nudge (tap scrim / ×). */
  programmaticCloseOffset: 48,

  /** Enter animation — card rises and grows into place. */
  openDurationMs: 260,
  openTranslateY: 36,
  openInitialScale: 0.9,

  /** Exit animation — card shrinks and drops away. */
  closeDurationMs: 200,
  dismissDurationMs: 220,

  /** Drag coupling — card scales down and fades as the finger pulls. */
  dragScaleRange: 300,
  minScaleWhileDragging: 0.86,
  dragOpacityRange: 220,
  maxOpacityDropWhileDragging: 0.38,
  backdropFadeRange: 260,
  backdropMinOpacity: 0.1,

  /** Snap-back when the gesture is cancelled. */
  snapBackSpring: {
    damping: 22,
    stiffness: 320,
    mass: 0.75,
  },

  dragHandleWidth: 40,
  dragHandleHeight: 4,
} as const;
