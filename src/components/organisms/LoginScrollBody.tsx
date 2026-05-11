import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { MarketingHeroCopy } from '@/components/molecules/MarketingHeroCopy';
import { LoginFormCard } from '@/components/organisms/LoginFormCard';

type Props = {
  mobile: string;
  onMobileChange: (text: string) => void;
  onContinue: () => void;
  submitting: boolean;
  errorText: string | null;
};

export function LoginScrollBody({
  mobile,
  onMobileChange,
  onContinue,
  submitting,
  errorText,
}: Props) {
  const { t } = useTranslation();

  return (
    <View className="items-center px-6 pb-8">
      <View className="w-full max-w-md items-center gap-5">
        <MarketingHeroCopy
          accentTone="warm"
          badge={t('screens.login.heroBadge')}
          title={t('product.brandName')}
          subtitle={t('screens.login.heroSubtitle')}
          body={t('screens.login.heroBody')}
        />
        <LoginFormCard
          mobile={mobile}
          onMobileChange={onMobileChange}
          onContinue={onContinue}
          submitting={submitting}
          errorText={errorText}
        />
      </View>
    </View>
  );
}
