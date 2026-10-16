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
    <div className="mb-4 border-b border-gray-200 bg-gray-50 py-4">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-stretch gap-3 px-5 md:flex-row md:items-center md:gap-4 md:px-8 min-[90rem]:px-16">
        <div className="flex min-w-0 justify-center md:flex-1 md:justify-start">
          <SearchBox onSearch={handleSearch} />
        </div>

        <div className="min-w-0">
          {data && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </div>

        <div className="flex min-w-0 justify-center empty:hidden md:flex-1 md:justify-end md:empty:flex">
          {!isAuthLoading && isAuthenticated && (
            <button
              type="button"
              className="cursor-pointer rounded bg-blue-600 px-3 py-2 text-base text-white transition-colors hover:bg-blue-700"
              onClick={openCreate}
            >
              Create Movie
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
