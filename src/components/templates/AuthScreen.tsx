import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { OnboardingScreenBackdrop } from '@/components/molecules/OnboardingScreenBackdrop';
import { AuthFlowScrollLayout } from '@/components/templates/AuthFlowScrollLayout';
import { AuthFlowHeader } from '../molecules/AuthFlowHeader';
import { ONBOARDING_MIN_TOP_INSET, ONBOARDING_TOP_INSET_EXTRA } from '@/constants/onboardingLayout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Auth shell: onboarding canvas + subtle login floor warmth + keyboard-safe scroll.
 */
export function AuthScreen({ children, hasBackHeader }: PropsWithChildren<{ hasBackHeader?: boolean }>) {
  const { top: safeTop } = useSafeAreaInsets();
  const paddingTop =
    Math.max(safeTop, ONBOARDING_MIN_TOP_INSET) + ONBOARDING_TOP_INSET_EXTRA;

  return (
    <OnboardingScreenBackdrop>
      <View className="relative min-h-0 flex-1" style={hasBackHeader ? { paddingTop } : undefined }>
        {hasBackHeader && <AuthFlowHeader onBackPress={() => { }} />}

        <AuthFlowScrollLayout hasSafeAreaTopPadding={!hasBackHeader} scrollClassName="relative z-[1] flex-1 bg-transparent">
          {children}
        </AuthFlowScrollLayout>
      </View>
    </OnboardingScreenBackdrop>
  );
}
