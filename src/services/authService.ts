import type { AuthCredentials, User, AuthResponse } from '../types/auth';
import { api } from './apiClient';
import { isAxiosError } from 'axios';

export async function register(credentials: AuthCredentials): Promise<User> {
  const response = await api.post<AuthResponse>('/auth/register', credentials);
  return response.data.user;
}

export async function login(credentials: AuthCredentials): Promise<User> {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  return response.data.user;
}

export async function logout(): Promise<void> {
  await api.post<void>('/auth/logout');
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await api.get<AuthResponse>('/auth/me');
    return response.data.user;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
}
