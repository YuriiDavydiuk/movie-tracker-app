import { useState } from 'react';
import css from './Movie.module.css';
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
    <li className="col">
      <div className="card h-100 overflow-hidden">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className={`${css.poster} card-img-top object-fit-cover`}
          />
        ) : (
          <div
            className={`${css.poster} w-100 d-flex align-items-center justify-content-center bg-secondary-subtle text-body-secondary small`}
          >
            No poster
          </div>
        )}
        <div className="card-body">
          <h2 className="card-title h6 fw-semibold">{movie.title}</h2>
          <p className="small text-body-secondary text-capitalize mb-1">{movie.status}</p>
          <p className="small text-body-secondary mb-1">{movie.releaseYear}</p>
          <p className="small fst-italic mb-0">{movie.tagline}</p>
        </div>
        {isAuthenticated && (
          <div className="d-flex flex-wrap gap-2 mt-auto p-3">
            <button className="btn btn-primary flex-fill" onClick={() => onEdit(movie)}>
              Edit
            </button>
            <button
              className="btn btn-outline-danger flex-fill"
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
            className="mt-0 mx-3 mb-3"
          />
        )}
        {isConfirmOpen && (
          <Modal onClose={() => setIsConfirmOpen(false)}>
            <div className={css.confirm}>
              <h2 className="h6 fw-semibold mb-2">Delete movie?</h2>
              <p className="small text-body-secondary mb-0">
                <strong className="text-body">&quot;{movie.title}&quot;</strong> will be permanently
                removed.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setIsConfirmOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  disabled={mutation.isPending}
                  onClick={() => {
                    mutation.mutate(movie._id);
                  }}
                >
                  {mutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </li>
  );
}
