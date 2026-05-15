import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useLayoutEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { GhostGlassButton } from '@/components/atoms/GhostGlassButton';
import { TextMuted } from '@/components/atoms/TextMuted';
import type { RootStackParamList } from '@/navigation/types';
import { paletteHex } from '@/theme/palette';
import { semanticColors } from '@/theme/semanticColors';
import { authScreen } from '@/theme/tokens';

type Nav = StackNavigationProp<RootStackParamList, 'BuildCustomRitual'>;

export function BuildCustomRitualScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { colorScheme } = useColorScheme();
  const paletteKey = colorScheme === 'dark' ? 'dark' : 'light';
  const semantic = semanticColors[paletteKey];
  const ritualAccent = paletteHex.ritual.primary[paletteKey];
  const ritualInk = paletteHex.ritual.ink[paletteKey];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t('screens.buildCustomRitual.title'),
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

  /** Bridge root stack → main tabs → Explore (catalog still helps when vibes are fuzzy). */
  const openExplore = useCallback(() => {
    navigation.navigate('Main', { screen: 'Explore', params: {} });
  }, [navigation]);

  const steps = useMemo(
    () =>
      [
        { title: t('screens.buildCustomRitual.step1Title'), body: t('screens.buildCustomRitual.step1Body') },
        { title: t('screens.buildCustomRitual.step2Title'), body: t('screens.buildCustomRitual.step2Body') },
        { title: t('screens.buildCustomRitual.step3Title'), body: t('screens.buildCustomRitual.step3Body') },
      ] as const,
    [t],
  );

  return (
    <View className="flex-1 bg-canvas dark:bg-canvas-dark" accessibilityRole="none">
      <ScrollView
        contentContainerStyle={layoutStyles.scrollContent}
        className="flex-1 px-6 py-8"
        keyboardShouldPersistTaps="handled"
      >
        <Text
          accessibilityRole="text"
          style={{ color: paletteHex.ritual.primary[paletteKey] }}
          className="pb-3 font-semibold uppercase text-login-metadata tracking-[0.14em]"
        >
          {t('screens.buildCustomRitual.heroEyebrow')}
        </Text>
        <Text
          accessibilityRole="header"
          style={{ color: paletteHex.ritual.ink[paletteKey] }}
          className="pb-4 text-login-display tracking-[-0.02em]"
        >
          {t('screens.buildCustomRitual.heroTitle')}
        </Text>
        <TextMuted
          centered={false}
          className="mt-0 max-w-xl pb-10 text-login-body leading-relaxed text-ritual-inkMuted dark:text-ritual-inkMuted-dark"
        >
          {t('screens.buildCustomRitual.lead')}
        </TextMuted>

        <View className="gap-3">
          {steps.map((step, index) => (
            <View
              key={step.title}
              className="rounded-[18px] border border-ritual-borderSoft dark:border-ritual-borderSoft-dark bg-ritual-surfaceSecondary/90 dark:bg-ritual-surfaceSecondary-dark/90 px-4 py-3.5"
              accessibilityRole="none"
            >
              <Text
                accessibilityRole="text"
                style={{ color: paletteHex.ritual.inkMuted[paletteKey] }}
                className="pb-2 font-semibold text-login-metadata tracking-[0.08em]"
              >
                {t('screens.buildCustomRitual.stepBadge', { n: index + 1 })}
              </Text>
              <Text style={{ color: paletteHex.ritual.ink[paletteKey] }} className="pb-2 font-semibold text-login-body">
                {step.title}
              </Text>
              <Text style={{ color: paletteHex.ritual.inkMuted[paletteKey] }} className="text-login-body leading-[22px]">
                {step.body}
              </Text>
            </View>
          ))}
        </View>

        <TextMuted
          centered={false}
          className="mt-10 pb-10 text-login-body leading-relaxed text-ritual-inkMuted dark:text-ritual-inkMuted-dark"
        >
          {t('screens.buildCustomRitual.footer')}
        </TextMuted>

        <GhostGlassButton
          label={t('screens.buildCustomRitual.browseExploreCta')}
          onPress={openExplore}
          accessibilityLabel={t('screens.buildCustomRitual.browseExploreA11y')}
        />
      </ScrollView>
    </View>
  );
}

const layoutStyles = StyleSheet.create({
  scrollContent: {
    paddingBottom: authScreen.scrollBottom,
  },
});
