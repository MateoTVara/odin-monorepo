import { AuthProvider } from './auth/AuthProvider';
import type { ReactNode } from 'react';

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    {children}
  </AuthProvider>
);