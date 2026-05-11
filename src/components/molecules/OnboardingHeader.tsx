import { Text, View } from 'react-native';

type Props = {
  eyebrowMarketing: string;
  brandName: string;
  tagline: string;
  stepLabel: string;
};

/**
 * Onboarding top chrome: marketing pill + step on one row, then brand and tagline.
 */
export function OnboardingHeader({
  eyebrowMarketing,
  brandName,
  tagline,
  stepLabel,
}: Props) {
  return (
    <View className="mb-4 gap-3">
      <View className="flex-row items-center justify-between gap-3">
        <View className="max-w-[68%] shrink rounded-full border border-accent/40 bg-accent-soft/55 px-3 py-1.5 dark:border-accent-dark/45 dark:bg-accent-soft-dark/35">
          <Text
            accessibilityRole="text"
            numberOfLines={1}
            className="text-xs font-semibold text-accent dark:text-accent-dark"
          >
            {eyebrowMarketing}
          </Text>
        </View>
        <Text
          accessibilityRole="text"
          className="shrink-0 text-sm font-semibold tabular-nums text-ink-muted dark:text-ink-muted-ondark"
        >
          {stepLabel}
        </Text>
      </View>
      <Text
        accessibilityRole="header"
        className="text-3xl font-bold tracking-tight text-ink dark:text-ink-ondark"
      >
        {brandName}
      </Text>
      <Text className="text-[15px] leading-snug text-ink-muted dark:text-ink-muted-ondark">
        {tagline}
      </Text>
    </View>
  );
}
