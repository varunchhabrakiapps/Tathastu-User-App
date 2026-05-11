import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { TathastuMark } from '@/components/atoms/TathastuMark';

type Props = {
  eyebrowMarketing: string;
  brandName: string;
  tagline: string;
  stepLabel: string;
};

/**
 * Top story: editorial rhythm, mark + wordmark lockup, calm progress (“brand header” strip).
 */
export function BrandHeader({
  eyebrowMarketing,
  brandName,
  tagline,
  stepLabel,
}: Props) {
  const { t } = useTranslation();

  return (
    <View className="mb-1 gap-3">
      <View className="flex-row items-center justify-between gap-3">
        <View className="shrink-0 rounded-full bg-ritual-surfaceSecondary/55 px-3 py-2 dark:bg-ritual-surfaceSecondary-dark/38">
          <Text
            accessibilityRole="text"
            className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ritual-inkMuted dark:text-ritual-inkMuted-dark"
          >
            {eyebrowMarketing}
          </Text>
        </View>
        <Text
          accessibilityRole="text"
          accessibilityLiveRegion="polite"
          className="shrink-0 text-[11px] font-medium tabular-nums tracking-[0.06em] text-ritual-inkMuted/90 dark:text-ritual-inkMuted-dark/90"
        >
          {stepLabel}
        </Text>
      </View>

      <View className="flex-row items-start gap-3.5">
        <TathastuMark
          accessibilityLabel={t('screens.onboarding.brandMarkA11y')}
        />
        <View className="min-w-0 flex-1 gap-1.5 pt-0.5">
          <Text
            accessibilityRole="header"
            className="text-[26px] font-medium leading-[32px] tracking-[-0.02em] text-ritual-ink dark:text-ritual-ink-dark"
          >
            {brandName}
          </Text>
          <Text
            accessibilityRole="text"
            numberOfLines={2}
            className="max-w-[17.5rem] text-[15px] font-normal leading-[22px] text-ritual-inkMuted/92 dark:text-ritual-inkMuted-dark/92"
          >
            {tagline}
          </Text>
        </View>
      </View>
    </View>
  );
}
