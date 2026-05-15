import { Pressable, Text } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';

import { cn } from '@/utils/cn';

type Props = {
  label: string;
  onPress: () => void;
  isLast?: boolean;
  accessibilityHint?: string;
};

/** Ritual-profile nav row — chevron tint matches home/header chrome. */
export function ProfileNavRow({ label, onPress, isLast, accessibilityHint }: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const glyph = hexToRgba(
    paletteHex.ritual.inkMuted[isDark ? 'dark' : 'light'],
    isDark ? 0.72 : 0.65,
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      onPress={onPress}
      className={cn(
        'flex-row items-center justify-between px-4 py-3.5 active:bg-ritual-surfaceSecondary/70 dark:active:bg-ritual-surfaceSecondary-dark/55',
        !isLast && 'border-b border-ritual-borderSoft dark:border-ritual-borderSoft-dark',
      )}
    >
      <Text className="text-login-body text-ritual-ink dark:text-ritual-ink-dark">{label}</Text>
      <FontAwesome name="chevron-right" size={13} color={glyph} />
    </Pressable>
  );
}
