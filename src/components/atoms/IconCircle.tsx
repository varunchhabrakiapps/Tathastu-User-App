import { memo, type ReactNode } from 'react';
import { View } from 'react-native';

import { cn } from '@/utils/cn';

const DEFAULT_DIAMETER = 48;

type Props = {
  accessibilityLabel: string;
  /** Outer diameter in logical pixels. */
  size?: number;
  /** Merged after base ring styles (borders, background, layout). */
  className?: string;
  children: ReactNode;
};

/**
 * Circular badge frame for centered glyphs (Font Awesome, SF symbols via children, etc.).
 */
export const IconCircle = memo(function IconCircle({
  accessibilityLabel,
  size = DEFAULT_DIAMETER,
  className,
  children,
}: Props) {
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
      className={cn(
        'shrink-0 items-center justify-center rounded-full border border-warm-muted/55 bg-warm/18 dark:border-warm-dark/45 dark:bg-warm/22',
        className,
      )}
      style={{ width: size, height: size }}
    >
      {children}
    </View>
  );
});
