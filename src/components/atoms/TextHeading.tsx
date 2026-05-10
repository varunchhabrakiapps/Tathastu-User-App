import type { PropsWithChildren } from 'react';
import { Text, type TextProps } from 'react-native';

import { cn } from '@/utils/cn';

type Props = PropsWithChildren<
  Pick<TextProps, 'accessibilityLabel' | 'testID'>
> & { className?: string };

/** Primary heading for tab/feature screens — always themed for light/dark. */
export function TextHeading({
  children,
  className,
  accessibilityLabel,
  testID,
}: Props) {
  return (
    <Text
      accessibilityRole="header"
      accessibilityLabel={accessibilityLabel ?? (typeof children === 'string' ? children : undefined)}
      testID={testID}
      className={cn(
        'text-center text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50',
        className,
      )}
    >
      {children}
    </Text>
  );
}
