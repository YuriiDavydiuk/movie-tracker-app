import { type ReactNode, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getMovies } from '../../services/movieService';
import { MoviesContext, type MoviesContextValue } from './context';
import { getLimit } from '../../utils/getLimit';

export function MoviesProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [perPage, setPerPage] = useState(getLimit);

  useEffect(() => {
    const tablet = window.matchMedia('(min-width: 768px)');
    const desktop = window.matchMedia('(min-width: 1440px)');

    const handleChange = () => {
      setPerPage(getLimit());
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        next.set('page', '1');
        return next;
      });
    };

    tablet.addEventListener('change', handleChange);
    desktop.addEventListener('change', handleChange);
    return () => {
      tablet.removeEventListener('change', handleChange);
      desktop.removeEventListener('change', handleChange);
    };
  }, [setSearchParams]);

  const searchQuery = searchParams.get('query') ?? '';
  const page = Number(searchParams.get('page'));
  const currentPage = Number.isSafeInteger(page) && page > 0 ? page : 1;

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

  const { data, isLoading, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['movies', searchQuery, currentPage, perPage],
    queryFn: () => getMovies(searchQuery, currentPage, perPage),
    placeholderData: keepPreviousData,
  });

  const value: MoviesContextValue = {
    currentPage,
    searchQuery,
    data,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    setCurrentPage,
    handleSearch,
  };

  return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>;
}
