import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';

import { SectionEyebrow } from '@/components/atoms/SectionEyebrow';
import { useRitualSemanticColors } from '@/hooks/useRitualSemanticColors';
import { cn } from '@/utils/cn';

type Props = {
  label: string;
  metroLabel?: string | null;
  className?: string;
};

/** Compact summary of the user's saved service area on the manual picker. */
export const SelectedLocationCard = memo(function SelectedLocationCard({
  label,
  metroLabel,
  className,
}: Props) {
  const { t } = useTranslation();
  const { ink, inkMuted, primary, sectionSurface, sectionBorder } = useRitualSemanticColors();

  return (
    <View className={cn('gap-2', className)}>
      <SectionEyebrow label={t('screens.manualLocation.selectedHeading')} />
      <View
        className="flex-row items-center gap-3 rounded-[20px] border px-4 py-3.5"
        style={{
          backgroundColor: sectionSurface,
          borderColor: sectionBorder,
        }}
        accessibilityRole="summary"
        accessibilityLabel={t('screens.manualLocation.selectedA11y', { location: label })}
      >
        <View
          pointerEvents="none"
          className="h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ritual-primary/30 bg-ritual-primary/12 dark:border-ritual-primary-dark/35 dark:bg-ritual-primary-dark/16"
        >
          <FontAwesome
            name="map-marker"
            size={16}
            color={primary}
            importantForAccessibility="no-hide-descendants"
          />
        </View>

        <View className="min-w-0 flex-1 gap-0.5">
          <Text numberOfLines={1} style={{ color: ink }} className="font-semibold text-login-body">
            {label}
          </Text>
          {metroLabel ? (
            <Text numberOfLines={1} style={{ color: inkMuted }} className="text-login-label">
              {metroLabel}
            </Text>
          ) : null}
        </View>

        <FontAwesome
          name="check-circle"
          size={18}
          color={primary}
          importantForAccessibility="no-hide-descendants"
        />
      </View>
    </View>
  );
});
