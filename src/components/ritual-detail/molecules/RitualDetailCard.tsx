import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { cn } from '@/utils/cn';

type Props = PropsWithChildren<{
  className?: string;
}>;

/** Bordered ritual surface for prose and step rows on the ritual detail screen. */
export function RitualDetailCard({ children, className }: Props) {
  return (
    <View
      className={cn(
        'rounded-[18px] border border-ritual-borderSoft bg-ritual-surface px-4 py-4 dark:border-ritual-borderSoft-dark dark:bg-ritual-surface-dark',
        className,
      )}
    >
      {children}
    </View>
  );
}
