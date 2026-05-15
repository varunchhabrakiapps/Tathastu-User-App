import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OnboardingScreenBackdrop } from '@/components/molecules/OnboardingScreenBackdrop';
import { authScreen } from '@/theme/tokens';

/**
 * Profile tab hub shell — matches auth/home ritual backdrop + transparent scroll (no canvas slab behind glass).
 */
export function ProfileHubScrollLayout({ children }: PropsWithChildren) {
  return (
    <OnboardingScreenBackdrop>
      <SafeAreaView edges={['top', 'bottom']} className="min-h-0 flex-1" accessibilityRole="none">
        <ScrollView
          className="flex-1 bg-transparent"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </OnboardingScreenBackdrop>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: authScreen.scrollBottom,
  },
});
