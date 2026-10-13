import { type ReactNode, useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/authService';
import { AUTH_QUERY_KEY, AuthContext, type AuthContextValue } from './context';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { setSessionExpiredHandler } from '../../services/apiClient';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: getCurrentUser,
    staleTime: Infinity,
  });

  useEffect(() => {
    setSessionExpiredHandler(() => {
      if (queryClient.getQueryData(AUTH_QUERY_KEY)) {
        setIsSessionExpired(true);
      }

      queryClient.setQueryData(AUTH_QUERY_KEY, null);
    });

    return () => {
      setSessionExpiredHandler(null);
    };
  }, [queryClient]);

  const user = data ?? null;

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isAuthLoading: isPending,
    isSessionExpired,
    clearSessionExpired: () => setIsSessionExpired(false),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
