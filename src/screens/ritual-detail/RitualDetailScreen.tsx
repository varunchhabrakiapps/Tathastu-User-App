import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useLayoutEffect } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  RitualDetailBookingFooter,
  RitualDetailHero,
  RitualDetailSections,
} from '@/components/ritual-detail';
import { RITUAL_DETAIL_BOOKING_FOOTER_BODY } from '@/constants/ritualDetailLayout';
import { useRitualDetailScreen } from '@/hooks/useRitualDetailScreen';
import { useThemePreference } from '@/hooks/useThemePreference';
import type { RootStackParamList } from '@/navigation/types';
import { semanticColors } from '@/theme/semanticColors';
import { authScreen } from '@/theme/tokens';

type RitualNav = StackNavigationProp<RootStackParamList, 'RitualDetail'>;

/** Ritual catalogue detail — immersive hero + narrative + deliverables + sticky Book now. */
export function RitualDetailScreen() {
  const navigation = useNavigation<RitualNav>();
  const vm = useRitualDetailScreen();
  const insets = useSafeAreaInsets();
  const { resolvedScheme } = useThemePreference();
  const defaultStatusBarStyle = semanticColors[resolvedScheme].statusBarStyle;

  const scrollBottomPad =
    authScreen.scrollBottom + RITUAL_DETAIL_BOOKING_FOOTER_BODY + insets.bottom;

  const onBookPress = useCallback(() => {
    navigation.navigate('Main', { screen: 'Bookings' });
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerShadowVisible: false,
      headerTintColor: '#FFFFFF',
      headerTitle: '',
      headerStyle: {
        backgroundColor: 'transparent',
      },
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      return () => {
        StatusBar.setBarStyle(defaultStatusBarStyle);
      };
    }, [defaultStatusBarStyle]),
  );

  return (
    <View className="flex-1 bg-ritual-canvas dark:bg-ritual-canvas-dark" accessibilityRole="none">
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
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
        />

        <RitualDetailSections
          narrative={vm.narrative}
          booking={vm.booking}
          videoThumbnailSource={vm.sampleVideoPosterSource}
        />
      </ScrollView>

      <RitualDetailBookingFooter
        booking={vm.booking}
        bottomInset={insets.bottom}
        onBookPress={onBookPress}
      />
    </View>
  );
}
