import { type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getMovies } from '../../services/movieService';
import { MoviesContext, type MoviesContextValue } from './context';

export function MoviesProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('query') ?? '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const setCurrentPage = (page: number) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('page', String(page));
      return next;
    });
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value) next.set('query', value);
      else next.delete('query');
      next.set('page', '1');
      return next;
    });
  }, 300);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movies', searchQuery, currentPage],
    queryFn: () => getMovies(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const value: MoviesContextValue = {
    currentPage,
    searchQuery,
    data,
    isLoading,
    isError,
    isSuccess,
    setCurrentPage,
    handleSearch,
  };

  return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>;
}
