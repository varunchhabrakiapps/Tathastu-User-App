import type { ReactNode } from 'react';
import { memo, useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { OnboardingSlideBulletList } from '@/components/molecules/OnboardingSlideBulletList';
import { ONBOARDING_COPY_FOCUS_DURATION_MS } from '@/constants/onboardingLayout';

type Props = {
  title: string;
  /** Single supportive line under the headline (concise). */
  body?: string;
  lead?: string;
  bullets?: string[];
  slideWidth: number;
  illustration: ReactNode;
  isActive: boolean;
};

/**
 * One onboarding deck page: hero-forward layout, ritual typography, calm copy motion.
 */
export const OnboardingSlide = memo(function OnboardingSlide({
  title,
  body,
  lead,
  bullets,
  slideWidth,
  illustration,
  isActive,
}: Props) {
  const hasBullets = (bullets?.length ?? 0) > 0;
  const copyFocus = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    copyFocus.value = withTiming(isActive ? 1 : 0, {
      duration: ONBOARDING_COPY_FOCUS_DURATION_MS,
    });
  }, [copyFocus, isActive]);

  const copyStyle = useAnimatedStyle(() => ({
    opacity: interpolate(copyFocus.value, [0, 1], [0.35, 1]),
    transform: [{ translateY: interpolate(copyFocus.value, [0, 1], [8, 0]) }],
  }));

  return (
    <View style={{ width: slideWidth }} className="px-6">
      <View className="min-h-0 gap-4 pb-1 mt-8">
        <View className="min-h-0 justify-center" accessible={false}>
          {illustration}
        </View>

        <Animated.View style={copyStyle} className="gap-1.5 pb-0.5">
          <Text
            accessibilityRole="header"
            className="text-onboarding-hero font-medium text-ritual-ink dark:text-ritual-ink-dark"
          >
            {title}
          </Text>
          {hasBullets ? (
            <>
              {lead ? (
                <Text className="text-onboarding-body text-ritual-inkMuted/95 dark:text-ritual-inkMuted-dark/95">
                  {lead}
                </Text>
              ) : null}
              <OnboardingSlideBulletList items={bullets!} />
            </>
          ) : body ? (
            <Text className="max-w-[20.5rem] text-onboarding-body text-ritual-inkMuted/94 dark:text-ritual-inkMuted-dark/94">
              {body}
            </Text>
          ) : null}
        </Animated.View>
      </View>
    </View>
  );
});
