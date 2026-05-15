import { Text, View } from 'react-native';

type Props = {
  greetingName: string;
  avatarInitials: string;
  mobileLine: string;
  supportingLine?: string;
};

/**
 * Identity block inside {@link LoginAuthSurface} — editorial ritual type + soft initials badge (matches login/home).
 */
export function ProfileIdentityHero({
  greetingName,
  avatarInitials,
  mobileLine,
  supportingLine,
}: Props) {
  return (
    <View className="gap-4">
      <View className="flex-row items-center gap-4">
        <View className="h-14 w-14 items-center justify-center rounded-full bg-ritual-primarySoft/55 dark:bg-ritual-primarySoft-dark/38">
          <Text className="text-lg font-semibold text-ritual-primary dark:text-ritual-primary-dark">
            {avatarInitials}
          </Text>
        </View>
        <View className="min-w-0 flex-1">
          <Text
            accessibilityRole="header"
            numberOfLines={2}
            className="font-medium leading-snug text-login-display text-ritual-ink dark:text-ritual-ink-dark"
          >
            {greetingName}
          </Text>
          <Text
            accessibilityRole="text"
            numberOfLines={2}
            className="mt-1 text-login-body text-ritual-inkMuted dark:text-ritual-inkMuted-dark"
          >
            {mobileLine}
          </Text>
        </View>
      </View>
      {supportingLine ? (
        <Text className="text-login-body leading-relaxed text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
          {supportingLine}
        </Text>
      ) : null}
    </View>
  );
}
