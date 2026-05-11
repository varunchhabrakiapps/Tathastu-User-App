import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'nativewind';
import { Text, View } from 'react-native';

import { PrimaryGlassButton } from '@/components/atoms/PrimaryGlassButton';
import { ElevatedSurfaceCard } from '@/components/molecules/ElevatedSurfaceCard';
import { GradientHeroShell } from '@/components/molecules/GradientHeroShell';
import { MarketingHeroCopy } from '@/components/molecules/MarketingHeroCopy';
import { AuthFlowScrollLayout } from '@/components/templates/AuthFlowScrollLayout';
import { useCompleteOnboarding } from '@/hooks/useCompleteOnboarding';
import { getAuthHeroGradient } from '@/theme/heroGradients';

export function OnboardingScreen() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const paletteKey = colorScheme === 'dark' ? 'dark' : 'light';
  const { completeOnboarding, isCompleting } = useCompleteOnboarding();
  const heroColors = getAuthHeroGradient(paletteKey);


  return (
    <AuthFlowScrollLayout>
      <GradientHeroShell colors={heroColors} contentTopInset={0}>
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
