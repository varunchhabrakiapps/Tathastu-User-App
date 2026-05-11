import { ActivityIndicator, Pressable, Text } from 'react-native';
import { useColorScheme } from 'nativewind';

import { cn } from '@/utils/cn';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  className?: string;
};

/**
 * Full-width-style primary CTA; spinner contrast follows light/dark primary fill.
 */
export function PrimaryButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  accessibilityLabel,
  className,
}: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const spinnerColor = isDark ? '#fafaf9' : '#ffffff';
  const isBusy = loading || disabled;

  return (
    <Pressable
      onPress={onPress}
      disabled={isBusy}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isBusy, busy: loading }}
      className={cn(
        'rounded-2xl bg-primary py-4 active:opacity-90 disabled:opacity-50 dark:bg-primary-soft-dark',
        className,
      )}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <Text className="text-center text-base font-semibold text-white dark:text-ink-ondark">
          {label}
        </Text>
      )}
    </Pressable>
  );
}
