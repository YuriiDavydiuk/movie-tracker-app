import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import css from './Layout.module.css';
import Loader from '../Loader/Loader';
import Footer from '../Footer/Footer';
import UserMenu from '../UserMenu/UserMenu';
import { useAuth } from '../../context/AuthContext/useAuth';
import AlertMessage from '../AlertMessage/AlertMessage';

export default function Layout() {
  const { isSessionExpired } = useAuth();
  return (
    <div className={css.wrapper}>
      <header className={css.appBar}>
        <div className={`container ${css.appBarInner}`}>
          <Link to="/" className={css.logo}>
            Movie Tracker
          </Link>
          <UserMenu />
        </div>
      </header>

      <div className={css.content}>
        {isSessionExpired && <AlertMessage message="Session expired. Please sign in again." />}
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}
