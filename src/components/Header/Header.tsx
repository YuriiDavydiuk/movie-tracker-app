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
    <div className="bg-light border-bottom py-3 mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-3">
        <div className={`${css.search} justify-content-center justify-content-md-start`}>
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

        <div className={`${css.actions} justify-content-center justify-content-md-end`}>
          {!isAuthLoading && isAuthenticated && (
            <button type="button" className="btn btn-primary" onClick={openCreate}>
              Create Movie
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
