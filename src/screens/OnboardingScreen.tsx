import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { Platform, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryGlassButton } from '@/components/atoms/PrimaryGlassButton';
import { ElevatedSurfaceCard } from '@/components/molecules/ElevatedSurfaceCard';
import { GradientHeroShell } from '@/components/molecules/GradientHeroShell';
import { MarketingHeroCopy } from '@/components/molecules/MarketingHeroCopy';
import { AuthFlowScrollLayout } from '@/components/templates/AuthFlowScrollLayout';
import { useCompleteOnboarding } from '@/hooks/useCompleteOnboarding';
import { getAuthHeroGradient } from '@/theme/heroGradients';
import { semanticColors } from '@/theme/semanticColors';

export function OnboardingScreen() {
  const { t } = useTranslation();
  const { top: safeTop } = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const paletteKey = colorScheme === 'dark' ? 'dark' : 'light';
  const { completeOnboarding, isCompleting } = useCompleteOnboarding();
  const heroColors = getAuthHeroGradient(paletteKey);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('transparent');
      }
      return () => {
        StatusBar.setBarStyle(semanticColors[paletteKey].statusBarStyle);
        if (Platform.OS === 'android') {
          StatusBar.setTranslucent(false);
          StatusBar.setBackgroundColor(semanticColors[paletteKey].surface);
        }
      };
    }, [paletteKey]),
  );

  return (
    <AuthFlowScrollLayout>
      <GradientHeroShell colors={heroColors} contentTopInset={safeTop}>
        <MarketingHeroCopy
          badge={t('screens.onboarding.heroBadge')}
          title={t('screens.onboarding.title')}
          subtitle={t('screens.onboarding.subtitle')}
          body={t('screens.onboarding.body')}
        />
      </GradientHeroShell>

      <View className="z-20 -mt-4 px-5 pb-10">
        <ElevatedSurfaceCard>
          <Text className="text-center text-xl font-semibold text-ink dark:text-ink-ondark">
            {t('screens.onboarding.cardTitle')}
          </Text>
          <Text className="mt-2 text-center text-base leading-snug text-ink-muted dark:text-ink-muted-ondark">
            {t('screens.onboarding.cardSubtitle')}
          </Text>

          <PrimaryGlassButton
            className="mt-6"
            label={t('screens.onboarding.ctaContinue')}
            onPress={completeOnboarding}
            loading={isCompleting}
            accessibilityLabel={t('screens.onboarding.ctaContinue')}
          />
        </ElevatedSurfaceCard>
      </View>
    </AuthFlowScrollLayout>
  );
}
