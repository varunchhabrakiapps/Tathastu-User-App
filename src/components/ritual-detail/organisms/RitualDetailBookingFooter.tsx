import { Text, View } from 'react-native';

import { RitualPrimaryButton } from '@/components/atoms/RitualPrimaryButton';
import { OnboardingFooter } from '@/components/molecules/OnboardingFooter';

import type { RitualDetailBookingVM } from '@/domain/ritualDetail';

type Props = {
  booking: RitualDetailBookingVM;
  onBookPress: () => void;
};

/**
 * Compact booking strip — price left, intrinsic-width CTA right (onboarding footer shell).
 */
export function RitualDetailBookingFooter({ booking, onBookPress }: Props) {
  return (
    <OnboardingFooter>
      <View className="flex-row items-end justify-between gap-3">
        <View className="min-w-0 flex-1 gap-0.5 pr-1">
          <Text className="font-semibold text-login-body tracking-[-0.01em] text-ritual-ink dark:text-ritual-ink-dark">
            {booking.priceAmount}
          </Text>
          <Text
            numberOfLines={2}
            className="text-[12px] leading-[17px] text-ritual-inkMuted dark:text-ritual-inkMuted-dark"
          >
            {booking.priceNote}
          </Text>
        </View>

        <RitualPrimaryButton
          label={booking.bookCtaLabel}
          onPress={onBookPress}
          fullWidth={false}
          accessibilityLabel={booking.bookCtaLabel}
          accessibilityHint={booking.bookAccessibilityHint}
        />
      </View>
    </OnboardingFooter>
  );
}
