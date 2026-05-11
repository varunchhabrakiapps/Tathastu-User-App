import { LoginScrollBody } from '@/components/organisms/LoginScrollBody';
import { AuthScreen } from '@/components/templates/AuthScreen';
import { useAuthFlow } from '@/hooks/useAuthFlow';

export function LoginScreen() {
  const authFlow = useAuthFlow();

  return (
    <AuthScreen>
      <LoginScrollBody
        mobile={authFlow.mobile}
        onMobileChange={authFlow.onMobileChange}
        onContinue={authFlow.onContinue}
        continueDisabled={authFlow.continueDisabled}
        submitting={authFlow.submitting}
        errorText={authFlow.errorText}
      />
    </AuthScreen>
  );
}
