import type { PropsWithChildren } from 'react';
import { Text, type TextProps } from 'react-native';

import { cn } from '@/utils/cn';

type Props = PropsWithChildren<
  Pick<TextProps, 'accessibilityLabel' | 'testID'>
> & { className?: string };

/** Secondary / supporting copy — muted in both appearances. */
export function TextMuted({
  children,
  className,
  accessibilityLabel,
  testID,
}: Props) {
  return (
    <Text
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      className={cn(
        'mt-3 max-w-xs text-center text-base leading-snug text-slate-600 dark:text-slate-400',
        className,
      )}
    >
      {children}
    </Text>
  );
}
