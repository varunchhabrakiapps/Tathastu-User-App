import type { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

import { cn } from '@/utils/cn';

const content = StyleSheet.create({
  scroll: { flexGrow: 1, paddingBottom: 24 },
});

type Props = PropsWithChildren<{
  /** Overrides default canvas background (e.g. transparent when the screen paints its own gradient). */
  scrollClassName?: string;
}>;

/**
 * Shared scroll + keyboard + safe-area scaffold for auth and onboarding flows.
 */
export function AuthFlowScrollLayout({ children, scrollClassName }: Props) {
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        className={cn('flex-1', scrollClassName ?? 'bg-canvas dark:bg-canvas-dark')}
        contentContainerStyle={content.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>

  );
}
