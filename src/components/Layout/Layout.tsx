import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import css from './Layout.module.css';
import Loader from '../Loader/Loader';
import Footer from '../Footer/Footer';

export default function Layout() {
  return (
    <div className={css.wrapper}>
      <header className={css.appBar}>
        <Link to="/" className={css.logo}>
          Movie Tracker
        </Link>
        {/* UserMenu goes here (auth plan, step 8) */}
      </header>

      <div className={css.content}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}
