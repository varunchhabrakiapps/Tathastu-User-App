import { Text, View } from 'react-native';

import { RitualPrimaryButton } from '@/components/atoms/RitualPrimaryButton';

import type { RitualDetailBookingVM } from '@/domain/ritualDetail';

type Props = {
  booking: RitualDetailBookingVM;
  bottomInset: number;
  onBookPress: () => void;
};

/**
 * Sticky price strip + Book now — sits below scroll; caller reserves scroll bottom padding.
 */
export function RitualDetailBookingFooter({
  booking,
  bottomInset,
  onBookPress,
}: Props) {
  const padBottom = Math.max(bottomInset, 12);

  return (
    <View
      className="border-t border-ritual-borderSoft bg-ritual-canvas px-6 pt-4 dark:border-ritual-borderSoft-dark dark:bg-ritual-canvas-dark"
      style={{ paddingBottom: padBottom }}
    >
      <View className="gap-4">
        <View className="gap-1">
          <Text className="text-login-label font-semibold uppercase tracking-[0.12em] text-ritual-primary dark:text-ritual-primary-dark">
            {booking.priceEyebrow}
          </Text>
          <Text className="font-semibold text-[22px] leading-snug text-ritual-ink dark:text-ritual-ink-dark">
            {booking.priceAmount}
          </Text>
          <Text className="text-login-caption leading-snug text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
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
  );
}
