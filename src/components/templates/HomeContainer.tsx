import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OnboardingScreenBackdrop } from '@/components/molecules/OnboardingScreenBackdrop';
import { authScreen } from '@/theme/tokens';

/**
 * Tab home shell — same ritual canvas + safe top inset as onboarding/auth; horizontal rhythm matches login inset.
 */
export function HomeContainer({ children }: PropsWithChildren) {
  return (
    <OnboardingScreenBackdrop>
      <SafeAreaView
        edges={['top']}
        className="min-h-0 flex-1"
        accessibilityRole="none"
      >
        <View
          className="flex-1 pt-1"
          style={{ paddingHorizontal: authScreen.insetX }}
          accessibilityRole="none"
        >
          {children}
        </View>
      </SafeAreaView>
    </OnboardingScreenBackdrop>
  );
}
