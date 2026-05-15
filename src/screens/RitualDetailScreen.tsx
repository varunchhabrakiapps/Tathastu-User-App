import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useLayoutEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { TextMuted } from '@/components/atoms/TextMuted';
import { TRENDING_RITUAL_IDS, type TrendingRitualId } from '@/domain/trendingRitual';
import type { RootStackParamList } from '@/navigation/types';
import { paletteHex } from '@/theme/palette';
import { semanticColors } from '@/theme/semanticColors';
import { authScreen } from '@/theme/tokens';

type RitualNav = StackNavigationProp<RootStackParamList, 'RitualDetail'>;
type RitualRoute = RouteProp<RootStackParamList, 'RitualDetail'>;

const TRENDING_IDS = new Set<string>(TRENDING_RITUAL_IDS);

export function RitualDetailScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<RitualNav>();
  const { params } = useRoute<RitualRoute>();
  const { colorScheme } = useColorScheme();
  const paletteKey = colorScheme === 'dark' ? 'dark' : 'light';
  const semantic = semanticColors[paletteKey];
  const ritualAccent = paletteHex.ritual.primary[paletteKey];
  const ritualInk = paletteHex.ritual.ink[paletteKey];

  const ritualKey = TRENDING_IDS.has(params.ritualId) ? (params.ritualId as TrendingRitualId) : null;
  const ritualTitle = useMemo(() => {
    if (!ritualKey) return t('screens.ritualDetail.placeholderRitualTitle');
    return t(`screens.home.trendingRituals.items.${ritualKey}.title`);
  }, [ritualKey, t]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t('screens.ritualDetail.title'),
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
          {t('screens.ritualDetail.placeholderLead', { ritualName: ritualTitle })}
        </TextMuted>
        <Text className="mt-8 text-login-body leading-relaxed text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
          {t('screens.ritualDetail.placeholderBody')}
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
