import { Navigate, Outlet, useLocation, type Location } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/useAuth';
import Loader from '../Loader/Loader';

interface LocationState {
  from?: Location;
}

export default function RestrictedRoute() {
  const { isAuthenticated, isAuthLoading } = useAuth();
  const location = useLocation();

  if (isAuthLoading) return <Loader />;

  if (isAuthenticated) {
    const from = (location.state as LocationState | null)?.from ?? '/';
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}
