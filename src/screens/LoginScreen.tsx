import { useTranslation } from 'react-i18next';

import { LoginHeroGradientBackdrop } from '@/components/molecules/LoginHeroGradientBackdrop';
import { LoginScrollBody } from '@/components/organisms/LoginScrollBody';
import { AuthFlowScrollLayout } from '@/components/templates/AuthFlowScrollLayout';
import { useLoginFlow } from '@/hooks/useLoginFlow';

export function LoginScreen() {
  const { t } = useTranslation();
  const loginFlow = useLoginFlow();

  return (
    <LoginHeroGradientBackdrop
      colors={loginFlow.heroColors}
      diyaAccessibilityLabel={t('screens.login.heroDiyaA11y')}
    >
      <AuthFlowScrollLayout scrollClassName="z-10 flex-1 bg-transparent">
        <LoginScrollBody
          mobile={loginFlow.mobile}
          onMobileChange={loginFlow.onMobileChange}
          onContinue={loginFlow.onContinue}
          continueDisabled={loginFlow.continueDisabled}
          submitting={loginFlow.submitting}
          errorText={loginFlow.errorText}
        />
      </AuthFlowScrollLayout>
    </LoginHeroGradientBackdrop>
  );
}
