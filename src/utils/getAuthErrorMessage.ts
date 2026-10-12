import { isAxiosError } from 'axios';

type AuthAction = 'login' | 'register';

const GENERIC_MESSAGE = 'Something went wrong. Please try again.';

export function getAuthErrorMessage(error: unknown, action: AuthAction): string {
  if (!isAxiosError<{ message?: string }>(error)) return GENERIC_MESSAGE;
  if (!error.response) return 'Network error. Check your connection and try again.';

  const { status, data } = error.response;

  if (action === 'login' && status === 401) return 'Invalid email or password.';
  if (action === 'register' && status === 400 && data?.message === 'Email in use') {
    return 'This email is already registered.';
  }
  if (status === 400) return 'Please check the entered data.';

  return GENERIC_MESSAGE;
}
