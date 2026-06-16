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

import { QUICK_PREVIEW_MOTION as MOTION } from '@/constants/quickPreviewMotion';

type Params = {
  /** Sheet should animate in (preview became visible). */
  isOpen: boolean;
  /** Called on the JS thread after the exit animation completes. */
  onDismissComplete: () => void;
};

/**
 * Drag + enter/exit motion for the ritual quick-preview sheet.
 *
 * Keeps gesture handling and Reanimated worklets out of the organism so tuning
 * constants and physics live in one maintainable place.
 */
export function useRitualQuickPreviewSheetMotion({ isOpen, onDismissComplete }: Params) {
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
      easing: Easing.inOut(Easing.cubic),
    });
    dragY.value = withTiming(
      MOTION.programmaticCloseOffset,
      { duration: MOTION.closeDurationMs, easing: Easing.inOut(Easing.cubic) },
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
    const openOpacity = progress.value;
    const dragFade = interpolate(
      dragY.value,
      [0, MOTION.backdropFadeRange],
      [1, MOTION.backdropMinOpacity],
      Extrapolation.CLAMP,
    );
    return { opacity: openOpacity * dragFade };
  });

  const cardStyle = useAnimatedStyle(() => {
    const openTranslate = (1 - progress.value) * MOTION.openTranslateY;
    const openScale = interpolate(
      progress.value,
      [0, 1],
      [MOTION.openInitialScale, 1],
      Extrapolation.CLAMP,
    );
    const dragScale = interpolate(
      dragY.value,
      [0, MOTION.dragScaleRange],
      [1, MOTION.minScaleWhileDragging],
      Extrapolation.CLAMP,
    );
    const dragOpacity = interpolate(
      dragY.value,
      [0, MOTION.dragOpacityRange],
      [1, 1 - MOTION.maxOpacityDropWhileDragging],
      Extrapolation.CLAMP,
    );

    return {
      opacity: progress.value * dragOpacity,
      transform: [
        { translateY: openTranslate + dragY.value },
        { scale: openScale * dragScale },
      ],
    };
  });

  return {
    panGesture,
    backdropStyle,
    cardStyle,
    close,
  };
};
