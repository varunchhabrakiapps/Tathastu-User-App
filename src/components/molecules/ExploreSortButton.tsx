import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

type Props = {
  label: string;
  accessibilityLabel: string;
  active?: boolean;
  onPress: () => void;
};

/** Compact sort affordance — pairs with the moment filter rail. */
export const ExploreSortButton = memo(function ExploreSortButton({
  label,
  accessibilityLabel,
  active = false,
  onPress,
}: Props) {
  const { colorScheme } = useColorScheme();
  const k = colorScheme === 'dark' ? 'dark' : 'light';
  const ink = active ? paletteHex.ritual.primary[k] : paletteHex.ritual.inkMuted[k];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected: active }}
      onPress={onPress}
      className={cn(
        'mr-5 shrink-0 flex-row items-center gap-1.5 rounded-full border px-3 py-2 active:opacity-90',
        active
          ? 'border-ritual-primary/35 bg-ritual-primary/12 dark:border-ritual-primary-dark/40 dark:bg-ritual-primary-dark/18'
          : 'border-ritual-borderSoft bg-ritual-surface/70 dark:border-ritual-borderSoft-dark dark:bg-ritual-surface-dark/65',
      )}
    >
      <FontAwesome name="sort" size={12} color={ink} importantForAccessibility="no" />
      <Text style={{ color: ink }} className="font-medium text-[12px] leading-[16px]">
        {label}
      </Text>
      <View pointerEvents="none">
        <FontAwesome name="caret-down" size={10} color={ink} importantForAccessibility="no" />
      </View>
    </Pressable>
  );
});
