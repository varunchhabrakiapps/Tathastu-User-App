import { Text, View } from 'react-native';

import { GhostGlassButton } from '@/components/atoms/GhostGlassButton';
import { ProfileAvatar } from '@/components/atoms/ProfileAvatar';
import { LoginAuthSurface } from '@/components/molecules/LoginAuthSurface';
import { useRitualSemanticColors } from '@/hooks/useRitualSemanticColors';

type Props = {
  /** Resolved primary line — the saved name, or a gentle prompt when none is set. */
  name: string;
  /** Style `name` as a muted hint when it stands in for a missing display name. */
  nameIsPlaceholder?: boolean;
  avatarInitials: string;
  avatarAccessibilityLabel: string;
  mobileLine: string;
  supportingLine?: string;
  onEdit: () => void;
  editLabel: string;
  editAccessibilityLabel: string;
};

/**
 * Premium identity slab for the Profile hub — initials badge, name/mobile, and an Edit affordance,
 * on the same warm glass surface as login so the hub opens with a familiar, calm anchor.
 */
export function ProfileIdentityHero({
  name,
  nameIsPlaceholder,
  avatarInitials,
  avatarAccessibilityLabel,
  mobileLine,
  supportingLine,
  onEdit,
  editLabel,
  editAccessibilityLabel,
}: Props) {
  const { ink, inkMuted } = useRitualSemanticColors();
  const nameColor = nameIsPlaceholder ? inkMuted : ink;

  return (
    <LoginAuthSurface>
      <View className="gap-4 px-5">
        <View className="flex-row items-center gap-4">
          <ProfileAvatar initials={avatarInitials} accessibilityLabel={avatarAccessibilityLabel} />
          <View className="min-w-0 flex-1">
            <Text
              accessibilityRole="header"
              numberOfLines={1}
              style={{ color: nameColor }}
              className="font-medium leading-snug text-login-display"
            >
              {name}
            </Text>
            {mobileLine ? (
              <Text
                numberOfLines={1}
                style={{ color: inkMuted }}
                className="mt-1 text-login-body"
              >
                {mobileLine}
              </Text>
            ) : null}
          </View>
          <View className="flex-shrink-0 justify-center">
            <GhostGlassButton
              label={editLabel}
              accessibilityLabel={editAccessibilityLabel}
              onPress={onEdit}
            />
          </View>
        </View>
        {supportingLine ? (
          <Text style={{ color: inkMuted }} className="text-login-body leading-relaxed">
            {supportingLine}
          </Text>
        ) : null}
      </View>
    </LoginAuthSurface>
  );
}
