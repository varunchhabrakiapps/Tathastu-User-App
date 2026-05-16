import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { LiquidGlassMaterial } from '@/components/atoms/LiquidGlassMaterial';
import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { cn } from '@/utils/cn';

type Props = PropsWithChildren<{
  className?: string;
  /** Inner content padding — default 16; pass `none` for edge-to-edge media. */
  contentClassName?: string;
}>;

/**
 * Ritual detail slab — {@link LiquidGlassMaterial} chrome (login/OTP glass language, not flat white).
 */
export function RitualDetailCard({
  children,
  className,
  contentClassName,
}: Props) {
  const innerPad =
    contentClassName === 'none' ? '' : cn('px-4 py-4', contentClassName);

  return (
    <LiquidGlassMaterial
      preset="chrome"
      borderRadius={RITUAL_CORNER_RADIUS}
      className="overflow-hidden"
    >
      <View className={cn(innerPad, className)}>{children}</View>
    </LiquidGlassMaterial>
  );
}
