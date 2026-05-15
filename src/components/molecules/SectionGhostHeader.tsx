import { memo, type ReactNode } from 'react';
import { Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { GhostGlassButton } from '@/components/atoms/GhostGlassButton';
import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

/** Small ritual chip — visible but secondary to the title. */
export const SECTION_GHOST_HEADER_LEADING_SIZE = 34;

export type SectionGhostHeaderProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onActionPress?: () => void;
  actionAccessibilityLabel?: string;
  className?: string;
  /** Optional left affordance — e.g. `FontAwesomeCircleIcon` (calendar, chart). */
  leading?: ReactNode;
};

/**
 * Section title row with optional supporting copy and a whisper-weight ghost glass action.
 */
export const SectionGhostHeader = memo(function SectionGhostHeader({
  title,
  description,
  actionLabel,
  onActionPress,
  actionAccessibilityLabel,
  className,
  leading,
}: SectionGhostHeaderProps) {
  const { colorScheme } = useColorScheme();
  const key = colorScheme === 'dark' ? 'dark' : 'light';
  const titleColor = paletteHex.ritual.ink[key];
  const descriptionColor = paletteHex.ritual.inkMuted[key];

  const showAction = Boolean(actionLabel && onActionPress);
  const alignRow = description ? 'items-start' : 'items-center';
  const outerAlign = leading ? 'items-start' : alignRow;

  return (
    <View className={cn('mb-2', className)} accessibilityRole="none">
      <View className={cn('min-h-0 flex-row justify-between gap-3', outerAlign)}>
        <View className="min-w-0 flex-1 flex-row gap-2.5">
          {leading ? <View className="shrink-0 pt-0.5">{leading}</View> : null}
          <View className="min-w-0 flex-1 gap-1">
            <Text
              accessibilityRole="header"
              numberOfLines={1}
              style={{ color: titleColor }}
              className="font-semibold text-login-body tracking-[-0.01em]"
            >
              {title}
            </Text>
            {description ? (
              <Text
                accessibilityRole="text"
                numberOfLines={3}
                style={{ color: descriptionColor }}
                className="font-normal text-[13px] leading-[19px]"
              >
                {description}
              </Text>
            ) : null}
          </View>
        </View>

        {showAction ? (
          <GhostGlassButton
            accessibilityLabel={actionAccessibilityLabel ?? actionLabel}
            label={actionLabel!}
            onPress={onActionPress!}
            className="flex-shrink-0"
          />
        ) : null}
      </View>
    </View>
  );
});
