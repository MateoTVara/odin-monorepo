// user-client/src/context/auth/AuthProvider.tsx
import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import type { ReactNode } from 'react';
import type { AuthResponse } from '../../types/authResponse';
import { setUnauthorizedHandler } from '../../utils/apiFetch';

const AUTH_STORAGE_KEY = 'authUser';

const getInitialAuthUser = (): AuthResponse | null => {
  const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser)
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthResponse | null>(getInitialAuthUser);

  const login = (userData: AuthResponse) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  };
  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  useEffect(() => {
    setUnauthorizedHandler(logout);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};