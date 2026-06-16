import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { OnboardingScreenBackdrop } from '@/components/molecules/OnboardingScreenBackdrop';
import { AuthFlowScrollLayout } from '@/components/templates/AuthFlowScrollLayout';
import { AuthFlowHeader } from '../molecules/AuthFlowHeader';
import { ONBOARDING_MIN_TOP_INSET, ONBOARDING_TOP_INSET_EXTRA } from '@/constants/onboardingLayout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Auth shell — same backdrop as onboarding/login (`OnboardingScreenBackdrop` → `getOnboardingBackdrop`).
 * Keyboard-safe scroll; optional stack-style back header for OTP.
 */
export function AuthScreen({
  children,
  hasBackHeader,
  onBackPress,
  backAccessibilityLabel,
}: PropsWithChildren<{
  hasBackHeader?: boolean;
  onBackPress?: () => void;
  backAccessibilityLabel?: string;
}>) {
  const { top: safeTop } = useSafeAreaInsets();
  const paddingTop =
    Math.max(safeTop, ONBOARDING_MIN_TOP_INSET) + ONBOARDING_TOP_INSET_EXTRA;

  return (
    <OnboardingScreenBackdrop>
      <View className="relative min-h-0 flex-1" style={hasBackHeader ? { paddingTop } : undefined }>
        {hasBackHeader ? (
          <AuthFlowHeader
            onBackPress={onBackPress ?? (() => {})}
            backAccessibilityLabel={backAccessibilityLabel}
          />
        ) : null}

        <AuthFlowScrollLayout hasSafeAreaTopPadding={!hasBackHeader} scrollClassName="relative z-[1] flex-1 bg-transparent">
          {children}
        </AuthFlowScrollLayout>
      </View>
    </OnboardingScreenBackdrop>
  );
}
