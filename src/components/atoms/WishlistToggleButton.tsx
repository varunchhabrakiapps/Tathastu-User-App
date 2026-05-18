import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { useWishlist } from '@/context/WishlistContext';
import type { TrendingRitualId } from '@/domain/trendingRitual';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { radii } from '@/theme/tokens';

type Props = {
  ritualId: TrendingRitualId;
  ritualTitle: string;
};

export const WishlistToggleButton = memo(function WishlistToggleButton({
  ritualId,
  ritualTitle,
}: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const saved = isWishlisted(ritualId);
  const k = colorScheme === 'dark' ? 'dark' : 'light';

  const onPress = useCallback(() => {
    void toggleWishlist(ritualId);
  }, [ritualId, toggleWishlist]);

  const iconColor = saved
    ? k === 'dark'
      ? paletteHex.warm.dark
      : paletteHex.warm.gold
    : hexToRgba(paletteHex.ritual.inkMuted[k], k === 'dark' ? 0.88 : 0.72);

  const a11yLabel = saved
    ? t('screens.wishlist.removeA11y', { ritual: ritualTitle })
    : t('screens.wishlist.addA11y', { ritual: ritualTitle });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      accessibilityHint={t('screens.wishlist.toggleHint')}
      accessibilityState={{ selected: saved }}
      hitSlop={10}
      onPress={onPress}
      style={({ pressed }) => [
        styles.shell,
        Platform.OS === 'ios' ? styles.shellIos : styles.shellAndroid,
        pressed && styles.pressed,
      ]}
      className="items-center justify-center"
    >
      <FontAwesome
        name={saved ? 'heart' : 'heart-o'}
        size={17}
        color={iconColor}
        importantForAccessibility="no-hide-descendants"
      />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  shell: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
  },
  shellIos: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  shellAndroid: {
    elevation: 0,
  },
  pressed: {
    opacity: 0.88,
  },
});
