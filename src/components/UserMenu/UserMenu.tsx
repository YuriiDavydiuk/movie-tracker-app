import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext/useAuth';
import { AUTH_QUERY_KEY } from '../../context/AuthContext/context';
import { logout } from '../../services/authService';
import AlertMessage from '../AlertMessage/AlertMessage';
import css from './UserMenu.module.css';
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
      <div
        className={`${css.menu} d-flex flex-wrap align-items-center justify-content-center justify-content-md-end gap-2`}
      >
        <Link to="/login" className="btn btn-outline-primary">
          Sign in
        </Link>
        <Link to="/register" className="btn btn-primary">
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`${css.menu} d-flex flex-wrap align-items-center justify-content-center justify-content-md-end gap-2`}
    >
      <span className={css.email}>{user.email}</span>

      <button
        type="button"
        className="btn btn-outline-secondary"
        disabled={mutation.isPending}
        onClick={() => mutation.mutate()}
      >
        {mutation.isPending ? 'Signing out...' : 'Sign out'}
      </button>

      {mutation.isError && <AlertMessage message="Could not sign out. Please try again." />}
    </div>
  );
}
