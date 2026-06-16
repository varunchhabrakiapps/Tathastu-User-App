import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react';

import { useAuth } from '@/context/AuthContext';

type ServiceAreaContextValue = {
  /** null until a location is saved and checked. */
  isServiceSupported: boolean | null;
  serviceAreaName: string | null;
};

const ServiceAreaContext = createContext<ServiceAreaContextValue | null>(null);

/** Exposes persisted service-area availability for banners, explore filters, etc. */
export function ServiceAreaProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();

  const value = useMemo(
    () => ({
      isServiceSupported: user?.location?.isServiceSupported ?? null,
      serviceAreaName: user?.location?.serviceAreaName ?? null,
    }),
    [user?.location?.isServiceSupported, user?.location?.serviceAreaName],
  );

  return (
    <ServiceAreaContext.Provider value={value}>{children}</ServiceAreaContext.Provider>
  );
}

export function useServiceArea(): ServiceAreaContextValue {
  const ctx = useContext(ServiceAreaContext);
  if (!ctx) {
    throw new Error('useServiceArea must be used within ServiceAreaProvider');
  }
  return ctx;
}
