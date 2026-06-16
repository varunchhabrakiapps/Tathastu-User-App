import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { FontAwesomeCircleIcon } from '@/components/atoms/FontAwesomeCircleIcon';
import { NAZAR_CLEAR_MOMENT_ICON_SIZE } from '@/constants/homeLayout';
import type { NazarClearMomentId, NazarClearMomentPreview } from '@/domain/nazarClearMoment';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

type Props = {
  moment: NazarClearMomentPreview;
  showDivider: boolean;
  onPress: (momentId: NazarClearMomentId) => void;
};

/** One relatable nazar moment — tappable row inside the unified moments panel. */
export const NazarClearMomentRow = memo(function NazarClearMomentRow({
  moment,
  showDivider,
  onPress,
}: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const schemeKey = colorScheme === 'dark' ? 'dark' : 'light';

  const prefix = `screens.home.nazarClearMoments.items.${moment.id}`;
  const title = t(`${prefix}.title`);
  const statValue = t(`${prefix}.statValue`);
  const statLabel = t(`${prefix}.statLabel`);
  const iconA11y = t(`${prefix}.iconA11y`);

  const titleColor = paletteHex.ritual.ink[schemeKey];
  const statLabelColor = paletteHex.ritual.inkMuted[schemeKey];
  const statValueColor = paletteHex.ritual.primary[schemeKey];
  const chevronColor =
    schemeKey === 'dark'
      ? hexToRgba(paletteHex.ritual.inkMuted.dark, 0.72)
      : hexToRgba(paletteHex.ritual.inkMuted.light, 0.52);
  const dividerColor =
    schemeKey === 'dark'
      ? hexToRgba(paletteHex.ritual.borderSoft.dark, 0.45)
      : hexToRgba(paletteHex.ritual.borderSoft.light, 0.55);
  const badgeTextColor =
    schemeKey === 'dark' ? paletteHex.warm['on-dark'] : paletteHex.warm.deep;
  const badgeBgColor =
    schemeKey === 'dark'
      ? hexToRgba(paletteHex.ritual.primary.dark, 0.24)
      : hexToRgba(paletteHex.ritual.primary.light, 0.14);
  const pressHighlight =
    schemeKey === 'dark'
      ? hexToRgba(paletteHex.ritual.primary.dark, 0.1)
      : hexToRgba(paletteHex.ritual.primary.light, 0.08);

  const a11y = t('screens.home.nazarClearMoments.cardA11y', {
    title,
    stat: `${statValue} ${statLabel}`,
  });

  return (
    <View accessibilityRole="none">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        accessibilityHint={t('screens.home.nazarClearMoments.rowOpenHint')}
        onPress={() => onPress(moment.id)}
        className="active:opacity-[0.97]"
        style={({ pressed }) => (pressed ? { backgroundColor: pressHighlight } : undefined)}
      >
        <View className="flex-row items-center gap-3 px-4 py-3.5">
          <FontAwesomeCircleIcon
            name={moment.icon}
            circleSize={NAZAR_CLEAR_MOMENT_ICON_SIZE}
            iconSize={18}
            accessibilityLabel={iconA11y}
            containerClassName="shrink-0"
          />

          <View className="min-w-0 flex-1 gap-1">
            <View className="flex-row flex-wrap items-center gap-x-2 gap-y-0.5">
              <Text
                numberOfLines={2}
                style={{ color: titleColor }}
                className="shrink font-semibold text-[16px] leading-[21px] tracking-[-0.02em]"
              >
                {title}
              </Text>
              {moment.isPopular ? (
                <View
                  style={{ backgroundColor: badgeBgColor }}
                  className="rounded-full px-2 py-0.5"
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                >
                  <Text
                    style={{ color: badgeTextColor }}
                    className="font-semibold text-[9px] uppercase leading-[12px] tracking-[0.08em]"
                  >
                    {t('screens.home.nazarClearMoments.popularBadge')}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          <View className="shrink-0 flex-row items-center gap-2 pl-0.5">
            <View className="items-end gap-0.5">
              <Text
                style={{ color: statValueColor }}
                className="font-bold text-[15px] leading-[18px] tracking-[-0.02em]"
              >
                {statValue}
              </Text>
              <Text
                style={{ color: statLabelColor }}
                className="max-w-[72px] text-right font-normal text-[10px] uppercase leading-[13px] tracking-[0.06em]"
              >
                {statLabel}
              </Text>
            </View>
            <FontAwesome
              name="angle-right"
              size={16}
              color={chevronColor}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            />
          </View>
        </View>
      </Pressable>

      {showDivider ? (
        <View
          style={{ backgroundColor: dividerColor }}
          className={cn('mx-4 h-px')}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        />
      ) : null}
    </View>
  );
});
