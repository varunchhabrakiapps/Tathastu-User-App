import type { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cn } from '@/utils/cn';

type Props = PropsWithChildren<{
  /** Overrides default canvas background (e.g. transparent when the screen paints its own gradient). */
  scrollClassName?: string;
}>;

/**
 * Shared keyboard-aware scroll scaffold for auth and onboarding flows.
 * Top inset follows the device safe area via `contentContainerStyle`.
 */
export function AuthFlowScrollLayout({ children, scrollClassName }: Props) {
  const { top: safeTop } = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        className={cn('flex-1', scrollClassName ?? 'bg-canvas dark:bg-canvas-dark')}
        contentContainerClassName="grow pb-6"
        contentContainerStyle={{ paddingTop: safeTop }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
