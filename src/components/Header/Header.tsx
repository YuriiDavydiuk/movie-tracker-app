import css from './Header.module.css';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import { useMovies } from '../../context/MoviesContext/useMovie';
import { useModal } from '../../context/ModalContext/useModal';
import { useAuth } from '../../context/AuthContext/useAuth';
import { Link } from 'react-router-dom';

export default function Header() {
  const { data, currentPage, setCurrentPage, handleSearch } = useMovies();
  const { openCreate } = useModal();
  const { isAuthenticated, isAuthLoading } = useAuth();

  return (
    <header className={css.toolbar}>
      <SearchBox onSearch={handleSearch} />
      {data && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
      {!isAuthLoading &&
        (isAuthenticated ? (
          <button className={css.button} onClick={openCreate}>
            Create Movie
          </button>
        ) : (
          <Link to="/login" className={css.button}>
            Log in to manage movies
          </Link>
        ))}
    </header>
  );
}
