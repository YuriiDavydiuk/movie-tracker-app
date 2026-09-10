import css from './App.module.css';

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

// components
import SearchBox from '../SearchBox/SearchBox';
import CreateMovieForm from '../CreateMovieForm/CreateMovie';
import EditMovieForm from '../EditMovieForm/EditMovieForm';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';
import Movie from '../Movie/Movie';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Pagination from '../Pagination/Pagination';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getMovies } from '../../services/movieService';
import type { Movie as MovieType } from '../../types/movie';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateMovie, setIsCreateMovie] = useState(false);
  const [isEditMovie, setIsEditMovie] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<MovieType | null>(null);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movies', searchQuery, currentPage],
    queryFn: () => getMovies(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.wrapper}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button
          className={css.button}
          onClick={() => {
            setIsCreateMovie(true);
            setIsModalOpen(true);
          }}
        >
          Create Movie
        </button>
      </header>
      <main className={css.app}>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}

        {data && data.movies.length > 0 && (
          <ul className={css.list}>
            {data.movies.map(movie => (
              <Movie
                key={movie._id}
                movie={movie}
                onEdit={movie => {
                  setCurrentMovie(movie);
                  setIsEditMovie(true);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </ul>
        )}

        {data && data.movies.length === 0 && (
          <p className={css.empty}>
            {searchQuery ? `No movies found for "${searchQuery}"` : 'No movies found'}
          </p>
        )}
      </main>
      <Footer />

      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            setIsCreateMovie(false);
            setIsEditMovie(false);
            setCurrentMovie(null);
          }}
        >
          {isCreateMovie && (
            <CreateMovieForm
              onClose={() => {
                setIsCreateMovie(false);
                setIsModalOpen(false);
              }}
            />
          )}

          {isEditMovie && currentMovie && (
            <EditMovieForm
              movie={currentMovie}
              onClose={() => {
                setCurrentMovie(null);
                setIsEditMovie(false);
                setIsModalOpen(false);
              }}
            />
          )}
        </Modal>
      )}
    </div>
  );
}
