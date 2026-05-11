import type { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ONBOARDING_MIN_TOP_INSET,
  ONBOARDING_TOP_INSET_EXTRA,
} from '@/constants/onboardingLayout';
import { authScreen } from '@/theme/tokens';
import { cn } from '@/utils/cn';

type Props = PropsWithChildren<{
  hasSafeAreaTopPadding?: boolean;
  /** Overrides default canvas background (e.g. transparent when the screen paints its own gradient). */
  scrollClassName?: string;
}>;

/**
 * Shared keyboard-aware scroll scaffold for auth and onboarding flows.
 * Top inset follows the device safe area via `contentContainerStyle`.
 */
export function AuthFlowScrollLayout({ children, hasSafeAreaTopPadding, scrollClassName }: Props) {
  const { top: safeTop } = useSafeAreaInsets();
  const paddingTop =
    Math.max(safeTop, ONBOARDING_MIN_TOP_INSET) + ONBOARDING_TOP_INSET_EXTRA;

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        className={cn('flex-1', scrollClassName ?? 'bg-canvas dark:bg-canvas-dark')}
        contentContainerClassName="grow"
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          paddingTop: hasSafeAreaTopPadding ? paddingTop : 0,
          paddingBottom: authScreen.scrollBottom,
        }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={Platform.OS === 'android'}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
