import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import AppModals from '../../components/AppModals/AppModals';
import { MoviesProvider } from '../../context/MoviesContext/MoviesProvider';
import { ModalProvider } from '../../context/ModalContext/ModalProvider';
import { useAuth } from '../../context/AuthContext/useAuth';

export default function MoviesPage() {
  const { user } = useAuth();
  return (
    <MoviesProvider>
      <ModalProvider key={user?._id ?? 'guest'}>
        <Header />
        <Main />
        <AppModals />
      </ModalProvider>
    </MoviesProvider>
  );
}
