import { memo } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { paletteHex } from '@/theme/palette';

type Props = {
  isLoadingMore: boolean;
  hasError: boolean;
  /** Show the "end of list" note (only meaningful once there are results). */
  showEnd: boolean;
  loadingLabel: string;
  endLabel: string;
  errorLabel: string;
  onRetry: () => void;
};

/**
 * Generic infinite-scroll footer — loading spinner, tappable error, or an end-of-list note.
 * Reusable across any paginated `FlatList`.
 */
export const PaginationFooter = memo(function PaginationFooter({
  isLoadingMore,
  hasError,
  showEnd,
  loadingLabel,
  endLabel,
  errorLabel,
  onRetry,
}: Props) {
  const { colorScheme } = useColorScheme();
  const k = colorScheme === 'dark' ? 'dark' : 'light';

  if (hasError) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onRetry}
        hitSlop={8}
        style={styles.wrap}
        className="active:opacity-80"
      >
        <Text
          style={{ color: paletteHex.ritual.primary[k] }}
          className="text-center font-medium text-[13px] leading-[18px]"
        >
          {errorLabel}
        </Text>
      </Pressable>
    );
  }

  if (isLoadingMore) {
    return (
      <View style={styles.wrap} className="flex-row items-center justify-center gap-2.5">
        <ActivityIndicator size="small" color={paletteHex.ritual.primary[k]} />
        <Text
          style={{ color: paletteHex.ritual.inkMuted[k] }}
          className="font-normal text-[12px] leading-[16px]"
        >
          {loadingLabel}
        </Text>
      </View>
    );
  }

  if (showEnd) {
    return (
      <View style={styles.wrap}>
        <Text
          accessibilityRole="text"
          style={{ color: paletteHex.ritual.inkMuted[k] }}
          className="text-center font-normal text-[12px] leading-[16px] tracking-[0.02em]"
        >
          {endLabel}
        </Text>
      </View>
    );
  }

  return null;
});

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
