import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Footer from '../Footer/Footer';
import UserMenu from '../UserMenu/UserMenu';
import { useAuth } from '../../context/AuthContext/useAuth';
import AlertMessage from '../AlertMessage/AlertMessage';

export default function Layout() {
  const { isSessionExpired } = useAuth();
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-white border-bottom py-3">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-md-between gap-3">
          <Link to="/" className="fs-5 fw-bold text-body text-decoration-none">
            Movie Tracker
          </Link>
          <UserMenu />
        </div>
      </header>

      <div className="d-flex flex-column flex-grow-1">
        {isSessionExpired && <AlertMessage message="Session expired. Please sign in again." />}
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}
