import type { PropsWithChildren } from 'react';
import { Text, type TextProps } from 'react-native';

import { cn } from '@/utils/cn';

type Props = PropsWithChildren<
  Pick<TextProps, 'accessibilityLabel' | 'testID'>
> & { className?: string; centered?: boolean };

/** Primary heading — semantic ink; default centered for tab shells. */
export function TextHeading({
  children,
  className,
  centered = true,
  accessibilityLabel,
  testID,
}: Props) {
  return (
    <Text
      accessibilityRole="header"
      accessibilityLabel={accessibilityLabel ?? (typeof children === 'string' ? children : undefined)}
      testID={testID}
      className={cn(
        'text-2xl font-semibold tracking-tight text-ink dark:text-ink-ondark',
        centered ? 'text-center' : 'text-left',
        className,
      )}
    >
      {children}
    </Text>
  );
}
