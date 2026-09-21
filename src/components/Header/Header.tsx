import css from './Header.module.css';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import { useMovies } from '../../context/MoviesContext/useMovie';
import { useModal } from '../../context/ModalContext/useModal';

export default function Header() {
  const { data, currentPage, setCurrentPage, handleSearch } = useMovies();
  const { openCreate } = useModal();

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
      <button className={css.button} onClick={openCreate}>
        Create Movie
      </button>
    </header>
  );
}
