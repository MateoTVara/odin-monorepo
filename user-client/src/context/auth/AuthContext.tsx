// user-client/src/context/auth/AuthContext.tsx
import { createContext } from 'react';
import type { AuthResponse } from '../../types/authResponse';

type AuthContextType = {
  user: AuthResponse | null;
  login: (userData: AuthResponse) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);