import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react';

import { productCatalog, type ProductCatalog } from '@/context/productCatalog';

const ProductContext = createContext<ProductCatalog | null>(null);

export function ProductProvider({ children }: PropsWithChildren) {
  const value = useMemo(() => productCatalog, []);
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProduct(): ProductCatalog {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error('useProduct must be used within ProductProvider');
  }
  return ctx;
}
