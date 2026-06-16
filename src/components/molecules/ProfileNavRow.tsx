import { Pressable, Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';

import {
  ProfileRowIcon,
  type ProfileRowIconGlyph,
  type ProfileRowIconTone,
} from '@/components/atoms/ProfileRowIcon';
import { useRitualSemanticColors } from '@/hooks/useRitualSemanticColors';
import { cn } from '@/utils/cn';

type Props = {
  label: string;
  /** Omit to render a static (non-pressable) info row — chevron hides automatically. */
  onPress?: () => void;
  /** Leading glyph tile. Omit for a plain text row. */
  icon?: ProfileRowIconGlyph;
  /** Right-aligned secondary value (e.g. current theme, saved count). */
  value?: string;
  isLast?: boolean;
  accessibilityHint?: string;
  /** `destructive` tints the label + icon warm (sign-out). */
  tone?: ProfileRowIconTone;
  /** Force-show/hide the trailing chevron; defaults to visible when pressable. */
  showChevron?: boolean;
};

/**
 * Ritual-profile row — optional leading glyph, label, secondary value, and chevron.
 * Renders as a button when `onPress` is supplied, otherwise a calm static info row.
 */
export function ProfileNavRow({
  label,
  onPress,
  icon,
  value,
  isLast,
  accessibilityHint,
  tone = 'default',
  showChevron,
}: Props) {
  const { ink, inkMuted, chevron, rowDivider, rowPressHighlight, warmAccent } =
    useRitualSemanticColors();

  const isDestructive = tone === 'destructive';
  const chevronVisible = showChevron ?? Boolean(onPress);
  const labelColor = isDestructive ? warmAccent : ink;

  const content = (
    <>
      {icon ? <ProfileRowIcon name={icon} tone={tone} /> : null}
      <Text numberOfLines={1} style={{ color: labelColor }} className="min-w-0 flex-1 text-login-body">
        {label}
      </Text>
      {value ? (
        <Text
          numberOfLines={1}
          style={{ color: inkMuted }}
          className="max-w-[48%] text-login-body"
        >
          {value}
        </Text>
      ) : null}
      {chevronVisible ? <FontAwesome name="chevron-right" size={13} color={chevron} /> : null}
    </>
  );

  const rowStyle = !isLast ? { borderBottomWidth: 1, borderBottomColor: rowDivider } : undefined;

  if (!onPress) {
    return (
      <View className="flex-row items-center gap-3 px-4 py-3.5" style={rowStyle} accessibilityRole="text">
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      onPress={onPress}
      style={({ pressed }) => [
        rowStyle,
        pressed ? { backgroundColor: rowPressHighlight } : undefined,
      ]}
      className="flex-row items-center gap-3 px-4 py-3.5"
    >
      {content}
    </Pressable>
  );
}
