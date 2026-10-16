import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext/useAuth';
import { AUTH_QUERY_KEY } from '../../context/AuthContext/context';
import { logout } from '../../services/authService';
import AlertMessage from '../AlertMessage/AlertMessage';

import { Link } from 'react-router-dom';

export default function UserMenu() {
  const { user, isAuthLoading } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });

  if (isAuthLoading) return null;

  if (!user) {
    return (
      <div className="flex min-w-0 max-w-full flex-wrap items-center justify-center gap-3 md:justify-end">
        <Link
          to="/login"
          className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded border border-blue-600 px-3 py-1.5 text-base text-blue-600 transition-colors hover:bg-blue-50"
        >
          Sign in
        </Link>
        <Link
          to="/register"
          className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded bg-blue-600 px-3 py-1.5 text-base text-white transition-colors hover:bg-blue-700"
        >
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 max-w-full flex-wrap items-center justify-center gap-3 md:justify-end">
      <span className="min-w-0 max-w-full text-sm text-gray-700 wrap-anywhere">{user.email}</span>

      <button
        type="button"
        className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded border border-gray-300 px-3 py-1.5 text-base text-gray-700 transition-colors enabled:hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={mutation.isPending}
        onClick={() => mutation.mutate()}
      >
        {mutation.isPending ? 'Signing out...' : 'Sign out'}
      </button>

      {mutation.isError && <AlertMessage message="Could not sign out. Please try again." />}
    </div>
  );
}
