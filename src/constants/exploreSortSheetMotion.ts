/** Explore sort bottom sheet — drag/dismiss tuning in one place. */
export const EXPLORE_SORT_SHEET_MOTION = {
  dismissDistance: 72,
  dismissVelocity: 650,
  dismissFlingExtra: 220,
  programmaticCloseOffset: 320,

  openDurationMs: 260,
  closeDurationMs: 200,
  dismissDurationMs: 220,

  backdropFadeRange: 220,
  backdropMinOpacity: 0.08,
  backdropMaxOpacity: 0.55,

  snapBackSpring: {
    damping: 22,
    stiffness: 320,
    mass: 0.75,
  },
} as const;
