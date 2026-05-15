import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { TextMuted } from '@/components/atoms/TextMuted';
import type { RootStackParamList } from '@/navigation/types';
import { paletteHex } from '@/theme/palette';
import { semanticColors } from '@/theme/semanticColors';
import { authScreen } from '@/theme/tokens';

type DetailNav = StackNavigationProp<RootStackParamList, 'BookingDetail'>;
type DetailRoute = RouteProp<RootStackParamList, 'BookingDetail'>;

export function BookingDetailScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<DetailNav>();
  const { params } = useRoute<DetailRoute>();
  const { colorScheme } = useColorScheme();
  const paletteKey = colorScheme === 'dark' ? 'dark' : 'light';
  const semantic = semanticColors[paletteKey];
  const ritualAccent = paletteHex.ritual.primary[paletteKey];
  const ritualInk = paletteHex.ritual.ink[paletteKey];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t('screens.bookingDetail.title'),
      headerShadowVisible: false,
      headerTintColor: ritualAccent,
      headerStyle: { backgroundColor: semantic.surface },
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 17,
        color: ritualInk,
      },
    });
  }, [navigation, ritualAccent, ritualInk, semantic.surface, t]);

  return (
    <View className="flex-1 bg-canvas dark:bg-canvas-dark" accessibilityRole="none">
      <ScrollView
        contentContainerStyle={layoutStyles.scrollContent}
        className="flex-1 px-6 py-10"
        keyboardShouldPersistTaps="handled"
      >
        <TextMuted
          centered={false}
          className="mt-0 max-w-xl text-login-body leading-relaxed text-ritual-inkMuted dark:text-ritual-inkMuted-dark"
        >
          {t('screens.bookingDetail.placeholderLead', { bookingId: params.bookingId })}
        </TextMuted>
        <Text className="mt-8 text-login-body leading-relaxed text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
          {t('screens.bookingDetail.placeholderBody')}
        </Text>
      </ScrollView>
    </View>
  );
}

const layoutStyles = StyleSheet.create({
  scrollContent: {
    paddingBottom: authScreen.scrollBottom,
  },
});
