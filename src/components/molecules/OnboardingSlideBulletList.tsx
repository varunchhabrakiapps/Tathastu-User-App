import { memo } from 'react';
import { Text, View } from 'react-native';

type Props = {
  items: string[];
};

/**
 * Scannable bullet list for onboarding (accent marker + muted body — Tailwind only).
 */
export const OnboardingSlideBulletList = memo(function OnboardingSlideBulletList({
  items,
}: Props) {
  if (items.length === 0) {
    return null;
  }

  return (
    <View className="mt-1 gap-3 self-stretch">
      {items.map((line, i) => (
        <View key={`${i}-${line.slice(0, 12)}`} className="flex-row gap-3">
          <View className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent dark:bg-accent-dark" />
          <Text className="flex-1 text-left text-[15px] leading-snug text-ink-muted dark:text-ink-muted-ondark">
            {line}
          </Text>
        </View>
      ))}
    </View>
  );
});
