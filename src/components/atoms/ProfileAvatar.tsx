import { memo } from 'react';
import { Text, View } from 'react-native';

import { useRitualSemanticColors } from '@/hooks/useRitualSemanticColors';
import { cn } from '@/utils/cn';

type Props = {
  /** Up to two graphemes; falls back to a neutral dot upstream when no name is set. */
  initials: string;
  accessibilityLabel: string;
  /** Outer diameter in logical pixels. */
  size?: number;
  className?: string;
};

/**
 * Soft initials badge for profile surfaces — warm ritual tint, matches login/home identity.
 * Photo support can layer on top of this same frame later.
 */
export const ProfileAvatar = memo(function ProfileAvatar({
  initials,
  accessibilityLabel,
  size = 56,
  className,
}: Props) {
  const { primary, avatarBg, avatarBorder } = useRitualSemanticColors();

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
      style={{
        width: size,
        height: size,
        backgroundColor: avatarBg,
        borderWidth: 1,
        borderColor: avatarBorder,
      }}
      className={cn('items-center justify-center rounded-full', className)}
    >
      <Text
        style={{ color: primary, fontSize: Math.round(size * 0.34) }}
        className="font-semibold"
      >
        {initials}
      </Text>
    </View>
  );
});
