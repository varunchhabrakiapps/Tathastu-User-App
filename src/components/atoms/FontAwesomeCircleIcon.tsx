import { memo, type ComponentProps } from 'react';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { IconCircle } from '@/components/atoms/IconCircle';
import { paletteHex } from '@/theme/palette';

/** Matches `border-amber-50` (warm glyph on dark ring). */
const DEFAULT_GLYPH_ON_DARK = '#fffbeb';

type FontAwesomeGlyph = ComponentProps<typeof FontAwesome>['name'];

type Props = {
  /** Font Awesome 4 glyph name */
  name: FontAwesomeGlyph;
  accessibilityLabel: string;
  /** Outer circle diameter (px). */
  circleSize?: number;
  /** Icon font size; defaults to ~proportion of circle (48 → 22). */
  iconSize?: number;
  /** Skips theme default (warm-deep / light on-dark). */
  iconColor?: string;
  containerClassName?: string;
};

function defaultIconSizeForCircle(circleSize: number): number {
  return Math.max(14, Math.round((circleSize * 22) / 48));
}

/**
 * FA4 glyph centered in the shared ritual “warm ring” circle.
 */
export const FontAwesomeCircleIcon = memo(function FontAwesomeCircleIcon({
  name,
  accessibilityLabel,
  circleSize = 48,
  iconSize,
  iconColor,
  containerClassName,
}: Props) {
  const { colorScheme } = useColorScheme();

  const resolvedIconSize = iconSize ?? defaultIconSizeForCircle(circleSize);

  const resolvedColor =
    iconColor ??
    (colorScheme === 'dark'
      ? DEFAULT_GLYPH_ON_DARK
      : paletteHex.warm.deep);

  return (
    <IconCircle
      accessibilityLabel={accessibilityLabel}
      size={circleSize}
      className={containerClassName}
    >
      <FontAwesome
        name={name}
        size={resolvedIconSize}
        color={resolvedColor}
        importantForAccessibility="no-hide-descendants"
      />
    </IconCircle>
  );
});
