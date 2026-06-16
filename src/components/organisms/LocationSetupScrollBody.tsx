import { memo } from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { LocationSetupFormCard } from '@/components/organisms/LocationSetupFormCard';
import { LocationSetupHeroSection } from '@/components/organisms/LocationSetupHeroSection';

type Props = {
  onUseCurrentLocation: () => void;
  onEnterManualLocation: () => void;
  isBusy: boolean;
  statusText: string | null;
  error: 'permissionDenied' | 'fetchFailed' | 'checkFailed' | null;
};

export const LocationSetupScrollBody = memo(function LocationSetupScrollBody(props: Props) {
  return (
    <View className="flex-1">
      <LocationSetupHeroSection />
      <View className="flex-1 justify-start px-5 pt-2">
        <Animated.View
          entering={FadeInDown.duration(480).delay(40)}
          className="w-full gap-6 pb-10"
        >
          <LocationSetupFormCard {...props} />
        </Animated.View>
      </View>
    </View>
  );
});
