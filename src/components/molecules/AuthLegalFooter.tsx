import { memo } from 'react';

import { LegalAgreementLinks } from '@/components/molecules/LegalAgreementLinks';

/** Ritual-tone legal strip for auth flows — purposely quiet. */
export const AuthLegalFooter = memo(function AuthLegalFooter() {
  return <LegalAgreementLinks variant="default" />;
});
