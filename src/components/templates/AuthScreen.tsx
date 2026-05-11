import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { LoginAmbientWash } from '@/components/molecules/LoginAmbientWash';
import { OnboardingScreenBackdrop } from '@/components/molecules/OnboardingScreenBackdrop';
import { AuthFlowScrollLayout } from '@/components/templates/AuthFlowScrollLayout';

/**
 * Auth shell: onboarding canvas + subtle login floor warmth + keyboard-safe scroll.
 */
export function AuthScreen({ children }: PropsWithChildren) {
  return (
    <OnboardingScreenBackdrop>
      <View className="relative min-h-0 flex-1">
        <LoginAmbientWash />
        <AuthFlowScrollLayout scrollClassName="relative z-[1] flex-1 bg-transparent">
          {children}
        </AuthFlowScrollLayout>
      </View>
    </OnboardingScreenBackdrop>
  );
}
