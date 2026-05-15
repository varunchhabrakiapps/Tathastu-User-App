import { Text, View } from 'react-native';

import { RitualDetailCard } from '@/components/ritual-detail/molecules/RitualDetailCard';
import { RitualDetailSectionHeader } from '@/components/ritual-detail/molecules/RitualDetailSectionHeader';

type Props = {
  eyebrow: string;
  lines: string[];
};

/** “What you receive” checklist — editorial bullets inside ritual card chrome. */
export function RitualDetailDeliverables({ eyebrow, lines }: Props) {
  if (lines.length === 0) return null;

  return (
    <RitualDetailSectionHeader eyebrow={eyebrow}>
      <RitualDetailCard className="gap-3">
        {lines.map((line, index) => (
          <View
            key={`${index}-${line.slice(0, 24)}`}
            className="flex-row items-start gap-3"
          >
            <View className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ritual-primary dark:bg-ritual-primary-dark" />
            <Text className="flex-1 text-login-body leading-relaxed text-ritual-ink dark:text-ritual-ink-dark">
              {line}
            </Text>
          </View>
        ))}
      </RitualDetailCard>
    </RitualDetailSectionHeader>
  );
}
