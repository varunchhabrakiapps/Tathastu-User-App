import type { PropsWithChildren } from 'react';
import { Text } from 'react-native';

import { cn } from '@/utils/cn';

type Props = PropsWithChildren<{ className?: string; accessibilityLabel: string }>;

/** Quiet editorial wordmark beside the flame mark — not a billboard. */
export function BrandWordmark({ className, accessibilityLabel, children }: Props) {
  return (
    <Text
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel}
      numberOfLines={1}
      className={cn(
        'flex-shrink pt-px text-[15px] font-semibold tracking-[-0.02em] text-ritual-ink dark:text-ritual-ink-dark',
        className,
      )}
    >
      {children}
    </Text>
  );
}
