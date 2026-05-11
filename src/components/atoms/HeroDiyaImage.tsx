import { memo } from 'react';
import { Image } from 'react-native';

import { cn } from '@/utils/cn';

const SOURCE = require('../../../assets/images/login-diya.png');

type Props = {
  className?: string;
  accessibilityLabel?: string;
};

export const HeroDiyaImage = memo(function HeroDiyaImage({
  className,
  accessibilityLabel,
}: Props) {
  return (
    <Image
      source={SOURCE}
      accessibilityIgnoresInvertColors
      accessible={!!accessibilityLabel}
      accessibilityRole={accessibilityLabel ? 'image' : undefined}
      accessibilityLabel={accessibilityLabel}
      className={cn(
        'absolute bottom-0 right-0 h-[140px] w-[140px] -scale-x-100 opacity-70 dark:opacity-75',
        className,
      )}
      resizeMode="contain"
    />
  );
});


