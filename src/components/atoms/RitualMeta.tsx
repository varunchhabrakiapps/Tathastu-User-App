import type { PropsWithChildren } from 'react';
import { Text } from 'react-native';

import { cn } from '@/utils/cn';

type Props = PropsWithChildren<{
  className?: string;
  accessibilityLabel?: string;
}>;

/** Whisper-weight ritual metadata — social proof without growth UI. */
export function RitualMeta({ children, className, accessibilityLabel }: Props) {
  return (
    <Text
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel}
      numberOfLines={2}
      className={cn(
        'font-normal text-[11px] leading-[15px] tracking-[0.01em] text-ritual-inkMuted dark:text-ritual-inkMuted-dark',
        className,
      )}
    >
      {children}
    </Text>
  );
}
