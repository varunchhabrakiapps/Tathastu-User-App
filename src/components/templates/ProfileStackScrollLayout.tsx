import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProfileStackHeader } from '@/components/molecules/ProfileStackHeader';
import { OnboardingScreenBackdrop } from '@/components/molecules/OnboardingScreenBackdrop';
import { useProfileStackBack } from '@/hooks/useProfileStackBack';
import { authScreen } from '@/theme/tokens';

type Props = PropsWithChildren<{
  /** Screen title — rendered in {@link ProfileStackHeader}. */
  title: string;
  backAccessibilityLabel: string;
}>;

/**
 * Profile nested stack shell — ritual backdrop, custom back + title header, scroll body.
 * Keeps nested profile leaves thin: pass translated title + compose cards inside `children`.
 */
export function ProfileStackScrollLayout({
  title,
  backAccessibilityLabel,
  children,
}: Props) {
  const onBackPress = useProfileStackBack();

  return (
    <OnboardingScreenBackdrop>
      <SafeAreaView edges={['top', 'bottom']} className="min-h-0 flex-1" accessibilityRole="none">
        <ProfileStackHeader
          title={title}
          onBackPress={onBackPress}
          backAccessibilityLabel={backAccessibilityLabel}
        />
        <ScrollView
          className="flex-1 bg-transparent"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <View className="px-5 pb-10">{children}</View>
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
