import { memo } from 'react';
import type { PressableProps } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { IconButton } from '@/components/atoms/IconButton';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

type Props = Omit<PressableProps, 'children'> & {
  accessibilityLabel: string;
  /** Ghost glass + light icon over imagery; chrome + ink on solid canvases. */
  onHero?: boolean;
  className?: string;
};

/**
 * Shared dismiss (×) control — {@link IconButton} wrapping {@link LiquidGlassMaterial}.
 *
 * Material stack (no extra UI package at this layer):
 * - iOS (supported): native glass via `@callstack/liquid-glass`
 * - iOS / Android fallback: `@react-native-community/blur`
 * - Other: solid themed surface from `LiquidGlassMaterial`
 *
 * Place **outside** `overflow-hidden` ancestors so blur can sample the backdrop.
 */
export const GlassDismissButton = memo(function GlassDismissButton({
  accessibilityLabel,
  onHero = true,
  className,
  disabled,
  onPress,
  ...rest
}: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const k = isDark ? 'dark' : 'light';

  const iconColor = onHero
    ? hexToRgba('#FFFFFF', isDark ? 0.92 : 0.95)
    : hexToRgba(paletteHex.ritual.ink[k], isDark ? 0.78 : 0.82);

  return (
    <IconButton
      accessibilityLabel={accessibilityLabel}
      glassVariant={onHero ? 'ghost' : 'chrome'}
      className={cn(className)}
      disabled={disabled ?? undefined}
      onPress={onPress}
      {...rest}
    >
      <FontAwesome name="times" size={16} color={iconColor} importantForAccessibility="no" />
    </IconButton>
  );
});
