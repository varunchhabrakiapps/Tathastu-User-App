import { Switch, Text, View } from 'react-native';

import { ProfileRowIcon, type ProfileRowIconGlyph } from '@/components/atoms/ProfileRowIcon';
import { useRitualSemanticColors } from '@/hooks/useRitualSemanticColors';
import { hexToRgba } from '@/theme/colorUtils';

type Props = {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (next: boolean) => void;
  icon?: ProfileRowIconGlyph;
  isLast?: boolean;
  disabled?: boolean;
};

/**
 * Settings toggle row — leading glyph, label + helper copy, themed {@link Switch}.
 * Keeps notification/preference rows visually aligned with {@link ProfileNavRow}.
 */
export function ProfileToggleRow({
  label,
  description,
  value,
  onValueChange,
  icon,
  isLast,
  disabled,
}: Props) {
  const { ink, inkMuted, primary, rowDivider } = useRitualSemanticColors();

  const trackTrue = primary;
  const trackFalse = hexToRgba(inkMuted, 0.36);

  return (
    <View
      className="flex-row items-center gap-3 px-4 py-3.5"
      style={!isLast ? { borderBottomWidth: 1, borderBottomColor: rowDivider } : undefined}
    >
      {icon ? <ProfileRowIcon name={icon} /> : null}
      <View className="min-w-0 flex-1">
        <Text style={{ color: ink }} className="text-login-body">
          {label}
        </Text>
        {description ? (
          <Text style={{ color: inkMuted }} className="mt-0.5 text-login-label leading-snug">
            {description}
          </Text>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        accessibilityLabel={label}
        accessibilityHint={description}
        trackColor={{ true: trackTrue, false: trackFalse }}
        thumbColor="#ffffff"
        ios_backgroundColor={trackFalse}
      />
    </View>
  );
}
