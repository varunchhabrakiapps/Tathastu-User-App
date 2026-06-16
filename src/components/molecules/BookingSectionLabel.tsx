import { memo } from 'react';
import { Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { paletteHex } from '@/theme/palette';

type Props = {
  label: string;
  count: number;
};

/** Editorial group divider — tracked uppercase label with a quiet count on the right. */
export const BookingSectionLabel = memo(function BookingSectionLabel({ label, count }: Props) {
  const { colorScheme } = useColorScheme();
  const key = colorScheme === 'dark' ? 'dark' : 'light';
  const color = paletteHex.ritual.inkMuted[key];

  return (
    <View accessibilityRole="header" className="mb-2 mt-5 flex-row items-center justify-between">
      <Text style={{ color }} className="font-semibold uppercase text-login-label">
        {label}
      </Text>
      <Text style={{ color }} className="font-medium text-login-label opacity-70">
        {count}
      </Text>
    </View>
  );
});
