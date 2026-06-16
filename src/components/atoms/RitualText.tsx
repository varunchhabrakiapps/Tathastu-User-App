import type { TextProps } from 'react-native';
import { Text } from 'react-native';

import { useRitualSemanticColors } from '@/hooks/useRitualSemanticColors';
import { cn } from '@/utils/cn';

type Variant = 'ink' | 'inkMuted' | 'destructive';

type Props = TextProps & {
  variant?: Variant;
  className?: string;
};

/**
 * Ritual copy with programmatic ink — use anywhere `dark:text-ritual-*-dark` must be reliable
 * (Profile tab, auth slabs, nested stack leaves).
 */
export function RitualText({ variant = 'ink', className, style, ...rest }: Props) {
  const colors = useRitualSemanticColors();
  const color =
    variant === 'inkMuted'
      ? colors.inkMuted
      : variant === 'destructive'
        ? colors.warmAccent
        : colors.ink;

  return (
    <Text
      {...rest}
      style={[{ color }, style]}
      className={cn(variant === 'destructive' && 'font-medium', className)}
    />
  );
}
