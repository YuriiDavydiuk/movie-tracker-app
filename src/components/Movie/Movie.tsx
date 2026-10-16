import { useState } from 'react';
import type { Movie as MovieType } from '../../types/movie';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMovie } from '../../services/movieService';
import Modal from '../Modal/Modal';
import AlertMessage from '../AlertMessage/AlertMessage';
import { getMovieErrorMessage } from '../../utils/getMovieErrorMessage';
import { useAuth } from '../../context/AuthContext/useAuth';
import { useMovies } from '../../context/MoviesContext/useMovie';

interface MovieProps {
  movie: MovieType;
  onEdit: (movie: MovieType) => void;
}

export default function Movie({ movie, onEdit }: MovieProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data, currentPage, setCurrentPage } = useMovies();
  const { isAuthenticated } = useAuth();

  const mutation = useMutation({
    mutationFn: deleteMovie,
    onSuccess: () => {
      setIsConfirmOpen(false);

      if (data?.movies.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });

  return (
    <li className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      {movie.poster ? (
        <img
          src={movie.poster}
          alt={movie.title}
          className="aspect-[4/5] w-full shrink-0 object-cover"
        />
      ) : (
        <div className="flex aspect-[4/5] w-full shrink-0 items-center justify-center bg-gray-200 text-sm text-gray-500">
          No poster
        </div>
      )}
      <div className="space-y-1 p-3 wrap-anywhere">
        <h2 className="text-base font-semibold text-gray-900">{movie.title}</h2>
        <p className="text-sm text-gray-500 capitalize">{movie.status}</p>
        <p className="text-sm text-gray-500">{movie.releaseYear}</p>
        <p className="text-sm text-gray-600 italic">{movie.tagline}</p>
      </div>
      {isAuthenticated && (
        <div className="mt-auto flex flex-wrap gap-2 p-3">
          <button
            className="min-h-10 flex-1 cursor-pointer rounded bg-blue-600 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-700"
            onClick={() => onEdit(movie)}
          >
            Edit
          </button>
          <button
            className="min-h-10 flex-1 cursor-pointer rounded border border-red-600 px-3 py-2 text-sm text-red-600 transition-colors enabled:hover:bg-red-600 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            disabled={mutation.isPending}
            onClick={() => setIsConfirmOpen(true)}
          >
            Delete
          </button>
        </div>
      )}
      {mutation.isError && (
        <AlertMessage
          message={getMovieErrorMessage(mutation.error, 'delete')}
          className="mx-3 mb-3"
        />
      )}
      {isConfirmOpen && (
        <Modal onClose={() => setIsConfirmOpen(false)}>
          <div className="mx-auto max-w-[300px] text-center wrap-anywhere">
            <h2 className="text-base font-semibold text-gray-900">Delete movie?</h2>

            <p className="mt-1.5 text-sm text-gray-500">
              <strong className="text-gray-900">&quot;{movie.title}&quot;</strong> will be
              permanently removed.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              <button
                type="button"
                className="min-h-10 cursor-pointer rounded border border-gray-300 bg-gray-50 px-4 py-2 text-base text-gray-900 transition-colors hover:bg-gray-200"
                onClick={() => setIsConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="min-h-10 cursor-pointer rounded bg-red-600 px-4 py-2 text-base text-white transition-colors enabled:hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={mutation.isPending}
                onClick={() => mutation.mutate(movie._id)}
              >
                {mutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </li>
  );
}
