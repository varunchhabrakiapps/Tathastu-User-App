import type { ComponentProps, PropsWithChildren } from 'react';
import { memo } from 'react';
import { Pressable } from 'react-native';

import { cn } from '@/utils/cn';

type Props = PropsWithChildren<
  Omit<ComponentProps<typeof Pressable>, 'accessibilityRole'> & {
    accessibilityLabel: string;
    onPress: () => void;
    className?: string;
  }
>;

/** Subtle tappable caption for routed lists — quieter than chrome buttons. */
export const QuietCaptionLink = memo(function QuietCaptionLink({
  accessibilityLabel,
  onPress,
  className,
  children,
  ...rest
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      hitSlop={10}
      className={cn('active:opacity-72', className)}
      {...rest}
    >
      {children}
    </Pressable>
  );
});
