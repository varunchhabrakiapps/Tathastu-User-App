import type { PropsWithChildren } from 'react';
import { Text, type TextProps } from 'react-native';

import { cn } from '@/utils/cn';

type Props = PropsWithChildren<
  Pick<TextProps, 'accessibilityLabel' | 'testID'>
> & { className?: string; centered?: boolean };

/** Secondary copy — semantic muted ink; default centered under tab titles. */
export function TextMuted({
  children,
  className,
  centered = true,
  accessibilityLabel,
  testID,
}: Props) {
  return (
    <Text
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      className={cn(
        'text-base leading-snug text-ink-muted dark:text-ink-muted-ondark',
        centered ? 'mt-3 max-w-sm text-center' : 'mt-1 max-w-none text-left',
        className,
      )}
    >
      {children}
    </Text>
  );
}
