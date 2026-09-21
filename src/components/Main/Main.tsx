import css from './Main.module.css';
import Movie from '../Movie/Movie';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useMovies } from '../../context/MoviesContext/useMovie';
import { useModal } from '../../context/ModalContext/useModal';

export default function Main() {
  const { data, isLoading, isError, searchQuery } = useMovies();
  const { openEdit } = useModal();

  return (
    <main className={css.app}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {data && data.movies.length > 0 && (
        <ul className={css.list}>
          {data.movies.map(movie => (
            <Movie key={movie._id} movie={movie} onEdit={openEdit} />
          ))}
        </ul>
      )}

      {data && data.movies.length === 0 && (
        <p className={css.empty}>
          {searchQuery ? `No movies found for "${searchQuery}"` : 'No movies found'}
        </p>
      )}
    </main>
  );
}
