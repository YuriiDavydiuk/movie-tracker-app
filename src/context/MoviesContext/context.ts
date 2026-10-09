import { createContext } from 'react';
import type { MovieHttpResponse } from '../../types/movie';

export interface MoviesContextValue {
  currentPage: number;
  searchQuery: string;
  data: MovieHttpResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  setCurrentPage: (page: number) => void;
  handleSearch: (value: string) => void;
}

export const MoviesContext = createContext<MoviesContextValue | undefined>(undefined);
