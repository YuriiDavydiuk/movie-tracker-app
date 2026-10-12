import { createContext } from 'react';
import type { User } from '../../types/auth';

export const AUTH_QUERY_KEY = ['auth', 'me'] as const;

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
