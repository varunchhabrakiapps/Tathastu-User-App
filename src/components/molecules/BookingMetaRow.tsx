import { memo } from 'react';
import { Text, View } from 'react-native';

import { cn } from '@/utils/cn';

type Props = {
  label: string;
  value: string;
  className?: string;
};

export const BookingMetaRow = memo(function BookingMetaRow({ label, value, className }: Props) {
  return (
    <View className={cn('gap-1', className)}>
      <Text className="text-login-label font-normal text-ritual-inkMuted/84 dark:text-ritual-inkMuted-dark">
        {label}
      </Text>
      <Text className="text-login-body font-normal leading-snug text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
        {value}
      </Text>
    </View>
  );
});
