import type { ReactNode } from 'react';
import { getCurrentUser } from '../../services/authService';
import { AUTH_QUERY_KEY, AuthContext, type AuthContextValue } from './context';
import { useQuery } from '@tanstack/react-query';

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isPending } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: getCurrentUser,
    staleTime: Infinity,
  });

  const user = data ?? null;

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isAuthLoading: isPending,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
