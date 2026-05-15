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
import { RitualDetailHeaderBackground } from '@/components/ritual-detail/molecules/RitualDetailHeaderBackground';
import { OnboardingScreenBackdrop } from '@/components/molecules/OnboardingScreenBackdrop';
import { RITUAL_DETAIL_BOOKING_FOOTER_BODY } from '@/constants/ritualDetailLayout';
import { useRitualDetailScreen } from '@/hooks/useRitualDetailScreen';
import { useThemePreference } from '@/hooks/useThemePreference';
import type { RootStackParamList } from '@/navigation/types';
import { semanticColors } from '@/theme/semanticColors';
import { authScreen } from '@/theme/tokens';

type RitualNav = StackNavigationProp<RootStackParamList, 'RitualDetail'>;

/** Height from top of screen through the floating back cluster (safe area + pt-2 + 40px control + pb). */
function ritualDetailTopChromeHeight(insetTop: number) {
  return insetTop + 8 + 40 + 14;
}

/**
 * Ritual catalogue detail — floating glass back (no native “Main” label), scroll-reveal top scrim
 * so section labels never collide with navigation.
 */
export function RitualDetailScreen() {
  const navigation = useNavigation<RitualNav>();
  const vm = useRitualDetailScreen();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const { resolvedScheme } = useThemePreference();
  const defaultStatusBarStyle = semanticColors[resolvedScheme].statusBarStyle;

  const [navElevated, setNavElevated] = useState(false);

  const topChromeH = useMemo(() => ritualDetailTopChromeHeight(insets.top), [insets.top]);

  const scrollBottomPad =
    authScreen.scrollBottom + RITUAL_DETAIL_BOOKING_FOOTER_BODY + insets.bottom;

  const scrollElevateThreshold = useMemo(
    () => Math.max(0, vm.heroHeight - topChromeH - 20),
    [vm.heroHeight, topChromeH],
  );

  const onBookPress = useCallback(() => {
    navigation.navigate('Main', { screen: 'Bookings' });
  }, [navigation]);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = event.nativeEvent.contentOffset.y;
      const next = y >= scrollElevateThreshold;
      setNavElevated((prev) => (prev === next ? prev : next));
    },
    [scrollElevateThreshold],
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
    if (!navElevated) {
      StatusBar.setBarStyle('light-content');
      return;
    }
    StatusBar.setBarStyle(resolvedScheme === 'dark' ? 'light-content' : 'dark-content');
  }, [isFocused, navElevated, resolvedScheme]);

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

        {navElevated ? (
          <View
            pointerEvents="none"
            className="absolute inset-x-0 top-0 z-30 overflow-hidden"
            style={{ height: topChromeH }}
          >
            <RitualDetailHeaderBackground />
          </View>
        ) : null}
        <SafeAreaView
          edges={['top']}
          pointerEvents="box-none"
          className="absolute inset-x-0 top-0 z-40 px-3 pb-3.5 pt-2"
        >
          <RitualDetailBackButton elevated={navElevated} />
        </SafeAreaView>

        <RitualDetailBookingFooter
          booking={vm.booking}
          bottomInset={insets.bottom}
          onBookPress={onBookPress}
        />
      </View>
    </OnboardingScreenBackdrop>
  );
}
