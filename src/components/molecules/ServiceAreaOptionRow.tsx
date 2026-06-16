import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';

import { useRitualSemanticColors } from '@/hooks/useRitualSemanticColors';
import { hexToRgba } from '@/theme/colorUtils';
import { cn } from '@/utils/cn';

type Props = {
  label: string;
  metroLabel: string;
  selected: boolean;
  disabled?: boolean;
  isLast?: boolean;
  /** City picker — title only, no pin or neighbourhood subline. */
  compact?: boolean;
  onPress: () => void;
  accessibilityLabel: string;
};

/** Supported metro row — map pin, neighbourhood label, selection check. */
export const ServiceAreaOptionRow = memo(function ServiceAreaOptionRow({
  label,
  metroLabel,
  selected,
  disabled = false,
  isLast = false,
  compact = false,
  onPress,
  accessibilityLabel,
}: Props) {
  const { ink, inkMuted, chevron, rowDivider, rowPressHighlight, primary } =
    useRitualSemanticColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected, disabled: Boolean(disabled) }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        !isLast ? { borderBottomWidth: 1, borderBottomColor: rowDivider } : undefined,
        pressed && !disabled ? { backgroundColor: rowPressHighlight } : undefined,
        selected ? { backgroundColor: hexToRgba(primary, 0.1) } : undefined,
      ]}
      className={cn('flex-row items-center gap-3 px-4', compact ? 'py-3' : 'py-3.5', disabled && 'opacity-50')}
    >
      {!compact ? (
        <View
          pointerEvents="none"
          className={cn(
            'h-9 w-9 shrink-0 items-center justify-center rounded-full border',
            selected
              ? 'border-ritual-primary/35 bg-ritual-primary/12 dark:border-ritual-primary-dark/40 dark:bg-ritual-primary-dark/18'
              : 'border-ritual-borderSoft/55 bg-ritual-surfaceSecondary/60 dark:border-ritual-borderSoft-dark/45 dark:bg-ritual-surfaceSecondary-dark/50',
          )}
        >
          <FontAwesome
            name="map-marker"
            size={14}
            color={selected ? primary : inkMuted}
            importantForAccessibility="no-hide-descendants"
          />
        </View>
      ) : null}

      <View className="min-w-0 flex-1 gap-0.5">
        <Text
          numberOfLines={1}
          style={{ color: ink }}
          className={cn(
            'font-semibold',
            compact ? 'text-[16px] leading-[21px] tracking-[-0.02em]' : 'text-login-body',
          )}
        >
          {label}
        </Text>
        {!compact && metroLabel ? (
          <Text numberOfLines={1} style={{ color: inkMuted }} className="text-login-label">
            {metroLabel}
          </Text>
        ) : null}
      </View>

      {selected ? (
        <FontAwesome
          name="check-circle"
          size={18}
          color={primary}
          importantForAccessibility="no-hide-descendants"
        />
      ) : compact ? null : (
        <FontAwesome
          name="chevron-right"
          size={13}
          color={chevron}
          importantForAccessibility="no-hide-descendants"
        />
      )}
    </Pressable>
  );
});
