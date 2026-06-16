import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';

import { useUserLocationLabel } from '@/hooks/useUserLocationLabel';
import { useRitualSemanticColors } from '@/hooks/useRitualSemanticColors';

type Props = {
  accessibilityLabelKey?: 'screens.home.locationA11y' | 'screens.profile.locationA11y';
};

/**
 * Compact service-area chip for tab chrome — map pin, truncated label, caret hint.
 * Pairs visually with {@link ExploreSortButton} on the Explore rail.
 */
export const LocationHeaderChip = memo(function LocationHeaderChip({
  accessibilityLabelKey = 'screens.home.locationA11y',
}: Props) {
  const { t } = useTranslation();
  const label = useUserLocationLabel();
  const { inkMuted } = useRitualSemanticColors();

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={t(accessibilityLabelKey, { location: label })}
      className="max-w-full shrink flex-row items-center gap-1.5 self-start rounded-full border border-ritual-borderSoft bg-ritual-surface/70 px-3 py-2 dark:border-ritual-borderSoft-dark dark:bg-ritual-surface-dark/65"
    >
      <FontAwesome
        name="map-marker"
        size={12}
        color={inkMuted}
        importantForAccessibility="no-hide-descendants"
      />
      <Text
        numberOfLines={1}
        style={{ color: inkMuted }}
        className="max-w-[220px] shrink font-medium text-[12px] leading-[16px]"
      >
        {label}
      </Text>
      <View pointerEvents="none">
        <FontAwesome
          name="caret-down"
          size={10}
          color={inkMuted}
          importantForAccessibility="no-hide-descendants"
        />
      </View>
    </View>
  );
});
