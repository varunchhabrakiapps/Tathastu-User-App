import type { PropsWithChildren } from 'react';
import { Text } from 'react-native';
import { useColorScheme } from 'nativewind';

import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

type Props = PropsWithChildren<{ className?: string; accessibilityLabel: string }>;

/** Quiet editorial wordmark beside the flame mark — not a billboard. */
export function BrandWordmark({ className, accessibilityLabel, children }: Props) {
  const { colorScheme } = useColorScheme();
  const key = colorScheme === 'dark' ? 'dark' : 'light';

  return (
    <Text
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel}
      numberOfLines={1}
      style={{ color: paletteHex.ritual.ink[key] }}
      className={cn(
        'flex-shrink pt-px text-[15px] font-semibold tracking-[-0.02em]',
        className,
      )}
    >
      {children}
    </Text>
  );
}
