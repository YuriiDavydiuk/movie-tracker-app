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
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 bg-white py-3">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-3 px-5 md:flex-row md:justify-between md:px-8 min-[90rem]:px-16">
          <Link to="/" className="text-xl font-bold text-gray-900">
            Movie Tracker
          </Link>
          <UserMenu />
        </div>
      </header>

      <div className="flex flex-1 flex-col">
        {isSessionExpired && <AlertMessage message="Session expired. Please sign in again." />}
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}
