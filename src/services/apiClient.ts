import axios, { type InternalAxiosRequestConfig } from 'axios';
import { env } from '../config/env';

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const api = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  timeout: 30000,
});

let refreshPromise: Promise<void> | null = null;

let onSessionExpired: (() => void) | null = null;

export function setSessionExpiredHandler(handler: (() => void) | null) {
  onSessionExpired = handler;
}

api.interceptors.response.use(
  response => response,

  async error => {
    if (!axios.isAxiosError(error) || error.response?.status !== 401 || !error.config) {
      return Promise.reject(error);
    }

    const config = error.config as RetryConfig;

    const isAuthRequest =
      config.url === '/auth/login' ||
      config.url === '/auth/register' ||
      config.url === '/auth/logout' ||
      config.url === '/auth/refresh';

    if (isAuthRequest) {
      return Promise.reject(error);
    }

    if (config._retry) {
      onSessionExpired?.();
      return Promise.reject(error);
    }

    config._retry = true;

    if (!refreshPromise) {
      refreshPromise = api
        .post('/auth/refresh')
        .then(() => undefined)
        .catch((refreshError: unknown) => {
          if (axios.isAxiosError(refreshError) && refreshError.response?.status === 401) {
            onSessionExpired?.();
          }

          throw refreshError;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    await refreshPromise;

    return api(config);
  }
);
