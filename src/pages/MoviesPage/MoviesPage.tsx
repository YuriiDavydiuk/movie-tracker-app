import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import AppModals from '../../components/AppModals/AppModals';
import { MoviesProvider } from '../../context/MoviesContext/MoviesProvider';
import { ModalProvider } from '../../context/ModalContext/ModalProvider';

export default function MoviesPage() {
  return (
    <MoviesProvider>
      <ModalProvider>
        <Header />
        <Main />
        <AppModals />
      </ModalProvider>
    </MoviesProvider>
  );
}
