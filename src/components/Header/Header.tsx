import css from './Header.module.css';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import { useMovies } from '../../context/MoviesContext/useMovie';
import { useModal } from '../../context/ModalContext/useModal';
import { useAuth } from '../../context/AuthContext/useAuth';

export default function Header() {
  const { data, currentPage, setCurrentPage, handleSearch } = useMovies();
  const { openCreate } = useModal();
  const { isAuthenticated, isAuthLoading } = useAuth();

  return (
    <div className={css.toolbar}>
      <div className={`container ${css.toolbarInner}`}>
        <div className={css.search}>
          <SearchBox onSearch={handleSearch} />
        </div>
        <div className={css.pagination}>
          {data && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </div>

        <div className={css.actions}>
          {!isAuthLoading && isAuthenticated && (
            <button type="button" className={css.button} onClick={openCreate}>
              Create Movie
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
