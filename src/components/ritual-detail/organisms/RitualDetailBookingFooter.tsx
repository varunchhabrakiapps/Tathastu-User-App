import { Platform, StyleSheet, Text, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useColorScheme } from 'nativewind';

import { RitualPrimaryButton } from '@/components/atoms/RitualPrimaryButton';

import type { RitualDetailBookingVM } from '@/domain/ritualDetail';
import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

type Props = {
  booking: RitualDetailBookingVM;
  bottomInset: number;
  onBookPress: () => void;
};

const footerShellShadow = StyleSheet.create({
  light: {
    shadowColor: paletteHex.ritual.primary.light,
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.09,
    shadowRadius: 36,
    elevation: 14,
  },
  dark: {
    shadowColor: paletteHex.ritual.canvas.dark,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.42,
    shadowRadius: 40,
    elevation: 18,
  },
});

/**
 * Floating booking sheet — same blur language as onboarding/login footers,
 * reads premium over the scrolling editorial body.
 */
export function RitualDetailBookingFooter({
  booking,
  bottomInset,
  onBookPress,
}: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const shellShadow = isDark ? footerShellShadow.dark : footerShellShadow.light;
  const padBottom = Math.max(bottomInset, 12);

  return (
    <View className="overflow-hidden rounded-t-[32px]" style={shellShadow}>
      {Platform.OS === 'ios' ? (
        <BlurView
          blurType={isDark ? 'dark' : 'light'}
          blurAmount={34}
          reducedTransparencyFallbackColor={
            isDark ? paletteHex.ritual.surface.dark : paletteHex.ritual.surface.light
          }
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      <View
        className={cn(
          'px-5 pt-4',
          Platform.OS === 'ios'
            ? 'bg-ritual-surface/66 dark:bg-ritual-surface-dark/64'
            : 'bg-ritual-surface/95 dark:bg-ritual-surface-dark/95',
        )}
        style={{ paddingBottom: padBottom }}
      >
        <View className="gap-3">
          <View className="gap-1">
            <Text className="text-[13px] font-semibold leading-[18px] tracking-[-0.01em] text-ritual-primary dark:text-ritual-primary-dark">
              {booking.priceEyebrow}
            </Text>
            <Text className="font-semibold text-[23px] leading-[28px] tracking-[-0.02em] text-ritual-ink dark:text-ritual-ink-dark">
              {booking.priceAmount}
            </Text>
            <Text className="text-[13px] leading-[19px] text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
              {booking.priceNote}
            </Text>
          </View>

          <RitualPrimaryButton
            label={booking.bookCtaLabel}
            onPress={onBookPress}
            accessibilityLabel={booking.bookCtaLabel}
            accessibilityHint={booking.bookAccessibilityHint}
            className="w-full"
          />
        </View>
      </View>
    </View>
  );
}
