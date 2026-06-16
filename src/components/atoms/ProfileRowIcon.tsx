import { memo, type ComponentProps } from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';

import { useRitualSemanticColors } from '@/hooks/useRitualSemanticColors';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';

export type ProfileRowIconGlyph = ComponentProps<typeof FontAwesome>['name'];
export type ProfileRowIconTone = 'default' | 'destructive';

type Props = {
  name: ProfileRowIconGlyph;
  tone?: ProfileRowIconTone;
};

/**
 * Calm leading glyph for profile rows — soft warm tile + saffron glyph (destructive variant for sign-out).
 * Quieter than the marketing {@link IconCircle} ring so a full menu stays editorial, not busy.
 */
export const ProfileRowIcon = memo(function ProfileRowIcon({ name, tone = 'default' }: Props) {
  const { isDark, iconTileBg, iconTileDestructiveBg, warmAccent, primary } = useRitualSemanticColors();

  const glyphColor =
    tone === 'destructive'
      ? warmAccent
      : hexToRgba(primary, isDark ? 0.95 : 0.96);

  return (
    <View
      className="h-9 w-9 items-center justify-center rounded-2xl"
      style={{
        backgroundColor: tone === 'destructive' ? iconTileDestructiveBg : iconTileBg,
      }}
    >
      <FontAwesome
        name={name}
        size={16}
        color={glyphColor}
        importantForAccessibility="no-hide-descendants"
      />
    </View>
  );
});
