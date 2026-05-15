import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OnboardingScreenBackdrop } from '@/components/molecules/OnboardingScreenBackdrop';

/**
 * Tab home shell — same ritual canvas + safe top inset as onboarding/auth.
 * Horizontal inset lives on the Home feed (`FlatList` content container + header) so carousels can scroll edge-to-edge inside their lane without clipping.
 */
export function HomeContainer({ children }: PropsWithChildren) {
  return (
    <OnboardingScreenBackdrop>
      <SafeAreaView
        edges={['top']}
        className="min-h-0 flex-1"
        accessibilityRole="none"
      >
        <View className="flex-1 pt-1" accessibilityRole="none">
          {children}
        </View>
      </SafeAreaView>
    </OnboardingScreenBackdrop>
  );
}
