import { useCallback, useEffect, useMemo } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  type WithSpringConfig,
} from 'react-native-reanimated';

import { EXPLORE_SORT_SHEET_MOTION as MOTION } from '@/constants/exploreSortSheetMotion';

type Params = {
  isOpen: boolean;
  onDismissComplete: () => void;
};

/** Drag + enter/exit motion for the explore sort bottom sheet. */
export function useExploreSortSheetMotion({ isOpen, onDismissComplete }: Params) {
  const progress = useSharedValue(0);
  const dragY = useSharedValue(0);

  useEffect(() => {
    if (isOpen) {
      dragY.value = 0;
      progress.value = withTiming(1, {
        duration: MOTION.openDurationMs,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [isOpen, progress, dragY]);

  const close = useCallback(() => {
    progress.value = withTiming(0, {
      duration: MOTION.closeDurationMs,
      easing: Easing.in(Easing.cubic),
    });
    dragY.value = withTiming(
      MOTION.programmaticCloseOffset,
      { duration: MOTION.closeDurationMs, easing: Easing.in(Easing.cubic) },
      (finished) => {
        if (finished) runOnJS(onDismissComplete)();
      },
    );
  }, [progress, dragY, onDismissComplete]);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetY(6)
        .onUpdate((event) => {
          dragY.value = Math.max(0, event.translationY);
        })
        .onEnd((event) => {
          const shouldDismiss =
            event.translationY > MOTION.dismissDistance || event.velocityY > MOTION.dismissVelocity;

          if (shouldDismiss) {
            progress.value = withTiming(0, {
              duration: MOTION.dismissDurationMs,
              easing: Easing.in(Easing.cubic),
            });
            dragY.value = withTiming(
              event.translationY + MOTION.dismissFlingExtra,
              { duration: MOTION.dismissDurationMs, easing: Easing.in(Easing.cubic) },
              (finished) => {
                if (finished) runOnJS(onDismissComplete)();
              },
            );
            return;
          }

          dragY.value = withSpring(0, MOTION.snapBackSpring as WithSpringConfig);
        }),
    [progress, dragY, onDismissComplete],
  );

  const backdropStyle = useAnimatedStyle(() => {
    const openOpacity = progress.value * MOTION.backdropMaxOpacity;
    const dragFade = interpolate(
      dragY.value,
      [0, MOTION.backdropFadeRange],
      [1, MOTION.backdropMinOpacity / MOTION.backdropMaxOpacity],
      Extrapolation.CLAMP,
    );
    return { opacity: openOpacity * dragFade };
  });

  const sheetStyle = useAnimatedStyle(() => {
    const openTranslate = (1 - progress.value) * MOTION.programmaticCloseOffset;
    return {
      transform: [{ translateY: openTranslate + dragY.value }],
    };
  });

  return {
    panGesture,
    backdropStyle,
    sheetStyle,
    close,
  };
}
