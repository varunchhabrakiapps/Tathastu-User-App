import { Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { RitualDetailCard } from '@/components/ritual-detail/molecules/RitualDetailCard';
import { RitualDetailSectionHeader } from '@/components/ritual-detail/molecules/RitualDetailSectionHeader';

import { paletteHex } from '@/theme/palette';

type Props = {
  eyebrow: string;
  lines: string[];
};

/** “What you receive” — teal check marks echo app `accent`, calmer than orange dots. */
export function RitualDetailDeliverables({ eyebrow, lines }: Props) {
  const { colorScheme } = useColorScheme();
  const checkColor = paletteHex.accent[colorScheme === 'dark' ? 'dark' : 'light'];

  if (lines.length === 0) return null;

  return (
    <RitualDetailSectionHeader eyebrow={eyebrow}>
      <RitualDetailCard className="gap-3">
        {lines.map((line, index) => (
          <View
            key={`${index}-${line.slice(0, 28)}`}
            className="flex-row items-start gap-3"
          >
            <View className="mt-0.5 h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ritual-surface/95 dark:bg-ritual-surface-dark/90">
              <FontAwesome name="check" size={11} color={checkColor} />
            </View>
            <Text className="flex-1 text-[15px] leading-[23px] text-ritual-ink dark:text-ritual-ink-dark">
              {line}
            </Text>
          </View>
        ))}
      </RitualDetailCard>
    </RitualDetailSectionHeader>
  );
}
