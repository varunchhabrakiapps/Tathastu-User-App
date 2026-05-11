import { LoginScrollBody } from '@/components/organisms/LoginScrollBody';
import { AuthScreen } from '@/components/templates/AuthScreen';
import { useLoginFlow } from '@/hooks/useLoginFlow';

export function LoginScreen() {
  const loginFlow = useLoginFlow();

  return (
    <AuthScreen>
      <LoginScrollBody
        mobile={loginFlow.mobile}
        onMobileChange={loginFlow.onMobileChange}
        onContinue={loginFlow.onContinue}
        continueDisabled={loginFlow.continueDisabled}
        submitting={loginFlow.submitting}
        errorText={loginFlow.errorText}
      />
    </AuthScreen>
  );
}
