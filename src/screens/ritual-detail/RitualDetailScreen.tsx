import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  RitualDetailBookingFooter,
  RitualDetailHero,
  RitualDetailSections,
} from '@/components/ritual-detail';
import { RitualDetailBackButton } from '@/components/ritual-detail/molecules/RitualDetailBackButton';
import { OnboardingScreenBackdrop } from '@/components/molecules/OnboardingScreenBackdrop';
import { RITUAL_DETAIL_BOOKING_FOOTER_BODY } from '@/constants/ritualDetailLayout';
import { useRitualDetailScreen } from '@/hooks/useRitualDetailScreen';
import { useThemePreference } from '@/hooks/useThemePreference';
import type { RootStackParamList } from '@/navigation/types';
import { semanticColors } from '@/theme/semanticColors';

type RitualNav = StackNavigationProp<RootStackParamList, 'RitualDetail'>;

/** IconButton cluster — safe top + 44px control (matches {@link IconButton}). */
function ritualDetailTopChromeHeight(insetTop: number) {
  return insetTop + 6 + 44;
}

/**
 * Ritual catalogue detail — onboarding backdrop, OTP-style glass back, glass sections,
 * compact onboarding-style footer (price left · CTA right).
 */
export function RitualDetailScreen() {
  const navigation = useNavigation<RitualNav>();
  const vm = useRitualDetailScreen();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const { resolvedScheme } = useThemePreference();
  const defaultStatusBarStyle = semanticColors[resolvedScheme].statusBarStyle;

  const [navOnHero, setNavOnHero] = useState(true);

  const topChromeH = useMemo(() => ritualDetailTopChromeHeight(insets.top), [insets.top]);

  const scrollBottomPad = RITUAL_DETAIL_BOOKING_FOOTER_BODY + insets.bottom + 8;

  const scrollHeroThreshold = useMemo(
    () => Math.max(0, vm.heroHeight - topChromeH - 16),
    [vm.heroHeight, topChromeH],
  );

  const onBookPress = useCallback(() => {
    navigation.navigate('Main', { screen: 'Bookings' });
  }, [navigation]);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = event.nativeEvent.contentOffset.y;
      const onHero = y < scrollHeroThreshold;
      setNavOnHero((prev) => (prev === onHero ? prev : onHero));
    },
    [scrollHeroThreshold],
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        StatusBar.setBarStyle(defaultStatusBarStyle);
      };
    }, [defaultStatusBarStyle]),
  );

  useEffect(() => {
    if (!isFocused) return;
    StatusBar.setBarStyle(navOnHero ? 'light-content' : defaultStatusBarStyle);
  }, [isFocused, navOnHero, defaultStatusBarStyle]);

  return (
    <OnboardingScreenBackdrop>
      <View className="min-h-0 flex-1" accessibilityRole="none">
        <ScrollView
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="never"
          scrollEventThrottle={16}
          onScroll={onScroll}
          contentContainerClassName="grow"
          contentContainerStyle={{ paddingBottom: scrollBottomPad }}
        >
          <RitualDetailHero
            source={vm.heroSource}
            height={vm.heroHeight}
            width={vm.windowWidth}
            title={vm.ritualTitle}
            subtitle={vm.heroSubtitle}
            accessibilityLabel={vm.heroAccessibilityLabel}
            overlayPreset={vm.heroOverlayPreset}
          />

          <RitualDetailSections
            narrative={vm.narrative}
            booking={vm.booking}
            videoThumbnailSource={vm.sampleVideoPosterSource}
          />
        </ScrollView>

        <SafeAreaView
          edges={['top']}
          pointerEvents="box-none"
          className="absolute inset-x-0 top-0 z-40 px-5 pt-1"
        >
          <RitualDetailBackButton onHero={navOnHero} />
        </SafeAreaView>

        <RitualDetailBookingFooter booking={vm.booking} onBookPress={onBookPress} />
      </View>
    </OnboardingScreenBackdrop>
  );
}
