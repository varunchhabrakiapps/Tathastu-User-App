import type { ReactNode } from 'react';
import { memo } from 'react';
import { Text, View } from 'react-native';

import { OnboardingSlideBulletList } from '@/components/molecules/OnboardingSlideBulletList';

type Props = {
  title: string;
  /** Single paragraph when no bullet list. */
  body?: string;
  /** Short line above bullets (clarifies live video, etc.). */
  lead?: string;
  bullets?: string[];
  slideWidth: number;
  illustration: ReactNode;
};

/**
 * One page in the horizontal onboarding pager (semantic ink/surface text).
 */
export const OnboardingSlidePanel = memo(function OnboardingSlidePanel({
  title,
  body,
  lead,
  bullets,
  slideWidth,
  illustration,
}: Props) {
  const hasBullets = (bullets?.length ?? 0) > 0;

  return (
    <View style={{ width: slideWidth }} className="px-5 pb-2 pt-1">
      <View className="w-full max-w-md self-center gap-3">
        {illustration}
        <Text
          accessibilityRole="header"
          className="text-center text-[22px] font-bold leading-snug text-ink dark:text-ink-ondark"
        >
          {title}
        </Text>
        {hasBullets ? (
          <>
            {lead ? (
              <Text className="text-center text-[15px] leading-relaxed text-ink dark:text-ink-ondark">
                {lead}
              </Text>
            ) : null}
            <OnboardingSlideBulletList items={bullets!} />
          </>
        ) : (
          <Text className="text-center text-[15px] leading-relaxed text-ink-muted dark:text-ink-muted-ondark">
            {body}
          </Text>
        )}
      </View>
    </View>
  );
});
