import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { cn } from '@/utils/cn';

type Props = PropsWithChildren<{
  className?: string;
}>;

/**
 * Elevated surface card (semantic border + light shadow); dark mode drops shadow.
 */
export function ElevatedSurfaceCard({ children, className }: Props) {
  return (
    <View
      className={cn(
        'rounded-3xl border border-border bg-surface px-5 py-6 shadow-sm dark:border-border-dark dark:bg-surface-dark dark:shadow-none',
        className,
      )}
    >
      {children}
    </View>
  );
}
