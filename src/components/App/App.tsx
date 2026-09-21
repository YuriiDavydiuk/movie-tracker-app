import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import css from './App.module.css';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';

const ConfigPage = lazy(() => import('../../pages/ConfigPage/ConfigPage'));

export default function App() {
  return (
    <div className={css.wrapper}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<MoviesPage />} />
          <Route path="config" element={<ConfigPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}
