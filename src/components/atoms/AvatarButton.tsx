import type { ReactNode } from 'react';
import type { PressableProps } from 'react-native';

import { IconButton } from '@/components/atoms/IconButton';
import { cn } from '@/utils/cn';

type Props = Omit<PressableProps, 'children'> & {
  accessibilityLabel: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
};

/** Profile / account affordance — shared glass chrome and tactile press with {@link IconButton}. */
export function AvatarButton({
  accessibilityLabel,
  disabled = false,
  className,
  children,
  ...rest
}: Props) {
  return (
    <IconButton
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      className={cn('self-end', className)}
      {...rest}
    >
      {children}
    </IconButton>
  );
}
