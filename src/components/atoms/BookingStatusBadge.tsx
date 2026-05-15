import { memo } from 'react';
import { Text, View } from 'react-native';

import type { BookingPreviewStatus } from '@/domain/bookingPreview';
import { cn } from '@/utils/cn';

const STATUS_SHELL: Record<BookingPreviewStatus, string> = {
  confirmed:
    'bg-ritual-surfaceSecondary/80 dark:bg-ritual-surfaceSecondary-dark/52 border border-ritual-borderSoft/52 dark:border-ritual-borderSoft-dark/40',
  upcoming_tomorrow:
    'bg-warm-peach/55 dark:bg-warm-dark/15 border border-ritual-borderSoft/52 dark:border-ritual-borderSoft-dark/40',
  today:
    'bg-ritual-primarySoft/50 dark:bg-ritual-primarySoft-dark/32 border border-ritual-borderSoft/54 dark:border-ritual-borderSoft-dark/42',
  starting_soon:
    'bg-ritual-surfaceSecondary/92 dark:bg-ritual-surfaceSecondary-dark/60 border border-ritual-borderSoft/62 dark:border-ritual-borderSoft-dark/48',
};

type Props = {
  status: BookingPreviewStatus;
  label: string;
  className?: string;
};

export const BookingStatusBadge = memo(function BookingStatusBadge({
  status,
  label,
  className,
}: Props) {
  return (
    <View className={cn('self-start rounded-full px-3 py-2', STATUS_SHELL[status], className)}>
      <Text className="text-login-label font-medium text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
        {label}
      </Text>
    </View>
  );
});
