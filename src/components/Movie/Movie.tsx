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
    <li className={css.listItem}>
      {movie.poster ? (
        <img src={movie.poster} alt={movie.title} className={css.poster} />
      ) : (
        <div className={css.posterFallback}>No poster</div>
      )}
      <h2 className={css.title}>{movie.title}</h2>
      <p className={css.status}>{movie.status}</p>
      <p>{movie.releaseYear}</p>
      <p>{movie.tagline}</p>
      {isAuthenticated && (
        <div className={css.footer}>
          <button className={css.edit} onClick={() => onEdit(movie)}>
            Edit
          </button>
          <button
            className={css.delete}
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
          className={css.alert}
        />
      )}
      {isConfirmOpen && (
        <Modal onClose={() => setIsConfirmOpen(false)}>
          <div className={css.confirm}>
            <p className={css.confirmText}>Delete movie?</p>
            <p className={css.confirmSubtext}>
              <strong className={css.confirmMovieTitle}>&quot;{movie.title}&quot;</strong> will be
              permanently removed.
            </p>
            <div className={css.confirmActions}>
              <button className={css.cancelButton} onClick={() => setIsConfirmOpen(false)}>
                Cancel
              </button>
              <button
                className={css.confirmDeleteButton}
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
    </li>
  );
}
