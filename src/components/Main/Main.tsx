import Movie from '../Movie/Movie';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useMovies } from '../../context/MoviesContext/useMovie';
import { useModal } from '../../context/ModalContext/useModal';

export default function Main() {
  const { data, isLoading, isError, searchQuery, isFetching } = useMovies();
  const { openEdit } = useModal();

  return (
    <main className="mx-auto w-full max-w-[1440px] px-5 pb-6 md:px-8 min-[90rem]:px-16">
      {isLoading && <Loader />}
      {isFetching && !isLoading && (
        <p className="mb-3 text-center text-sm text-gray-500" role="status">
          Updating movies...
        </p>
      )}
      {isError && <ErrorMessage />}

      {data && data.movies.length > 0 && (
        <ul className="grid grid-cols-[minmax(0,280px)] justify-center gap-4 min-[23.4375rem]:grid-cols-[repeat(2,minmax(0,280px))] md:grid-cols-[repeat(3,minmax(0,280px))] min-[90rem]:grid-cols-[repeat(5,minmax(0,280px))]">
          {data.movies.map(movie => (
            <Movie key={movie._id} movie={movie} onEdit={openEdit} />
          ))}
        </ul>
      )}

      {data && data.movies.length === 0 && (
        <p className="mx-auto my-10 max-w-[600px] rounded-md border border-gray-200 bg-gray-50 px-3 py-10 text-center text-[15px] text-gray-500 wrap-anywhere">
          {searchQuery ? `No movies found for "${searchQuery}"` : 'No movies found'}
        </p>
      )}
    </main>
  );
}
