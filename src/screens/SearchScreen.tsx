import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useLayoutEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { TextMuted } from '@/components/atoms/TextMuted';
import type { RootStackParamList } from '@/navigation/types';
import { paletteHex } from '@/theme/palette';
import { semanticColors } from '@/theme/semanticColors';
import { authScreen } from '@/theme/tokens';

type SearchNav = StackNavigationProp<RootStackParamList, 'Search'>;

/** Query / discovery shell — placeholder until search is API-backed. */
export function SearchScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<SearchNav>();
  const { colorScheme } = useColorScheme();
  const paletteKey = colorScheme === 'dark' ? 'dark' : 'light';
  const semantic = semanticColors[paletteKey];
  const accent = paletteHex.ritual.primary[paletteKey];
  const ink = paletteHex.ritual.ink[paletteKey];

  const lead = useMemo(() => t('screens.search.placeholderLead'), [t]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t('screens.search.title'),
      headerShadowVisible: false,
      headerTintColor: accent,
      headerStyle: { backgroundColor: semantic.surface },
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 17,
        color: ink,
      },
    });
  }, [navigation, accent, ink, semantic.surface, t]);

  return (
    <View className="flex-1 bg-canvas dark:bg-canvas-dark" accessibilityRole="none">
      <ScrollView
        contentContainerStyle={layoutStyles.scrollContent}
        className="flex-1 px-6 py-8"
        keyboardShouldPersistTaps="handled"
      >
        <TextMuted
          centered={false}
          className="mt-0 max-w-xl text-login-body leading-relaxed text-ritual-inkMuted dark:text-ritual-inkMuted-dark"
        >
          {lead}
        </TextMuted>
        <Text className="mt-6 text-login-body leading-relaxed text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
          {t('screens.search.placeholderBody')}
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
